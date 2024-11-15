import { loginUser } from '../grpc/userClient.js';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenUtils.js';
import RefreshToken from '../models/RefreshToken.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const response = await loginUser({ email, password });

        console.log("response :", response);

        if (!response.success) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        const accessToken = generateAccessToken(response.userId);
        const refreshToken = generateRefreshToken(response.userId);

        console.log(accessToken)
        console.log(refreshToken)

        const token = await RefreshToken.create({
            userId: response.userId,
            refreshToken,
            expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        console.log("token doc :",token);
        
        return res.status(200).json({
            success: true,
            accessToken,
            refreshToken,
        });


    } catch (error) {
        console.error("Error occured during login : ", error.message);
        return res.status(500).json({
            success:false,
            message:'Internal server Error'
        })
    }
}