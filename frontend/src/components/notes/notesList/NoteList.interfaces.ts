import { Notes } from "@/interfaces/notes";

export type NoteActionsProps = {
  categories: {
    value: string;
    label: string;
  }[];
  togleActiveNotes: (status: NoteStatus) => void;
  noteStatus: NoteStatus;
  renderedNotes: Notes[];
  filterNote: (categoryId: string) => void;
};

export type NoteStatus = "active" | "archived";
