import fs from "fs";
import path from "path";
import { Mistral } from "@mistralai/mistralai";
const apiKey = process.env.MISTRAL_API_KEY || "BwCxu6HJUtBbMMuoiB9IsG97KBDDJPAF";
const client = new Mistral({ apiKey });
import type { MessageOutputEntry, MessageOutputContentChunks } from "@mistralai/mistralai/models/components";
// --------------------------------------------
//  Chargement du dictionnaire CSV
// --------------------------------------------
export function csvToData(): Map<string, number> {
    const filePath = path.join(process.cwd(), "frequence.csv");
    const csvData: string = fs.readFileSync(filePath, "utf-8");
    const dic = new Map<string, number>();
    const lines = csvData.split("\n");

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const parts = line.split(",");
        if (parts.length < 3) continue;
        const freq = parseInt(parts[1].replace(/\s/g, ""), 10);
        const word = parts[2];
        dic.set(word, freq);
    }
    return dic;
}

// --------------------------------------------
//  Score sur les mots connus
// --------------------------------------------
function scoreWeight(input: string, dic: Map<string, number>) {
    let total = 0;
    let count = 0;
    let wordInDetect = new Map<string, number>();
    for (const word of input.split(/\s+/)) {
        if (dic.has(word)) {
            const val = dic.get(word)!;
            wordInDetect.set(word, val);
            total += val;
            count++;
        }
    }
    const score = total === 0 ? 0 : count / total;
    return { score, wordInDetect };
}

// --------------------------------------------
//  Nettoyage du texte
// --------------------------------------------
function cleanInput(input: string): string {
    input = input.toLowerCase();
    input = input.replace(/[^a-zàâçéèêëîïôûùüÿñæœ\s']/gi, "");
    return input.trim();
}

// --------------------------------------------
//  Formule human_score
// --------------------------------------------
function humanScore(words: string[], dic: Map<string, number>): number {
    const N = words.length;
    if (N === 0) return 0;

    const uniqueWords = new Set(words);
    const R = uniqueWords.size / N;

    let suspectCount = 0;
    for (const w of words) {
        if (!dic.has(w)) suspectCount++;
    }
    const S = suspectCount / N;

    const freq = new Map<string, number>();
    for (const w of words) freq.set(w, (freq.get(w) || 0) + 1);
    let repetition = 0;
    for (const f of freq.values()) {
        if (f > 1) repetition += (f - 1);
    }
    const D = repetition / N;

    const score = 120 * (0.5 * R + 0.3 * (1 - S) + 0.2 * (1 - D));
    return Math.max(0, Math.min(score, 100));
}

// --------------------------------------------
//  Fonction principale
// --------------------------------------------
export async function AiDetector(input: string){
    input = input.toString();
    const clnStr = cleanInput(input);
    const dic = csvToData();
    const obj = scoreWeight(clnStr, dic);

    const wordsArray = Array.from(obj.wordInDetect.entries()).map(([word, score]) => ({ word, score }));
    const wordsList = clnStr.split(/\s+/).filter(w => w.length > 0);
    const hScore = humanScore(wordsList, dic);

    const origin = obj.score < 0.00001 ? "Phrase originale IA : " : "Phrase originale Humaine : ";

    const prompt = JSON.stringify({
        words: wordsArray,
        original: origin + clnStr,
        humanScore: hScore
    });

    let conversation = await client.beta.conversations.start({
    agentId: "ag:ed5a92aa:20250924:aidetector:6f1d059e",
    inputs: prompt,
    });
    const firstOutput = conversation.outputs?.[0];
    let response = "";

    if (firstOutput && "content" in firstOutput) {
        const content = (firstOutput as MessageOutputEntry).content;
        if (Array.isArray(content)) {
            response = content
                .map((chunk: MessageOutputContentChunks) =>
                    "text" in chunk ? chunk.text : ""
                )
                .join("\n");
        } else {
            response = content as string;
        }
    }
    console.log(response)
    return response;
}

