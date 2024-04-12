import { LoginFormSchema, loginSchema } from "@/components/login/login.schema";
import { useGlobalState } from "@/hooks/useGlobalContext";
import { axiosCall } from "@/infraestructure/axios";
import { BackendError } from "@/interfaces/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginResponse } from "./LoginForm.interfaces";
import { toast } from "@/components/ui/use-toast";

export const useLoginForm = () => {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { setIsLogged, setView } = useGlobalState();
  const navigate = useNavigate();

  const onSubmit = async (values: LoginFormSchema) => {
    try {
      await axiosCall<LoginResponse>({
        method: "post",
        endpoint: "/auth/login",
        body: values,
      });
      setIsLogged(true);
      setView("");
      navigate("/");
      toast({
        title: "You have Logged in succesfully!",
      });
    } catch (error) {
      const errorData = (error as AxiosError<BackendError>).response?.data;
      // form.setError("root", { type: "value", message: errorData?.message });
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
