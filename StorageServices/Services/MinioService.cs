
using Minio;
using Minio.DataModel.Args;

namespace StorageServices.Services;

public class MinioService
{
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
}
