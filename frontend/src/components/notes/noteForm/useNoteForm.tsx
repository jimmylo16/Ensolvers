import { toast } from "@/components/ui/use-toast";
import { BackendError } from "@/interfaces/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { NoteSchema, noteSchema } from "./noteSchema";
import { axiosCall } from "@/infraestructure/axios";
import { useEffect, useState } from "react";
import { NoteFormProps } from "./NoteForm.interfaces";
import { Notes } from "@/interfaces/notes";
import { Category } from "@/interfaces/categories";

export const useNoteForm = ({ noteId, setOpenAddNote }: NoteFormProps) => {
  const form = useForm<NoteSchema>({
    resolver: zodResolver(noteSchema),
  });

  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);

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

  useEffect(() => {
    if (noteId) {
      axiosCall<Notes>({
        method: "get",
        endpoint: `/notes/${noteId}`,
      }).then((res) => {
        form.reset({
          title: res.title,
          content: res.content,
          categories: res.categories[0].id,
        });
      });
    }
  }, [form, noteId]);

  const onSubmit = async (values: NoteSchema) => {
    const body = {
      title: values.title,
      content: values.content,
      category: [values.categories],
    };
    try {
      if (noteId) {
        await axiosCall<unknown>({
          method: "patch",
          endpoint: `/notes/${noteId}`,
          body: body,
        });
      } else {
        await axiosCall<unknown>({
          method: "post",
          endpoint: "/notes",
          body: body,
        });
      }
      setOpenAddNote(false);
      window.location.reload();
    } catch (error: unknown) {
      const errorData = (error as AxiosError<BackendError>).response?.data;
      toast({
        title: "You have an error with the form:",
        description: (
          <span className="mt-2 w-[340px] ">{errorData?.message}</span>
        ),
      });
    }
  };

  return { form, onSubmit, categories };
};
