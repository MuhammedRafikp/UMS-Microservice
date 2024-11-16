import jwt from 'jsonwebtoken';
import { loginUser } from '../grpc/userClient.js';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenUtils.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const response = await loginUser({ email, password });

        console.log("response :", response);

        if (!response.success) {
            console.log('Invalid email or password...............')
            return res.json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        const accessToken = generateAccessToken(response.userId);
        const refreshToken = generateRefreshToken(response.userId);

        console.log("accessToken :", accessToken);
        console.log("refreshToken :", refreshToken);



        return res.status(200).json({
            success: true,
            accessToken,
            refreshToken
        });

    } catch (error) {
        console.error("Error occured during login : ", error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal server Error'
        })
    }
}

export const validateRefreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        console.log("refresh token in auth-service :", refreshToken);

        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token is required' });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      
        const { userId } = decoded;
        const newAccessToken = generateAccessToken(userId);
        const newRefreshToken = generateRefreshToken(userId);

        return res.json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });

    } catch (error) {
        console.log("Error while validating refresh token : ", error.message);
        return res.status(500).json({ message: "Internal server error." });
    }
}