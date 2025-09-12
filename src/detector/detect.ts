import fs from "fs"
import path from "path"


export function csvToData() : Map <string,number>{
	const filePath = path.join(process.cwd(),"frequences.xls");
	const csvData  : string = fs.readFileSync(filePath,"utf-8");
	let dic = new Map <string,number>();
	const lines = csvData.split('\n');

	for(let i = 1; i < lines.length; i++){
		const line = lines[i].trim();
		if(!line) continue;
		const parts = line.split('\t');
		if(parts.length < 3) continue;
		
		const freq = parseInt(parts[1].replace(/\s/g,''), 10);
		const word = parts[2];
		dic.set(word,freq);
	}
	console.log(dic);
	console.log("XXXXXXXXXXXX")
	return dic;
}

export function AiDetector( input : string) : boolean {
	input;
	csvToData();
	return true;

}
