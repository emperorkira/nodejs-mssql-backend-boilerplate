import { GET, ADD, DELETE, UPDATE} from '../models/index.js'
import { loginSchema } from '../schemas/index.js';
import { err_msg, success_msg } from '../shared/index.js'
import { getUserByUsername, comparePassword, generateToken, generateRefreshToken } from '../functions/index.js';

    export const login = async (req, res) => {
        try {
        const { Username, Password } = req.body;
        const { error }  = loginSchema.validate({ Username, Password });
        
        if ( error ) return res.status(400).json({ Login: false, message: err_msg.e00x19 });
        
        const user = (await getUserByUsername(Username))[0];
        if (!user) return res.status(400).json({ Login: false, message: err_msg.e00x05 });
        if (user.isDeactivated === 1)  return res.status(401).json({ Login: false, message: err_msg.e00x20 });
        
        const isPasswordValid = await comparePassword(Password, user.Password);
        if (!isPasswordValid) return res.status(400).json({ Login: false, message: err_msg.e00x19 });
        const accessToken = await generateToken(user.Id);
        const refreshToken = await generateRefreshToken(user.Id);
        return res
            .cookie("accessToken", accessToken, { httpOnly: true, })
            .cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict",})
            .header('Authorization', `Bearer ${accessToken}`)
            .header('Refresh-Token', refreshToken)
            .json({
                Login: true,
                user: user,
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
        } catch (error) {
            console.error('Error in login function:', error.message);
            return res.status(400).json({ Login: false, message: err_msg.e00x02 });
        }
    };

    export const test_token = async (req, res) => {
        try {
            //const accessToken = req.headers['authorization'];
            //const refreshToken = req.headers['refresh-token'];
            const accessToken = req.cookies.accessToken;
            const refreshToken = req.cookies.refreshToken;
            return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
        } catch (error) {
            console.error("Error test tokens:", error);
            res.status(500).json({ message: "Error test tokens" });
        }
    };
    

    export const logout = async (req, res) => {
        try {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            return res.status(200).json({ success: true, message: success_msg.s00x00 });
        } catch (error) {
            console.error('Error in login function:', error.message);
            return res.status(400).json({ Login: false, message: err_msg.e00x02 });
        }
    };

    export const refresh_token = async (req, res) => {
        try {
            const user = req.user;
            const accessToken = await generateToken(user);
            const refreshToken = await generateRefreshToken(user);
            res
                .header('Authorization', `Bearer ${accessToken}`)
                .header('Refresh-Token', refreshToken)
                .json({
                Login: true,
                message: success_msg.s00x00,
                user:user,
                accessToken:accessToken,
                refreshToken:refreshToken,
                });
        } catch (error) {
            console.error("Error refreshing tokens:", error);
            res.status(500).json({ message: "Error refreshing tokens" });
        }
    };

  
    
    