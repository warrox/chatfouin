import { NextResponse } from "next/server";
import { AiDetector } from "@/detector/detect";
export async function GET() {
  AiDetector("il va bien le chien ?");
  AiDetector("Chaque jour est une nouvelle chance d’apprendre et de progresser.")
    
  return NextResponse.json({ message: "Well received (GET)" });
}

export async function POST(req: Request) {
  const body = await req.json(); // si tu envoies du JSON
  return NextResponse.json({ message: "Well received (POST)", data: body });
}
