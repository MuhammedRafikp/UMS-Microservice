import {registerUser} from '../grpc/userClient.js'

export const register = async(req,res)=>{
    try {
        console.log("Reached...!");
        console.log("hello......")
        const userData = req.body;
        console.log(userData)

        const response = await registerUser(userData);

        console.log("User creation response:", response);

        res.status(200).json({
            message:response.message
        })
        
    } catch (error) {
        console.error("Error in register function:", error.message);
        
        res.status(500).json({
            message:"Internal Server Error"
        });
    }
}