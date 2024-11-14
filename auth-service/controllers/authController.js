import {registerUser} from '../grpc/userClient.js'

export const register = async(req,res)=>{
    try {
        console.log("Reached!")
        const userData = req.body;
        console.log(userData)

        const response = await registerUser(userData);
        
    } catch (error) {
        console.log(error.message)
    }
}