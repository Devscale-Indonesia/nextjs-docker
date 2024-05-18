import prisma from "@/utils/prisma";

export default async function Home() {
  const notes = await prisma.note.findMany();

  return (
    <>
      <h1>Hey bro!!!!</h1>
      {notes.map((note) => {
        return (
          <div key={note.id} className="bg-red-100 p-4 rounded-lg mb-4">
            <div className={note.isDone ? "line-through" : ""}>{note.content}</div>
          </div>
        );
      })}
    </>
  );
}
