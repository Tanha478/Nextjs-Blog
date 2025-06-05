import nodemailer from 'nodemailer'

export async function POST(req) {
  const { name, email, message } = await req.json()

  if (!name || !email || !message) {
    return new Response('Missing fields', { status: 400 })
  }

  // Email transport setup (Gmail example)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.CONTACT_RECEIVER, // Your receiving email
      subject: 'New Contact Form Submission',
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    })

    return new Response('Email sent successfully', { status: 200 })
  } catch (err) {
    console.error('Email send error:', err)
    return new Response('Failed to send email', { status: 500 })
  }
}
