"use client"
import { useState, FormEvent } from 'react'

type Note = {
	title: string;
	content: string;
}

const initalState: Note = {
	title: "",
	content: ""
}

export default function Form() {
	const [note, setNote] = useState<Note>(initalState)
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!note.title || !note.content) return alert("Faltan campos por llenar");
		fetch("/api/notes", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(note)
		}).then(() => {
			setNote({
				...initalState
			})
			window.location.reload();

		}).catch((err) => console.log(err))
	}

	const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;
		setNote({
			...note,
			[name]: value
		})
	}
	return (
		<section>
			<form className="flex flex-col gap-4 mx-auto md:w-3/6" onSubmit={handleSubmit}>
				<input type="text" placeholder="Título" className="border p-2 border-b-2" name="title" onChange={handleChange} />
				<textarea placeholder="Descripción" rows={4} className="border p-2 border-b-2" name="content" onChange={handleChange} />
				<button type="submit" className="bg-green-500 text-white p-1">Crear</button>
			</form>
		</section>
	)
}
