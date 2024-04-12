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
import { useLoginForm } from "./useLoginForm";

export const LoginForm = () => {
  const { form, onSubmit } = useLoginForm();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-1/4 justify-center "
        data-testid="login-form"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2 text-blue-700">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="email"
                  className="rounded-2xl"
                  data-testid="emailInput"
                  {...field}
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
                  placeholder="password"
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
          <Button type="submit" className="bg-blue-400 rounded-full w-1/2">
            {form.formState.isLoading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
