import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { NoteForm } from "./noteForm/NoteForm";
import { NoteList } from "./notesList/NoteList";
export const Notes = () => {
  return (
    <div
      data-testid="notes-component"
      className="w-full justify-center flex flex-col gap-4"
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-fit">Add Note</Button>
        </DialogTrigger>
        <DialogContent>
          <NoteForm />
        </DialogContent>
      </Dialog>

      <NoteList></NoteList>
    </div>
  );
};
