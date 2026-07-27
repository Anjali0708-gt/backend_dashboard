import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

//create,transporter

const transporter= nodemailer.createTransport(
    {
        service:"gmail",
          
        auth:{
            user:process.env.Email,
            pass:process.env.GOOGLE_APP_PASSWORD
        }
    }

)
console.log({
  user: process.env.Email,
  pass: process.env.GOOGLE_APP_PASSWORD,
});
 export const sendmail=async(to,subject,html)=>
{
    const sendOptions=
    {
        from:process.env.Email,
        to,
        subject,
        html
    }
  return await transporter.sendMail(sendOptions)
}

export default sendmail;
