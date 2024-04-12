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

export const useNoteForm = ({ noteId }: NoteFormProps) => {
  const form = useForm<NoteSchema>({
    resolver: zodResolver(noteSchema),
    // defaultValues: async () => {
    //   return {
    //     title: "",
    //     content: "",
    //     categories: await axiosCall<string[]>({
    //       method: "get",
    //       endpoint: "/category",
    //     }),
    //   };
    // },
  });

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    axiosCall<string[]>({
      method: "get",
      endpoint: "/category",
    }).then((res) => {
      setCategories(res);
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
          categories: res.categories,
        });
      });
    }
  }, [form, noteId]);

  const onSubmit = async (values: NoteSchema) => {
    const body = {
      title: values.title,
      content: values.content,
      category: values.categories,
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
