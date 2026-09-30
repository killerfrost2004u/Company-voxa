require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

async function testEmail() {
  console.log('Testing email sender...');
  console.log('User:', process.env.EMAIL_USER);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS?.replace(/"/g, ''), // Removing quotes if any
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'voxaa.business@gmail.com',
    subject: '🚨 Test Email from VOXA Website Development',
    html: `
      <h2>Hello!</h2>
      <p>This is a test email sent directly from your development environment.</p>
      <p>If you are reading this, <strong>your Nodemailer setup and Gmail App Password are working perfectly!</strong></p>
      <br/>
      <p>Best,<br/>Your AI Assistant</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Success! Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

testEmail();
