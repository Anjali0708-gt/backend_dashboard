// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// const transporter=nodemailer.createTransport(
// {
//     host:"Smtp.gmail.com",
//     port:587,
//     secure:false,
//     auth:
//     {
//         user:process.env.Email,
//         pass:process.env.GOOGLE_APP_PASSWORD
//     }

// })

// transporter.verify((error,success)=>
// {
//   if(error)
//   {
//     console.log("error while nodemailer")
//   }
//   else
//   {
//      console.log("sucess")
//   }

// });

// export const sendmail=async(to,subject,text,html)=>
//     {
//          try{
//             const info=await transporter.sendMail(
//                 {
//                     from:process.env.Email,
//                     to,
//                     subject,
//                     text,
//                     html,
        
//                 }
//             );
//             console.log("FROM:", process.env.Email);
// console.log("TO:", to);
// console.log("SUBJECT:", subject);
//             console.log("email send",info.messageId)
//          }
//          catch(e)
//          {
//             console.log(e)

//          }
//     }

