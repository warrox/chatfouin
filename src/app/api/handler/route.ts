import { NextResponse } from "next/server";
import { AiDetector } from "@/detector/detect";
export async function GET() {
  // AiDetector("il va bien le chien, je crois que oui ?");
  // AiDetector("Chaque jour est une nouvelle chance d’apprendre et de progresser.")
  // AiDetector("Deux jours après le sauvetage d'un cargo à bord duquel se trouvaient déjà des centaines de migrants, les gardes-côtes italiens ont pris le contrôle vendredi 2 janvier d'un autre bateau en perdition au large des côtes transalpines. Le navire marchand, qui transporte 450 migrants, avait été abandonné par son équipage. L'Ezadeen, qui bat pavillon sierra-léonais, a été pris en charge par les autorités maritimes fait désormais route vers Crotone, en Calabre (sud du pays).")
   AiDetector("Une dissertation est un exercice scolaire ou universitaire où l’on développe une réflexion structurée sur un sujet donné. Elle vise à répondre à une question ou à un problème en présentant une argumentation claire et logique. Une dissertation se compose généralement de trois parties : l’introduction, le développement et la conclusion. L’introduction présente le sujet, le problème et la problématique. Le développement contient plusieurs parties ou paragraphes, chacun exposant un argument soutenu par des exemples ou des preuves. La conclusion résume les idées principales et apporte une ouverture ou une réflexion finale. L’objectif est de montrer sa capacité à analyser, comparer et synthétiser des informations. La clarté, la cohérence et la rigueur sont essentielles. La dissertation nécessite souvent de mobiliser ses connaissances et sa culture générale. Enfin, elle évalue non seulement ce que l’on sait, mais aussi comment on organise sa pensée.") 
  return NextResponse.json({ message: "Well received (GET)" });
}

export async function POST(req: Request) {
  const body = await req.json(); // si tu envoies du JSON
  return NextResponse.json({ message: "Well received (POST)", data: body });
}
