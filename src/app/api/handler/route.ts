import { NextResponse } from "next/server";
import { AiDetector } from "@/detector/detect";
export async function GET() {
  AiDetector("salut !!!!!!!!! mech@nt");
    
  return NextResponse.json({ message: "Well received (GET)" });
}

export async function POST(req: Request) {
  const body = await req.json(); // si tu envoies du JSON
  return NextResponse.json({ message: "Well received (POST)", data: body });
}
