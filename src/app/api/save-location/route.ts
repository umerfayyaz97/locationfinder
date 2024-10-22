// src/app/api/save-location/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type LocationRequestBody = {
  latitude: number;
  longitude: number;
};

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body
    const { latitude, longitude }: LocationRequestBody = await req.json();

    // Validate the received data
    if (!latitude || !longitude) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    // Configure the Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content with only coordinates in the HTML body
    const mailOptions = {
      from: `"i2R" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "User Location Coordinates",
      html: `
        <p><strong>Latitude:</strong> ${latitude}</p>
        <p><strong>Longitude:</strong> ${longitude}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Location received and email sent." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email." },
      { status: 500 }
    );
  }
}
