using Minio;
using Minio.DataModel;
using Minio.DataModel.Args;
using Minio.DataModel.Tags;
using StorageServices.Utils;

namespace StorageServices.Services;

public class MinioService
{
  readonly string secret = "__SuperSecretValue";
  public static IMinioClient CreateClient(string endpoint, string accessKey, string secretKey, bool useSSL)
  {
    var client = new MinioClient()
      .WithEndpoint(endpoint)
      .WithCredentials(accessKey, secretKey)
      .WithSSL(useSSL)
      .Build();
    return client;
  }

  public static async Task<bool> IsBucketExists(IMinioClient client, string bucketName)
  {
    var args = new BucketExistsArgs().WithBucket(bucketName);
    var found = await client.BucketExistsAsync(args).ConfigureAwait(false);

    return found;
  }

  public static async Task<bool> CreateBucket(IMinioClient client, string bucketName)
  {
    var exists = await CreateBucket(client, bucketName);
    if (exists) return false;

    await client.MakeBucketAsync(new MakeBucketArgs().WithBucket(bucketName));
    return true;
  }

  public static async Task<bool> DeleteBucket(IMinioClient client, string bucketName)
  {
    var exists = await IsBucketExists(client, bucketName);
    if (!exists) return false;

    await client.RemoveBucketAsync(new RemoveBucketArgs().WithBucket(bucketName));
    return true;
  }

  readonly IMinioClient client;

  public MinioService(IConfiguration configuration)
  {
    var minioSection = configuration.GetSection("Minio")!;
    var endpoint = minioSection["Endpoint"]!;
    var accessKey = minioSection["AccessKey"]!;
    var secretKey = minioSection["SecretKey"]!;
    var useSSL = minioSection.GetValue<bool>("UseSSL")!;
    client = CreateClient(endpoint, accessKey, secretKey, useSSL);
  }

  public async Task<bool> CreateBucket(string bucketName)
  {
    return await CreateBucket(client, bucketName);
  }

  public async Task<bool> IsBucketExists(string bucketName)
  {
    return await IsBucketExists(client, bucketName);
  }

  public async Task<bool> InsertObject(IFormFile file, string folderName)
  {
    string path = folderName + "/" + file.FileName;
    var stream = file.OpenReadStream();
    var args = new PutObjectArgs()
      .WithBucket("test-bucket")
      .WithObject(path)
      .WithStreamData(stream)
      .WithObjectSize(-1)
      .WithContentType(file.ContentType);

    try
    {
      await client.PutObjectAsync(args);
      await client.StatObjectAsync(new StatObjectArgs()
        .WithBucket("test-bucket")
        .WithObject(path));

      return true;
    }
    catch (Exception)
    {
      return false;
      throw;
    }
  }

  public async Task<bool> DeleteObject(string fileName)
  {
    var args = new RemoveObjectArgs()
      .WithBucket("test-bucket")
      .WithObject(fileName);

    try { await client.RemoveObjectAsync(args); }
    catch (Exception)
    {
      return false;
      throw;
    }

    return true;
  }

  public async Task<bool> CreateFolder(string folderName)
  {
    string path = PathUtils.FixFolderPath(folderName);
    var emptyStream = new MemoryStream([0]);
    Console.WriteLine(path + secret);
    await client.PutObjectAsync(new PutObjectArgs()
      .WithBucket("test-bucket")
      .WithObject(path + secret)
      .WithStreamData(emptyStream)
      .WithObjectSize(1)
      .WithContentType("application/x-directory"));

    return true;
  }
  public async Task<ICollection<Item>> GetListObjects(string folderName)
  {
    var args = new ListObjectsArgs()
      .WithBucket("test-bucket")
      .WithPrefix(PathUtils.FixFolderPath(folderName))
      .WithRecursive(false)
      .WithVersions(false);

    List<Item> items = [];
    await foreach (var item in client.ListObjectsEnumAsync(args).ConfigureAwait(false))
    {
      if (!item.Key.Contains(secret)) items.Add(item);
    }

    return items;
  }

  public async Task<ulong> GetFileSize(string path)
  {
    var args = new ListObjectsArgs()
      .WithBucket("test-bucket")
      .WithPrefix(PathUtils.FixFolderPath(path))
      .WithRecursive(true)
      .WithVersions(false);

    ulong size = 0;
    await foreach (var item in client.ListObjectsEnumAsync(args).ConfigureAwait(false))
    {
      if (!item.Key.Contains(secret)) size += item.Size;
    }
    return size;
  }
}
