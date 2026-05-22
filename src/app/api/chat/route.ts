import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ reply: "Sorry, I am currently offline. Please connect with us on WhatsApp!" });
    }

    // AI కి ఇచ్చే రూల్స్ (కేవలం ఇంగ్లీష్ లోనే మాట్లాడాలి)
    const prompt = `You are Lumina, a polite, elegant, and professional virtual assistant for 'Sirisha Makeovers'.
    Rules:
    1. STRICT RULE: Always reply in English ONLY. Keep the tone warm and professional. Do not use any Telugu/Tanglish words.
    2. Sirisha Makeovers offers Bridal Makeup, Reception, Haldi, Hair Styling, and Saree Draping.
    3. If they ask for a price/cost, say packages depend on the look, and ask them to click 'Book Now' or message on WhatsApp. Never give exact numbers.
    4. Keep answers short, sweet, and under 3 sentences. Add emojis.
    5. User message: "${message}"`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const data = await response.json();
    const aiReply = data.candidates[0].content.parts[0].text;

    return NextResponse.json({ reply: aiReply });
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ reply: "Looks like a network issue. Please drop us a message on WhatsApp!" });
  }
}
