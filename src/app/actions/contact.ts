"use server";

import nodemailer from "nodemailer";

export async function sendContactEmail(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const service = formData.get("service") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      return { success: false, error: "Missing required fields." };
    }

    // Configure the email transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // e.g. voxaa.business@gmail.com
        pass: process.env.EMAIL_PASS?.replace(/"/g, ''), // 16-character App Password (quotes stripped)
      },
    });

    const mailOptions = {
      from: `"${name} (Website Contact)" <${process.env.EMAIL_USER}>`,
      to: "voxaa.business@gmail.com",
      replyTo: email,
      subject: `New Lead from VOXA Website: ${name} (${service || 'General Inquiry'})`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Service Required: ${service || "Not specified"}

Message:
${message}
      `,
      html: `
        <h3>New Contact Request from VOXA Website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Service Required:</strong> ${service || "Not specified"}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Failed to send email." };
  }
}
