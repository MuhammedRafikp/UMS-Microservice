import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { configDotenv } from 'dotenv';
import { connectDB } from '../config/db.js';
import User from '../models/userModel.js';

// configDotenv({ path: '../.env' });
configDotenv();

const { GRPC_PORT, MONGODB_URI } = process.env;
console.log("GRPC_PORT :", GRPC_PORT)
console.log("MONGODB_URI :", MONGODB_URI)

const PROTO_PATH = './grpc/userService.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String, 
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const server = new grpc.Server();

const loginUser = async (call, callback) => {
  try {
    const { email, password } = call.request;
    console.log(email, password);

    const userData = await User.findOne({ email });
    console.log("userData :",userData);

    if (!userData || userData.password !== password) {
      callback(null, { success: false });
      return;
    }

    callback(null, { success: true, userId: userData._id.toString() });

  } catch (error) {
    console.error("Error in loginUser:", error.message);
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal server error',
    });
  }
};

export const startGrpcServer = async () => {
  await connectDB(MONGODB_URI);

  server.addService(userProto.UserService.service, { loginUser });

  server.bindAsync(`user-service:${GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`gRPC server running at http://user-service:${GRPC_PORT}`);
  });
};

// startGrpcServer();