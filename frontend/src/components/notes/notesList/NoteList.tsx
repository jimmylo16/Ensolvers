import { NoteForm } from "../noteForm/NoteForm";
import { useNotes } from "../useNotes";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export const NoteList = () => {
  const { notes, open, setOpen, onClick, noteId } = useNotes();

  if (notes.length === 0) {
    return <p>No notes found, please add a note</p>;
  }
  return (
    <section className="flex flex-wrap">
      {notes.map((note) => (
        <div
          key={note.id}
          className="rounded-lg p-4 m-4 bg-slate-100 w-60 shadow-black  shadow-sm cursor-pointer flex flex-col gap-4"
          onClick={() => onClick(note.id)}
        >
          <span className="text-2xl">{note.title}</span>
          <p>{note.content}</p>
          <span className="text-xs">
            {new Date(note.createdAt).toDateString()}
          </span>
        </div>
      ))}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <NoteForm noteId={noteId} />
        </DialogContent>
      </Dialog>
    </section>
  );
};
