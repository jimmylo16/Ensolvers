import { toast } from "@/components/ui/use-toast";
import { BackendError } from "@/interfaces/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { CategorySchema, categorySchema } from "./categorySchema";
import { axiosCall } from "@/infraestructure/axios";

export const useCategoryForm = () => {
  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = async (values: CategorySchema) => {
    const body = {
      name: values.name,
      description: values.description,
    };
    try {
      await axiosCall<unknown>({
        method: "post",
        endpoint: "/category",
        body: body,
      });
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
