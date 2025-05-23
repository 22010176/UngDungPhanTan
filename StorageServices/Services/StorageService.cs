using StorageServices.Services;
using StorageServices.Grpc;
using Grpc.Core;

namespace StorageServices.Services;

public class StorageService(MinioService minioService) : Storage.StorageBase
{
  private readonly MinioService _minioService = minioService;
  public override Task<InitUserStorageResponse> InitUserStorage(InitUserStorageRequest request, ServerCallContext context)
  {
    return Task.FromResult(new InitUserStorageResponse()
    {
      Status = request.BucketId
    });
  }

  public override Task<DeleteUserStorageResponse> DeleteUserStorage(DeleteUserStorageRequest request, ServerCallContext context)
  {
    return Task.FromResult(new DeleteUserStorageResponse()
    {
      Status = request.BucketId
    });
  }
}

