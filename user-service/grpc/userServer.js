import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { configDotenv } from 'dotenv';
import {connectDB } from '../config/db.js';
import User from '../models/userModel.js';

configDotenv({ path: '../.env' });

const { GRPC_PORT, MONGODB_URI } = process.env;
console.log("GRPC_PORT :", GRPC_PORT)
console.log("MONGODB_URI :", MONGODB_URI)

const PROTO_PATH = './userService.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const server = new grpc.Server();

async function registerUser(call, callback) {
  const userData = call.request.userData; // Extract the userData correctly
  console.log("Received user data: ", userData);
  try {
    const newUser = await User.create(userData);
    console.log("newUser :",newUser);
    callback(null, { userId: newUser._id.toString(), message: 'User created successfully' });
  } catch (error) {
    console.error("Error creating user:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: 'Error creating user',
    });
  }
}

const startGrpcServer = async () => {
  await connectDB(MONGODB_URI);

  server.addService(userProto.UserService.service, { registerUser });

  server.bindAsync(`0.0.0.0:${GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`gRPC server running at http://localhost:${GRPC_PORT}`);
  });
};

startGrpcServer();