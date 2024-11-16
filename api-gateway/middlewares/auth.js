import jwt from 'jsonwebtoken';

export const validateAccessToken = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];

        if (token) {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded;
            next();
        }
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' })
    }
}