import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button"
export default function Home() {
	return(
	<main className="flex flex-col justify-center items-center min-h-screen p-8 gap-4">
		<h1>Analyse de detection de texte IA</h1>
		<Textarea className="w-98 h-32" placeholder="Copie/colle ton texte"/>
		<Button className="w-32 m-2"> Button </Button>
	</main>
	);
}
//----------------
