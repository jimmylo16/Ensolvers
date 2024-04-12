import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { AddNoteForm } from "./addNoteForm/AddNoteForm";

export const Notes = () => {
  return (
    <div data-testid="notes-component">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Note</Button>
        </DialogTrigger>
        <AddNoteForm />
      </Dialog>
    </div>
  );
};
