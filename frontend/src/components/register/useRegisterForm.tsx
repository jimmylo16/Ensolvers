import {
  RegisterFormSchema,
  registerSchema,
} from "@/components/register/register.schema";
import { useGlobalState } from "@/hooks/useGlobalContext";
import { axiosCall } from "@/infraestructure/axios";
import { BackendError } from "@/interfaces/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { RegisterResponse } from "./Register.interfaces";
import { toast } from "@/components/ui/use-toast";

export const useRegisterForm = () => {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  const { setIsLogged, setView } = useGlobalState();

  const onSubmit = async (values: RegisterFormSchema) => {
    try {
      await axiosCall<RegisterResponse>({
        method: "post",
        endpoint: "/auth/register",
        body: values,
      });

      setIsLogged(true);
      setView("");
      toast({
        title: "You have registered succesfully!",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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
