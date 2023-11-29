import { NextResponse, NextRequest } from "next/server";
import { client } from "@/libs/prisma"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function GET(request: NextRequest, { params }: { params: { id: string } } ) {
	try {
		const note = await client.note.findUnique({ where: { id: params.id } })
		return NextResponse.json({
			textStatus: "GET from /api/notes/[id]",
			note
		})
	} catch (error: unknown) {
		if (error instanceof PrismaClientKnownRequestError) {
		return NextResponse.json({
			textStatus: "Error in /api/notes/[id]",
			error: error.message
		}, { status: 500 })
	}
}
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } } ) {
	try {
		const { title, content } = await request.json();
		const updatedNote = await client.note.update({
			where: { id: params.id },
			data: {
				title,
				content
			}
		})
	
		return NextResponse.json({
			textStatus: "PUT from /api/notes/[id]",
			note: updatedNote
		})
	} catch (error: unknown) {
		if (error instanceof PrismaClientKnownRequestError) {
		return NextResponse.json({
			textStatus: "Error in /api/notes/[id]",
			error: error.message
		})
	}
}
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } } ) {
	try {
		const deletedNote = await client.note.delete({ where: { id: params.id } })
		return NextResponse.json({
			textStatus: "DELETE from /api/notes/[id]",
			note: deletedNote
		})
	} catch (error: unknown) {
		if (error instanceof PrismaClientKnownRequestError) {
			return NextResponse.json({
				textStatus: "Error in /api/notes/[id]",
				error: error.message
			}, { status: 500 })
		}
	}
}