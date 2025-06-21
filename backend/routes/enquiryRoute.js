import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (req, res) => {
  const { itemId, itemName, userEmail, message } = req.body;

  if (!userEmail) {
    return res.status(400).json({ success: false, message: "User email is required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: `${process.env.EMAIL_USER}`,
      replyTo: userEmail,
      to: process.env.ADMIN_EMAIL,
      subject: `New Enquiry about Item: ${itemName}`,
      text: `
        You have a new enquiry for item: ${itemName} (ID: ${itemId})

        From: ${userEmail}

        Message: ${message || "No message provided"}
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Enquiry sent successfully' });
  } catch (error) {
    console.error('Error sending enquiry email:', error);
    return res.status(500).json({ success: false, message: 'Failed to send enquiry' });
  }
});

export default router;
