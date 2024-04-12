import { toast } from "@/components/ui/use-toast";
import { BackendError } from "@/interfaces/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { NoteSchema, noteSchema } from "./noteSchema";

export const useNoteForm = () => {
  const form = useForm<NoteSchema>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      content: "",
      title: "",
    },
  });

  const onSubmit = async (values: NoteSchema) => {
    try {
      console.log(values);
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

  return { form, onSubmit };
};
