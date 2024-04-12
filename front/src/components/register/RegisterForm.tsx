import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegisterForm } from "./useRegisterForm";

export const RegisterForm = () => {
  const { form, onSubmit } = useRegisterForm();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-1/4 justify-center "
        data-testid="register-form"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2 text-blue-700">Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Full Name"
                  className="rounded-2xl"
                  data-testid="fullNameInput"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2 text-blue-700">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"
                  className="rounded-2xl"
                  {...field}
                  data-testid="emailInput"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2 text-blue-700">Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
                  className="rounded-2xl"
                  type="password"
                  data-testid="passwordInput"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!form.formState.isValid && <>{form.formState.errors.root?.message}</>}
        <div className="flex flex-col justify-center items-center mt-4">
          <Button
            type="submit"
            className="bg-blue-400 rounded-full w-1/2 hover:bg-blue-300"
          >
            {form.formState.isLoading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
