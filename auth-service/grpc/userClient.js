import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';


const PROTO_PATH = './grpc/userService.proto'; 

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const client = new userProto.UserService('localhost:50051', grpc.credentials.createInsecure());

export const loginUser = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    const request = { email, password };

    client.LoginUser(request, (error, response) => {
      if (error) {
        console.error("Error in gRPC loginUser:", error.message);
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};

