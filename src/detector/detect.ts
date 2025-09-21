import fs from "fs"
import path from "path"


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
	//console.log(dic);
	return dic;
}
function scoreWeight(input : string, dic : Map<string,number>) : number {
    return 0;
}
function cleanInput(input : string) : string {
    input = input.toLowerCase();
    input = input.replace(/[^a-zàâçéèêëîïôûùüÿñæœ\s']/gi, "");
    return input.trim(); 
}
export function AiDetector( input : string) : boolean {
	input = input.toString();
    let clnStr = cleanInput(input);
	let map = csvToData();
    console.log(clnStr);
    console.log("ZXXXZXCSSFSFF")
	return true;

}
