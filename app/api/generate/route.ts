import { NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: Request) {
    const { prompt } = await request.json();

    const readme = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{
            role: 'user',
            content: `faça um readme.me curto e direto para um perfil do github com emojis de sites e logos de linguagens e ferramentas graficos e etc, prompt: ${prompt}`,
        }],
    }).then(res => res.choices[0].message.content);

    return NextResponse.json({ readme }, { status: 200 });
}