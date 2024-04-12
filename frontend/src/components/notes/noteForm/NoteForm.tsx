import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNoteForm } from "./useNoteForm";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NoteFormProps } from "./NoteForm.interfaces";

export const NoteForm = ({ noteId }: NoteFormProps) => {
  const { form, onSubmit, categories } = useNoteForm({ noteId });
  return (
    <DialogHeader>
      <DialogTitle className="text-center text-2xl">
        {noteId ? "Edit Note" : "Add Note"}
      </DialogTitle>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full justify-center p-4"
          data-testid="register-form"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-2 text-blue-700">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title Note"
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
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-2 text-blue-700">Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add note description"
                    className="resize-none"
                    {...field}
                    data-testid="contentInput"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-2 text-blue-700">Content</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={""}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.length > 0 &&
                      categories.map((category) => (
                        <SelectItem value={category}>{category}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
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
