import { Request, Response } from 'express';
import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';

require("dotenv").config();

const USER: string | undefined = process.env.USER;
const PASS: string | undefined = process.env.APP_PASSWORD;

// Read HTML content from file
const htmlContent = fs.readFileSync("./app/emailTemplate.html", "utf8");

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-19-2024
 * PURPOSE/DESCRIPTION  : To Email from EmailModel
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : sendEmail
 *****************************************************************/
export async function sendEmail(req: Request, res: Response) {
    const { to, subject, text } = req.body;
    try {
        if (!USER || !PASS) throw new Error("Email credentials are not provided");
        const transporter: Transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            secure: false,
            auth: {
                user: USER,
                pass: PASS,
            },
        });
        const mailOptions = {
            from: {
                name: "Cebu Innosoft Solutions Services, Inc.",
                address: USER,
            },
            to,
            subject,
            text,
            html: htmlContent || '',
        };

        const info = await transporter.sendMail(mailOptions);
        if (!info) return res.status(500).json({ message: "Failed to send email" });
        return res.status(200).json({ message: "Email sent successfully" });
        
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Failed to send email" });
    }
}