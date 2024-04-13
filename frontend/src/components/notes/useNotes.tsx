import { axiosCall } from "@/infraestructure/axios";
import { Notes } from "@/interfaces/notes";
import { useEffect, useState } from "react";

export const useNotes = () => {
  const [notes, setNotes] = useState<Notes[]>([]);
  const [open, setOpen] = useState(false);
  const [noteId, setNoteId] = useState<string | undefined>();

  useEffect(() => {
    axiosCall<Notes[]>({
      method: "get",
      endpoint: "/notes",
    }).then((notes) => setNotes(notes));
  }, []);

  const onClick = (noteId: string) => {
    setOpen(true);
    setNoteId(noteId);
  };

  const onDelete = (noteId: string) => {
    axiosCall<Notes[]>({
      method: "delete",
      endpoint: `/notes/${noteId}`,
    });
  };

  return { notes, onClick, open, setOpen, noteId, onDelete };
};
