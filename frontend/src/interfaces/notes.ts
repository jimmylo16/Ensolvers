export interface Notes {
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  id: string;
  title: string;
  content: string;
  status: string;
  user: User;
  categories: any[];
}

export interface User {
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  id: string;
  fullName: string;
  email: string;
}
