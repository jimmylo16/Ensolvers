import { Button } from "@/components/ui/button";
import { NoteActionsProps } from "./NoteList.interfaces";
import ArchivedSvg from "@/components/icons/Archived.svg";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

export const NoteActions = ({
  togleActiveNotes,
  renderedNotes,
  categories,
  noteStatus,
  filterNote,
}: NoteActionsProps) => {
  return (
    <>
      <section className="flex flew-row gap-2 pl-2">
        <Button
          className={`bg-gray-600 ${
            noteStatus === "active" ? "animate-pulse" : ""
          }`}
          onClick={() => togleActiveNotes("active")}
        >
          Active Notes
        </Button>
        <Button
          className={`bg-gray-600 flex flex-row gap-2 ${
            noteStatus === "archived" ? "animate-pulse" : ""
          }`}
          onClick={() => togleActiveNotes("archived")}
        >
          <ArchivedSvg
            className="cursor-pointer text-white"
            fill="white"
            width={20}
          />
          Archived Notes
        </Button>
        <Select onValueChange={(value) => filterNote(value)}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Select a Category to filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={"-"}>Select a Category to filte</SelectItem>
              {categories.map((category, index) => (
                <SelectItem value={category.value} key={category.value + index}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>
      {renderedNotes.length === 0 && (
        <p>No notes {noteStatus} found, please add a note</p>
      )}
    </>
  );
};
