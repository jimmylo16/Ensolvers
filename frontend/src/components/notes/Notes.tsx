import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { NoteForm } from "./noteForm/NoteForm";

export const Notes = () => {
  return (
    <div data-testid="notes-component">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Note</Button>
        </DialogTrigger>
        <DialogContent>
          <NoteForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};
