import { Notes } from "./notes";

export interface Category {
  createdAt: string;
  id: string;
  description: string;
  name: string;
  notes: Notes[];
}
