import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCategoryForm } from "./useCategoryForm";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const CategoryForm = () => {
  const { form, onSubmit } = useCategoryForm();
  return (
    <DialogHeader>
      <DialogTitle className="text-center text-2xl">Add Category</DialogTitle>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full justify-center p-4"
          data-testid="register-form"
        >
          <FormField
            control={form.control}
            name="name"
            defaultValue={""}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-2 text-blue-700">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Category Name"
                    className="rounded-2xl"
                    data-testid="titleInput"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            defaultValue={""}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-2 text-blue-700">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add category description"
                    className="resize-none"
                    {...field}
                    data-testid="contentInput"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!form.formState.isValid && (
            <>{form.formState.errors.root?.message}</>
          )}
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
    </DialogHeader>
  );
};
