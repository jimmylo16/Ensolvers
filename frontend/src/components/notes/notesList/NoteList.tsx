import TrashSvg from "@/components/icons/Trash.svg";
import { NoteForm } from "../noteForm/NoteForm";
import { useNotes } from "../useNotes";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ArchivedSvg from "@/components/icons/Archived.svg";
import { NoteActions } from "./NoteActions";
import ActivateSvg from "@/components/icons/Activate.svg";

export const NoteList = () => {
  const {
    noteStatus,
    renderedNotes,
    open,
    setOpen,
    onClick,
    noteId,
    onDelete,
    onArchive,
    togleActiveNotes,
    categories,
    filterNote,
    onActivate,
  } = useNotes();
  return (
    <>
      <NoteActions
        categories={categories}
        renderedNotes={renderedNotes}
        togleActiveNotes={togleActiveNotes}
        filterNote={filterNote}
        noteStatus={noteStatus}
      />
      <section className="flex flex-wrap">
        {renderedNotes.map((note) => (
          <div
            key={note.id}
            className="rounded-lg p-4 m-4 bg-slate-100 w-60 shadow-black  shadow-sm  flex flex-col gap-4"
          >
            <div className="flex flex-row justify-between">
              <span
                className="text-2xl cursor-pointer"
                onClick={() => onClick(note.id)}
              >
                {note.title}
              </span>
              <div className="flex gap-2 items-center justify-center">
                {note.status === "active" ? (
                  <ArchivedSvg
                    className="cursor-pointer"
                    onClick={() => onArchive(note.id)}
                  />
                ) : (
                  <ActivateSvg
                    className="cursor-pointer"
                    onClick={() => onActivate(note.id)}
                  />
                )}

                <TrashSvg
                  onClick={() => onDelete(note.id)}
                  className="z-10 cursor-pointer"
                />
              </div>
            </div>
            <section
              onClick={() => onClick(note.id)}
              className="flex flex-col gap-4 cursor-pointer"
            >
              <p>{note.content}</p>
              <span className="text-xs bg-blue-800 text-white w-fit rounded-full p-1">
                {note.categories[0]?.name}
              </span>
              <span className="text-xs">
                {new Date(note.createdAt).toDateString()}
              </span>
            </section>
          </div>
        ))}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <NoteForm noteId={noteId} setOpenAddNote={setOpen} />
          </DialogContent>
        </Dialog>
      </section>
    </>
  );
};
