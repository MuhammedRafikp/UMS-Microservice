import mongoose from "mongoose";

const refreshTokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    refreshToken: {
        type: String,
        required: true
    },
    cretedAt: {
        type: Date,
        default: Date.now
    },
    expiredAt: {
        type: Date,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model("RefreshToken",refreshTokenSchema);