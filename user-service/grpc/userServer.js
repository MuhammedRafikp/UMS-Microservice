import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import User from '../models/userModel.js';

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
  const userData = call.request;
  console.log("userData :",userData);
  // const {name,email,password,mobile} = userData;
  try {
    const newUser = await User.create(userData);
    console.log(newUser)
    callback(null, { userId: newUser._id.toString(), message: 'User created successfully' });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      details: 'Error creating user',
    });
  }
}

server.addService(userProto.UserService.service, { registerUser });

const PORT = '50051';

server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`gRPC server running at http://localhost:${PORT}`);
  // `server.start()` is no longer necessary here
});
