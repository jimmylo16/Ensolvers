import { UpdateResult } from 'typeorm';
import { Note } from '../entities/note.entity';
import { Category } from '../entities/category.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { NoteStatus } from '../models/note.model';

export const createdUser: User = {
  id: '',
  email: '',
  createdAt: undefined,
  fullName: '',
  updatedAt: undefined,
  password: '',
  notes: [],
  categories: [],
};
export const createdCategory: Category = {
  id: '',
  description: '',
  name: '',
  user: createdUser,
  notes: [],
  createdAt: undefined,
  updatedAt: undefined,
};
export const createdNote: Note = {
  id: '1',
  title: 'test title',
  content: 'test content',
  createdAt: new Date(),
  updatedAt: new Date(),
  user: createdUser,
  status: NoteStatus.ACTIVE,
  categories: [],
};
export const expectedNotes: Note[] = [
  createdNote,
  {
    id: '2',
    title: 'test title 2',
    content: 'test content 2',
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      id: '2',
      email: '',
      createdAt: new Date(),
      fullName: 'test user 2',
      updatedAt: new Date(),
      password: 'test password 2',
      notes: [],
      categories: [],
    },
    status: NoteStatus.ACTIVE,
    categories: [],
  },
];

export const updatedResult: UpdateResult = {
  raw: [],
  affected: 1,
  generatedMaps: [],
};
