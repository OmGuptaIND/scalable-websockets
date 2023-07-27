// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var greeter_pb = require('./greeter_pb.js');

function serialize_greeter_v1_HelloRequest(arg) {
  if (!(arg instanceof greeter_pb.HelloRequest)) {
    throw new Error('Expected argument of type greeter.v1.HelloRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_greeter_v1_HelloRequest(buffer_arg) {
  return greeter_pb.HelloRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_greeter_v1_HelloResponse(arg) {
  if (!(arg instanceof greeter_pb.HelloResponse)) {
    throw new Error('Expected argument of type greeter.v1.HelloResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_greeter_v1_HelloResponse(buffer_arg) {
  return greeter_pb.HelloResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var GreeterService = exports.GreeterService = {
  sayHello: {
    path: '/greeter.v1.Greeter/SayHello',
    requestStream: false,
    responseStream: false,
    requestType: greeter_pb.HelloRequest,
    responseType: greeter_pb.HelloResponse,
    requestSerialize: serialize_greeter_v1_HelloRequest,
    requestDeserialize: deserialize_greeter_v1_HelloRequest,
    responseSerialize: serialize_greeter_v1_HelloResponse,
    responseDeserialize: deserialize_greeter_v1_HelloResponse,
  },
};

exports.GreeterClient = grpc.makeGenericClientConstructor(GreeterService);
