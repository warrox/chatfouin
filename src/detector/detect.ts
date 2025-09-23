import fs from "fs"
import path from "path"

//  0.000116
export function csvToData() : Map <string,number>{
	const filePath = path.join(process.cwd(),"frequence.csv");
	const csvData  : string = fs.readFileSync(filePath,"utf-8");
	let dic = new Map <string,number>();
	const lines = csvData.split('\n');

	for(let i = 1; i < lines.length; i++){
		const line = lines[i].trim();
		if(!line) continue;
        // console.log("Line : ", line)
		const parts = line.split(',');
	    // console.log("length : ",parts.length)
        if(parts.length < 3) continue;	
		const freq = parseInt(parts[1].replace(/\s/g,''), 10);
		const word = parts[2];
		dic.set(word,freq);
	}
	return dic;
}

function scoreWeight(input : string, dic : Map<string,number>) : {score : number; wordInDetect : Map<string,number>} {
    let total = 0;
    let count = 0;
    let wordInDetect = new Map<string, number>(); // map who conserv the word detected with a weight
    for(const word of input.split(" ")){
        if(dic.has(word)){
            wordInDetect .set(word,dic.get(word)!);
            total += dic.get(word)!;
            count ++;
        }
    } 
        const score = total === 0 ? 0 : count/total;
    return {score, wordInDetect };
}

function cleanInput(input : string) : string {
    input = input.toLowerCase();
    input = input.replace(/[^a-zàâçéèêëîïôûùüÿñæœ\s']/gi, "");
    return input.trim(); 
}

export function AiDetector(input: string): { instruction: string, words: { word: string, score: number }[], original : string } {
    input = input.toString();
    let clnStr = cleanInput(input);
    let dic = csvToData();
    let obj = scoreWeight(clnStr, dic);

    const wordsArray = Array.from(obj.wordInDetect.entries()).map(([word, score]) => ({ word, score }));

    // for (const [key, value] of obj.wordInDetect.entries()) {
    //     console.log(`Clé : ${key} | Valeur : ${value}`);
    // }
    console.log(clnStr);

    if (obj.score < 0.00001) {
        console.log("Génère une synthèse lisible pour un utilisateur à partir de la liste de mots ci-dessous. Explique pourquoi certains mots semblent suspects d'avoir été générés par une IA. Considère comme suspects les mots dont le score est inférieur à 0.000116.",
        wordsArray,"Phrase originale : " + clnStr);
        return {
            instruction: "Génère une synthèse lisible pour un utilisateur à partir de la liste de mots ci-dessous. Explique pourquoi certains mots semblent suspects d'avoir été générés par une IA. Considère comme suspects les mots dont le score est inférieur à 0.000116.",
            words: wordsArray, original : "Phrase originale : " + clnStr
        };
    }
    console.log("Génère un texte synthétique expliquant que la phrase semble naturelle et écrite par un humain. Aucune suspicion d'IA n'est détectée.", "Phrase originale : ", clnStr); 
    return {
        instruction: "Génère un texte synthétique expliquant que la phrase semble naturelle et écrite par un humain. Aucune suspicion d'IA n'est détectée.",
        words: [],
        original: 'Phrase originale : ' + clnStr
    };
}
