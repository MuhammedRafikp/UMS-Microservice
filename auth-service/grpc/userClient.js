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

function registerUser(userData) {
  console.log("user client......Data:",userData)
  return new Promise((resolve, reject) => {
    const request = { userData };
    console.log('request :',request);

    client.RegisterUser(request, (error, response) => {
      if (error) {
        console.error('Error in RegisterUser:', error);
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

export{ registerUser };
