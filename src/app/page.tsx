import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const notes = await prisma.note.findMany();

  async function handleCreateNote(formData: FormData) {
    "use server";
    const content = formData.get("content");

    await prisma.note.create({
      data: {
        content: content as string,
      },
    });

    revalidatePath("/");
  }

  async function handleDeleteNote(formData: FormData) {
    "use server";
    const id = formData.get("id");

    await prisma.note.delete({
      where: {
        id: id as string,
      },
    });

    revalidatePath("/");
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Docker Test :</h1>
      <div>
        {notes.map((note) => {
          if (!note.isDone) {
            return (
              <div key={note.id} className="bg-slate-100 px-4 py-2 rounded-lg mb-3 flex justify-between items-center">
                <div>{note.content}</div>
                <form action={handleDeleteNote}>
                  <input type="hidden" name="id" value={note.id} />
                  <button className="text-xs font-medium bg-slate-400 text-slate-100 px-2 py-1 rounded-lg">delete</button>
                </form>
              </div>
            );
          }
          return (
            <div key={note.id} className="bg-slate-50 text-slate-200 px-4 py-2 rounded-lg mb-3 flex justify-between items-center">
              <div>{note.content}</div>
              <form action={handleDeleteNote}>
                <input type="hidden" name="id" value={note.id} />
                <button className="text-xs font-medium bg-slate-400 text-slate-100 px-2 py-1 rounded-lg">delete</button>
              </form>
            </div>
          );
        })}
      </div>
      <form action={handleCreateNote} key={Math.random()}>
        <input name="content" type="text" placeholder="Type here" className="border p-3 rounded-lg w-full max-w-xs" />
      </form>
    </div>
  );
}
