import { token } from '../type/index.js';
import jwt from 'jsonwebtoken';
import { err_msg } from '../shared/index.js';

    export const verifyToken = (req, res, next) => {
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;
        if (!accessToken) return res.json({ valid: false, message: err_msg.e00x21, msg:'here' });
        jwt.verify(accessToken, token.SECRET, async (error, user) => {
            if (error) return refresh(req, res, next);
            req.user = user;
            req.accessToken = accessToken;
            req.refreshToken = refreshToken;
            next();
        });
    };

    export const refresh = (req, res, next) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.json({ valid: false, message: err_msg.e00x22 });
        jwt.verify(refreshToken, token.REFRESH, (error, user) => {
            if (error)  return res.json({ valid: false, message: err_msg.e00x21 });
            delete user.iat;
            delete user.exp;
            const newAccessToken = jwt.sign(user, token.SECRET, { expiresIn: "1d" });
            req.accessToken = newAccessToken;
            req.refreshToken = refreshToken;
            res.setHeader("Authorization", newAccessToken);
            next();
        });
      };