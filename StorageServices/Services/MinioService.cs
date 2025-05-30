using Minio;
using Minio.ApiEndpoints;
using Minio.DataModel;
using Minio.DataModel.Args;

using StorageServices.Utils;

namespace StorageServices.Services;

public class MinioService
{
  readonly string secret = "__SuperSecretValue";
  readonly string bucket;
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
    bucket = minioSection["DefaultBucket"]!;

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
      .WithBucket(bucket)
      .WithObject(path)
      .WithStreamData(stream)
      .WithObjectSize(-1)
      .WithContentType(file.ContentType);

    try
    {
      await client.PutObjectAsync(args);
      await client.StatObjectAsync(new StatObjectArgs()
        .WithBucket(bucket)
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
      .WithBucket(bucket)
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
      .WithBucket(bucket)
      .WithObject(path + secret)
      .WithStreamData(emptyStream)
      .WithObjectSize(1)
      .WithContentType("application/x-directory"));

    return true;
  }
  public async Task<ICollection<Item>> GetListObjects(string folderName)
  {
    var args = new ListObjectsArgs()
      .WithBucket(bucket)
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
      .WithBucket(bucket)
      .WithPrefix(PathUtils.FixFolderPath(path))
      .WithRecursive(true)
      .WithVersions(false);

    ulong size = 0;
    await foreach (var item in client.ListObjectsEnumAsync(args).ConfigureAwait(false))
    {
      if (!item.Key.Contains(secret))
        size += item.Size;
    }
    return size;
  }
  // public async Task<Stream> Downloadfile(string path)
  // {
  //   MemoryStream stream = new();
  //   // await client.


  // }
  public async Task<bool> RenameFile(string OldPath, string NewPath)
  {
    Console.WriteLine($"Test {OldPath} {NewPath}");

    var copySource = new CopySourceObjectArgs()
      .WithBucket(bucket)
      .WithObject(OldPath);

    var destSource = new CopyObjectArgs()
      .WithBucket(bucket)
      .WithObject(NewPath)
      .WithCopyObjectSource(copySource);

    await client.CopyObjectAsync(destSource).ConfigureAwait(false);
    await DeleteObject(OldPath);

    return true;
  }

  public async Task<bool> DeleteFolder(string path)
  {

    Console.WriteLine($"Test {path}");
    var args = new ListObjectsArgs()
      .WithBucket("test-bucket")
      .WithPrefix(PathUtils.FixFolderPath(path))
      .WithRecursive(true)
      .WithVersions(false);

    Console.WriteLine("\n\n");
    // List<string> files = [];
    await foreach (var item in client.ListObjectsEnumAsync(args).ConfigureAwait(false))
    {
      // if (item.IsDir) continue;
      // files.Add(item.Key);
      Console.WriteLine($"{item.Key}\n");
      // await DeleteObject(item.Key);
    }

    // Console.WriteLine(string.Join('\n', files));


    // if (files.Count == 0) return true;
    // foreach (var batch in files.Chunk(1000))
    // {
    //   objectsToDelete.Add((obj.Key, obj.VersionId));
    // }

    return true;
  }
}
