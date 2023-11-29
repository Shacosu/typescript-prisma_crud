"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Note = {
	id: string;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
};

export default function Notes() {
	const [notes, setNotes] = useState<Note[]>([]);
	const [offset, setOffset] = useState(0);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	useEffect(() => {
		fetch(`/api/notes?offset=${offset}`)
			.then((res) => res.json())
			.then((data) => setNotes(data.notes))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, [offset]);

	const handleDelete = (id: string) => {
		fetch(`/api/notes/${id}`, { method: "DELETE" }).then(() => window.location.reload());
	}

	const handleNext = () => {
		if (notes.length < 10) return;
		setOffset(offset + 10);
	};
	const handlePrev = () => {
		if (offset === 0) return;
		setOffset(offset - 10);
	};

	if (loading) return <p className="text-center text-xl">Cargando...</p>;
	return (
		<section>
			<h2 className="text-2xl my-2">Notas ({notes.length})</h2>
			{notes.length === 0 && <p className="text-center text-xl">No hay notas...</p>}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				{notes.map((note) => (
					<div key={note.id} className="min-h-20 p-4 bg-gray-100 hover:bg-gray-50 cursor-pointer relative" onClick={() => router.push("edit/" + note.id)}>
						<button className="absolute top-0 right-0 bg-red-600 hover:bg-red-500 text-white p-1 px-3 " onClick={() => handleDelete(note.id)}> X </button>
						<h3><strong>Titulo:</strong><span className="block">{note.title}</span></h3>
						<p><strong>Contenido:</strong><span className="block">{note.content}</span></p>
						<p><strong>Fecha de Creacion:</strong> <span className="block">{new Date(note.createdAt).toLocaleString()}</span></p>
					</div>
				))}
			</div>
			<div className="flex justify-center gap-x-4 my-4">
				<button onClick={handlePrev} className="bg-gray-300 p-2 disabled:opacity-50" disabled={offset === 0}>
					Prev
				</button>
				<button onClick={handleNext} className="bg-green-300 p-2 disabled:opacity-50" disabled={notes.length < 10}>
					Next
				</button>
			</div>
		</section>
	);
}
