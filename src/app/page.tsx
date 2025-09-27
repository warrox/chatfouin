"use client";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {TrophySpin } from "react-loading-indicators"
import logo from '../kyo.png'
export default function Home() {
	const [ text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult ] = useState<string | null> (null);
    console.log(logo);
    async function handleAnalyze() {
        if (!text.trim()) return;
        setLoading(true);
        setResult(null);

        try {
            const res = await fetch("/api/handler", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });

            if (!res.ok) throw new Error("Erreur serveur");
            console.log("res : ", res);
            const data = await res.json()
            console.log("Data : ", data);
            setResult(data.message); // Met la réponse dans l'état
        } catch (err) {
            setResult("Une erreur est survenue.");
        } finally {
            setLoading(false);
        }
    }
    return (
		<main className="flex flex-col justify-center items-center min-h-screen p-8 bg-linear-to-tl from-indigo-400 to-blue-900 ">
            <h1 className="header-font text-7xl font-bold text-yellow-50 mb-4 text-center"> 
                Chatfouin </h1>
            <div className="mb-6 flex justify-center">
                <Image src={logo} alt="Logo" width={150} height={150}/>
                </div>
            <div className="w-full max-w-md  p-6 rounded-2xl shadow-2xl bg-[var(--cream)]">
				<h1 className="text-2xl font-bold text-zinc-600 mb-4 text-center ">
					Analyse de détection de texte IA
				</h1>
				<Textarea
					className="w-full h-80 p-4 text-zinc-900 bg-yellow-50 rounded-xl border border-indigo-400  focus:ring-2 focus:ring-blue-500 placeholder-zinc-900 resize-none"
					placeholder="Copie/colle ton texte"
                    value={text}
                    onChange={(e) => setText(e.target.value)} 
				/>
				<Button className="w-full mt-4 bg-indigo-400 hover:bg-orange-700 text-white rounded-xl transition duration-300"
                 onClick={() => handleAnalyze()}>
					Analyser
				</Button>
                {loading && 
                    (<div className="flex justify-center items-center my-4"> 
                    <TrophySpin color="#5C6BC0" size="small" text="" textColor="" /> </div>)}
                <p className=" w-full m-1  text-zinc-900"> { result } </p>
			</div>
		</main>
	);
    
}

