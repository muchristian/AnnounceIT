import nodemailer from 'nodemailer';
export default (mailTo, genPwd) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'markjoker73@gmail.com',
          pass: 'dioblo32'
        }
      });
      
      const mailOptions = {
        from: 'markjoker73@gmail.com',
        to: mailTo,
        subject: 'forgotten password',
        text: `your new password - ${genPwd}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent successfully');

        }
      });
}
