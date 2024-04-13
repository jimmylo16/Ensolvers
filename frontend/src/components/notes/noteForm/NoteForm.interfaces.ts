import { SetState } from "@/interfaces";

export type NoteFormProps = {
  noteId?: string;
  setOpenAddNote: SetState<boolean>;
};
