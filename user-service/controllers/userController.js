import express from 'express';
import User from '../models/userModel.js';

export const register = async (req, res) => {
    try {
        console.log("Reached...!");
        const userData = req.body;

        console.log("userData :", userData);

        const { name, email, password, mobile } = userData;
        const newUser = await User.create({
            name,
            email,
            password,
            mobile
        });

        console.log("newly created user :", newUser);

        res.status(200).json({
            success: true,
            message: 'Registration Successfull'
        });

    } catch (error) {
        console.error("Error in register function:", error.message);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("UserId :", userId);
        const userData = await User.findById(userId);

        console.log(userData);

        if (!userData) {
            return res.json({
                success: false,
                message: 'User not found',
            });
        }
        const { password, ...userProfile } = userData.toObject();

        console.log(userProfile);

        res.status(200).json({
            success: true,
            userData: userProfile
        })

    } catch (error) {
        console.error("Error in getUserProfile function:", error.message);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const editUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        const { name, mobile } = req.body;

        console.log(userId, name, mobile);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, mobile },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'Profile updated' });

    } catch (error) {
        console.error('Error in User Service:', error);
        res.status(500).json({ success: false, message: 'Failed to update profile' });
    }
}