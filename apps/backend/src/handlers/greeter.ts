import * as grpc from '@grpc/grpc-js';

import { HelloRequest, HelloResponse } from '../proto/greeter_pb';

import { GreeterService } from '../proto/greeter_grpc_pb';

class GreeterHandler {
  sayHello = (call: grpc.ServerUnaryCall<HelloRequest, HelloResponse>, callback: grpc.sendUnaryData<HelloResponse>): void => {
    const reply: HelloResponse = new HelloResponse();

    reply.setMessage(`Hello ${call.request.getName()}`);

    callback(null, reply);
  };
}

export default {
  service: GreeterService,
  handler: new GreeterHandler(),
};
