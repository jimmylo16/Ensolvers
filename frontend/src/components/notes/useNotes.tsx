import { axiosCall } from "@/infraestructure/axios";
import { Notes } from "@/interfaces/notes";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useNotes = () => {
  const [notes, setNotes] = useState<Notes[]>([]);
  const [open, setOpen] = useState(false);
  const [noteId, setNoteId] = useState<string | undefined>();

  const navigate = useNavigate();

  useEffect(() => {
    axiosCall<Notes[]>({
      method: "get",
      endpoint: "/notes",
    })
      .then((notes) => setNotes(notes))
      .catch((err: AxiosError) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((err.response?.data as any).statusCode === 401) {
          navigate("/login");
        }
      });
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
