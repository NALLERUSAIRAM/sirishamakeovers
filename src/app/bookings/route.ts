import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { fullName, phone, service, date, comments } = await request.json();

    // Nodemailer సెటప్ (మీ మెయిల్ & పాస్‌వర్డ్ తో)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'makeoverssirisha@gmail.com',
        pass: 'heae tgoo rmzv scon', // మీ 16-letter App Password
      },
    });

    // ఈమెయిల్ డిజైన్ (మీకు వచ్చే మెయిల్ ఎలా ఉండాలో)
    const mailOptions = {
      from: '"Sirisha Makeovers" <makeoverssirisha@gmail.com>',
      to: 'makeoverssirisha@gmail.com',
      subject: `✨ New Booking Request - ${fullName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #050505; color: #fff; border-radius: 20px; border: 1px solid #d4af37;">
          <h2 style="color: #d4af37; border-b: 1px solid #333; padding-bottom: 10px;">New Session Reservation</h2>
          <p><strong>Customer Name:</strong> ${fullName}</p>
          <p><strong>Phone Number:</strong> ${phone}</p>
          <p><strong>Selected Service:</strong> ${service}</p>
          <p><strong>Booking Date:</strong> ${date}</p>
          <p><strong>Special Requests/Comments:</strong> ${comments || 'None'}</p>
        </div>
      `,
    };

    // మెయిల్ పంపడం
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: 'Email sent successfully!' });

  } catch (error: any) {
    console.error("Mail Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}