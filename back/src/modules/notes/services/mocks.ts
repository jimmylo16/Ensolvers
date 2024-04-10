import { UpdateResult } from 'typeorm';
import { Note } from '../entities/note.entity';

export const createdNote: Note = {
  id: '1',
  title: 'test title',
  content: 'test content',
  createdAt: new Date(),
  updatedAt: new Date(),
  user: {
    id: '1',
    email: '',
    createdAt: new Date(),
    fullName: 'test user',
    updatedAt: new Date(),
    password: 'test password',
    notes: [],
  },
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
    },
  },
];

export const updatedResult: UpdateResult = {
  raw: [],
  affected: 1,
  generatedMaps: [],
};
