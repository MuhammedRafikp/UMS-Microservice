import { userAPI } from "../config/axiosConfig.js";

export const register = async (req, res) => {
    try {
        const userData = req.body;

        console.log("user :", userData);

        const response = await userAPI.post('/register', userData);

        console.log("Response form user-service :", response.data);

        res.status(200).json({
            success: true,
            message: response.data.message
        });

    } catch (error) {
        console.error("Error occurred during registration:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.user;
        const response = await userAPI.get(`/user-profile/${userId}`);

        if (!response.data.success) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            userData: response.data.userData
        });

    } catch (error) {
        console.error("Error while fetching user data :", error.message);
    }
}

export const editUserProfile = async (req, res) => {
    try {
        const { userId } = req.user;
        const { name, mobile } = req.body;

        const response = await userAPI.put(`/edit-profile/${userId}`, { name, mobile });

        if (!response.data.success) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User profile updated successfully"
        })

    } catch (error) {
        console.error("Error : ", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}