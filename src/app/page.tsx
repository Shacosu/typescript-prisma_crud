import Form from "@/components/Form";
import Notes from "@/components/Notes";
export default function HomePage() {

	return (
		<div>
      <h1 className="text-center my-2 text-3xl">CRUD TS + Prisma</h1>
			<div className="container mx-auto px-4 space-y-8">
        <Form />
        <Notes />
			</div>
		</div>
	);
}
