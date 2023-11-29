"use client"
import { useState, FormEvent, useEffect } from 'react'

type Note = {
	title: string;
	content: string;
	id: string;
}

const initalState: Note = {
	id: "",
	title: "",
	content: ""
}

export default function EditForm({ params }: { params: { id: string }}) {
	const { id } = params;
	const [note, setNote] = useState<Note>(initalState)

	useEffect(() => {
		fetch(`/api/notes/${id}`)
			.then((res) => res.json())
			.then((data) => setNote(data.note))
			.catch((err) => console.log(err))
	}, [id])

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		fetch(`/api/notes/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(note)
		})
			.then(() => window.location.replace("/"))
			.catch((err) => console.log(err))
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
			<h1 className="text-center text-3xl my-4">Editando Nota {note.id}</h1>
			<form className="flex flex-col gap-4 mx-auto md:w-3/6" onSubmit={handleSubmit}>
				<input type="text" placeholder="Título" className="border p-2 border-b-2" name="title" value={note.title} onChange={handleChange} />
				<textarea placeholder="Descripción" rows={4} className="border p-2 border-b-2" name="content" value={note.content} onChange={handleChange} />
				<button type="submit" className="bg-yellow-500 text-white p-1">Editar Nota</button>
			</form>
		</section>
	)
}
