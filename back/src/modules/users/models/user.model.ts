import { BaseModel } from 'src/common/models/base.model';
import { NotesModel } from 'src/modules/notes/models/note.model';

export class UserModel extends BaseModel {
  readonly id: string;
  readonly fullName: string;
  readonly age: number;
  readonly email: string;
  readonly password: string;
  readonly refreshToken?: string;
  readonly notes: NotesModel[];
}
