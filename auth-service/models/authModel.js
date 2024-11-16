import mongoose from "mongoose";

const refreshTokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
});

export default mongoose.model("RefreshToken",refreshTokenSchema);