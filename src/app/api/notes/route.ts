import { NextResponse, NextRequest } from "next/server";
import { client } from "@/libs/prisma";

type Note = {
	readonly id: number;
	title: string;
	content?: string;
	createdAt?: Date;
	updatedAt?: Date;
};

export async function GET(request: NextRequest ) {
	try {
		const searchParams = new URLSearchParams(request.nextUrl.searchParams)
		const offset: string = searchParams.get("offset") || "0"
		const notes = await client.note.findMany({
			skip: parseInt(offset),
			take: 10,
			orderBy: { createdAt: "desc" }
		})
		const totalNotes = await client.note.count()
		const currentPage = parseInt(offset) / 10 + 1
		const nextPage = currentPage < Math.ceil(totalNotes / 10) ? currentPage + 1 : null
		const prevPage = currentPage > 1 ? currentPage - 1 : null
		
		return NextResponse.json({ textStatus: "ok", totalNotes, notes, pagination: { currentPage, nextPage, prevPage, offset: parseInt(offset), limit: 10 } })
	} catch (error: unknown) {
		if (error instanceof Error) {
			return NextResponse.json({ textStatus: "error getting notes", error: error.message }, { status: 500 })
		}
	}
}

export async function POST(request: NextRequest) {
	try {
		const { title, content }: Note = await request.json();
		const createdNote = await client.note.create({
			data: {
				title,
				content,
			}
		})
		return NextResponse.json({ textStatus: "ok", note: createdNote })
	} catch (error: unknown) {
		if (error instanceof Error) {
			return NextResponse.json({ textStatus: "error creating note", error: error.message }, { status: 500 })
		}
	}
}