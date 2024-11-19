import { authAPI } from "../config/axiosConfig.js";

export const login = async (req, res) => {
    try {
        const userData = req.body;

        console.log("userData : ", userData);

        const response = await authAPI.post('/login', userData);

        if (response.data.success) {
            return res.status(200).json({
                success: true,
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken
            });
        }
        console.log("response:",response)
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password',
        });

    } catch (error) {
        console.error("Error in login route api:", error.message);
    }
}

export const refreshTokenHandler = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        console.log(refreshToken)

        const response = await authAPI.post('/refresh',{refreshToken});

        console.log("response.data :",response.data);
        
        res.status(200).json(response.data);

        // console.log("refreshToken :", refreshToken);

    } catch (error) {
        console.error('Error in refresh token handler:', error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

