using StorageServices.Services;
using StorageServices.Grpc;
using Grpc.Core;

namespace StorageServices.Services;

public class StorageService(MinioService minioService) : Storage.StorageBase
{
  private readonly MinioService _minioService = minioService;
  public override async Task<InitUserStorageResponse> InitUserStorage(InitUserStorageRequest request, ServerCallContext context)
  {
    var result = await _minioService.CreateFolder(request.BucketId);

    return new() { Status = result ? "Success" : "Failed" };
  }

  public override Task<DeleteUserStorageResponse> DeleteUserStorage(DeleteUserStorageRequest request, ServerCallContext context)
  {
    return Task.FromResult(new DeleteUserStorageResponse()
    {
      Status = request.BucketId
    });
  }
}

