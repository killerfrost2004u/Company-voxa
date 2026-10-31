import nodemailer from 'nodemailer'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, message, plan, phone } = req.body || {}

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Missing required fields (name, email, message).' })
    }

    const emailUser = process.env.EMAIL_USER || 'voxaa.business@gmail.com'
    const emailPass = (process.env.EMAIL_PASS || '').replace(/"/g, '').trim()

    if (!emailPass) {
      console.error('[contact-api] EMAIL_PASS is not configured in environment')
      return res.status(500).json({ success: false, error: 'Email service credentials not configured.' })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    })

    const subject = `New Lead from VOXA Website: ${name} (${plan || 'General Inquiry'})`
    const mailOptions = {
      from: `"${name} (Website Contact)" <${emailUser}>`,
      to: emailUser,
      replyTo: email,
      subject,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Selected Plan / Service: ${plan || 'Not specified'}

Message:
${message}
      `.trim(),
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; padding: 24px; background-color: #0b0b0b; color: #f5f5f5; border-radius: 12px; border: 1px solid #222;">
          <h2 style="color: #63a1f2; margin-top: 0; font-size: 22px;">New Contact Request from VOXA Website</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 0; color: #888; width: 140px;">Name:</td>
              <td style="padding: 8px 0; color: #fff; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #63a1f2; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888;">Phone:</td>
              <td style="padding: 8px 0; color: #fff;">${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888;">Plan / Service:</td>
              <td style="padding: 8px 0;"><span style="background: rgba(99,161,242,0.15); color: #63a1f2; padding: 3px 10px; border-radius: 6px; font-size: 13px; font-weight: 600;">${plan || 'General Inquiry'}</span></td>
            </tr>
          </table>
          <hr style="border: 0; border-top: 1px solid #262626; margin: 24px 0;" />
          <p style="color: #888; margin-bottom: 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Message Body:</p>
          <div style="background-color: #141414; padding: 18px; border-radius: 8px; border-left: 3px solid #63a1f2; white-space: pre-wrap; line-height: 1.6; color: #e5e5e5; font-size: 15px;">${message}</div>
          <footer style="margin-top: 28px; font-size: 12px; color: #666; border-top: 1px solid #1a1a1a; padding-top: 16px;">Sent via VOXA Digital Studio Web Platform</footer>
        </div>
      `.trim(),
    }

    await transporter.sendMail(mailOptions)

    return res.status(200).json({ success: true, message: 'Email sent successfully' })
  } catch (err: any) {
    console.error('[contact-api] Error sending email:', err)
    return res.status(500).json({ success: false, error: err?.message || 'Failed to send email.' })
  }
}
