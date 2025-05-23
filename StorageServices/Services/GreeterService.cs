using Grpc.Core;
using StorageServices.Grpc;

namespace StorageServices.Services;

public class GreeterService : Greeter.GreeterBase
{
  public override Task<HelloReply> SayHello(HelloRequest request, ServerCallContext context)
  {
    return Task.FromResult(new HelloReply()
    {
      Message = $"Helll, {request.Name} {request.Data}!"
    });
  }
}