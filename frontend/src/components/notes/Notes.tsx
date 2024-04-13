import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { CategoryForm } from "./categoryForm/CategoryForm";
import { NoteForm } from "./noteForm/NoteForm";
import { NoteList } from "./notesList/NoteList";
export const Notes = () => {
  const [openAddNote, setOpenAddNote] = useState(false);

  return (
    <div
      data-testid="notes-component"
      className="w-full justify-center flex flex-col gap-4"
    >
      <div className="flex flex-row justify-between">
        <Dialog open={openAddNote} onOpenChange={setOpenAddNote}>
          <DialogTrigger asChild>
            <Button className="w-fit" onClick={() => setOpenAddNote(true)}>
              Add Note
            </Button>
          </DialogTrigger>
          <DialogContent>
            <NoteForm setOpenAddNote={setOpenAddNote} />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-fit">Add Category</Button>
          </DialogTrigger>
          <DialogContent>
            <CategoryForm />
          </DialogContent>
        </Dialog>
      </div>

      <NoteList></NoteList>
    </div>
  );
};
