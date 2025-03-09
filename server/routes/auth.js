import express from "express"
import axios from "axios";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import User from '../Models/UserSchema.js'
import cookieParser from "cookie-parser";

dotenv.config();
const router = express.Router();
router.use(cookieParser());

router.get("/google", (req,res) => {
    const googleAuthURL = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=email profile https://mail.google.com/&access_type=offline&prompt=consent`;
    res.redirect(googleAuthURL);
});



router.get("/google/callback", async(req, res) => {

    console.log("🔹 Google Callback Route Hit");
    console.log("🔹 Query Params: ", req.query);

        
    const {code} = req.query;

    if (!code) {
        return res.status(400).json({error : "Authorization code is missing"});
    }

    try {
        const response = await axios.post("https://oauth2.googleapis.com/token", {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URI,
            grant_type: "authorization_code",
            code,
        });

        const {access_token , refresh_token , id_token } = response.data;

        const userInfo = jwt.decode(id_token);

        let user = await User.findOne({email : userInfo.email});

        if (!user){
            user  = new User ({
                email: userInfo.email,
                name: userInfo.name,
                accessToken: access_token,
                refreshToken: refresh_token,
            });
            await user.save();
        }

        const jwtToken = jwt.sign (
            { id : user._id , email : user.email},
            process.env.JWT_SECRET ,
            {expiresIn : "7d"}
        );

        res.cookie("token", jwtToken, { httpOnly: true, secure: false });
        res.redirect(`${process.env.CLIENT_URL}/dashboard`);
    }
    catch(err){
        res.status(500).json({error : "failed to authenticate"});
    }
});

router.get("/login/success", (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ error: true, message: "Not Authorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({
            success: true,
            message: "User authenticated",
            user: decoded,
            email: decoded.email,
        });
    } catch (err) {
        res.status(403).json({ error: true, message: "Invalid token" });
    }
});


router.get("/login/failed", (req, res) => {
    res.status(401).json({ error: true, message: "Log in failure" });
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect(process.env.CLIENT_URL);
});



export default router;
