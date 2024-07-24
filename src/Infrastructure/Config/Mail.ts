import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport(
    {
        service: 'Gmail',
        auth:
        {
            user: 'swappescar@gmail.com',
            pass: 'saxp csas yqpr alcb'
        }
    });

function sendVerificationEmail(email: string, token: string)
{
    const mailOptions = 
    {
        from: 'swappescar@gmail.com',
        to: email,
        subject: 'Email verification',
        text: `Please verify your email by clicking the following link: http://localhost:3000/api/users/verify-email?token=${token}`
    };

    transporter.sendMail(mailOptions, (err, info) => 
        {
            if(err)
                {
                    console.log(err);
                }
            else
            {
                console.log('Email sent: ' + info.response);
            }
        });
};
export default sendVerificationEmail;