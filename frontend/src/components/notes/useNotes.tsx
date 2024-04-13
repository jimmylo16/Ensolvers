import { axiosCall } from "@/infraestructure/axios";
import { Category } from "@/interfaces/categories";
import { Notes } from "@/interfaces/notes";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoteStatus } from "./notesList/NoteList.interfaces";

export const useNotes = () => {
  const [notes, setNotes] = useState<Notes[]>([]);
  const [open, setOpen] = useState(false);
  const [noteId, setNoteId] = useState<string | undefined>();
  const [noteStatus, setNoteStatus] = useState<NoteStatus>("active");
  const [renderedNotes, setRenderedNotes] = useState<Notes[]>([]);
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);

  const navigate = useNavigate();

  useEffect(() => {
    axiosCall<Notes[]>({
      method: "get",
      endpoint: "/notes",
    })
      .then((notes) => {
        setNotes(notes);
        setRenderedNotes(notes.filter((note) => note.status === "active"));
      })
      .catch((err: AxiosError) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((err.response?.data as any).statusCode === 401) {
          navigate("/login");
        }
      });
  }, []);

  useEffect(() => {
    axiosCall<Category[]>({
      method: "get",
      endpoint: "/category",
    }).then((res) => {
      setCategories(
        res.map((category) => ({ value: category.id, label: category.name }))
      );
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
    }).then(() => {
      axiosCall<Notes[]>({
        method: "get",
        endpoint: "/notes",
      }).then((notes) => {
        setNotes(notes);
        setRenderedNotes(notes);
      });
    });
  };

  const onArchive = (noteId: string) => {
    axiosCall<Notes[]>({
      method: "patch",
      endpoint: `/notes/${noteId}`,
      body: { status: "archived" },
    }).then(() => {
      axiosCall<Notes[]>({
        method: "get",
        endpoint: "/notes",
      }).then((notes) => {
        setNotes(notes);
        setRenderedNotes(notes.filter((note) => note.status === noteStatus));
      });
    });
  };
  const onActivate = (noteId: string) => {
    axiosCall<Notes[]>({
      method: "patch",
      endpoint: `/notes/${noteId}`,
      body: { status: "active" },
    }).then(() => {
      axiosCall<Notes[]>({
        method: "get",
        endpoint: "/notes",
      }).then((notes) => {
        setNotes(notes);
        setRenderedNotes(notes.filter((note) => note.status === noteStatus));
      });
    });
  };

  const filterNote = (categoryId: string) => {
    if (categoryId === "-") {
      setRenderedNotes(notes.filter((note) => note.status === noteStatus));
    } else {
      setRenderedNotes(
        notes
          .filter((note) => note.status === noteStatus)
          .filter((note) => {
            console.log(note.categories.find((cat) => cat?.id === categoryId));
            return note.categories.find((cat) => cat?.id === categoryId);
          })
      );
    }
  };

  const togleActiveNotes = (status: NoteStatus) => {
    setNoteStatus(status);
    setRenderedNotes(notes.filter((note) => note.status === status));
  };

  return {
    notes,
    noteStatus,
    renderedNotes,
    onClick,
    onActivate,
    open,
    setOpen,
    noteId,
    onDelete,
    onArchive,
    togleActiveNotes,
    categories,
    filterNote,
  };
};
