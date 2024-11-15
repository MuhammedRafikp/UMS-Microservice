import express from 'express';
import User from '../models/userModel.js';

export const register = async (req, res) => {
    try {
        console.log("Reached...!");
        const userData = req.body;

        console.log("userData :",userData);

        const {name,email,password,mobile} = userData;
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