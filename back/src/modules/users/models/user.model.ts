import { BaseModel } from 'src/common/models/base.model';
import { CategoryModel } from 'src/modules/notes/models/category.model';
import { NoteModel } from 'src/modules/notes/models/note.model';

export class UserModel extends BaseModel {
  readonly id: string;
  readonly fullName: string;
  readonly email: string;
  readonly password: string;
  readonly notes: NoteModel[];
  readonly categories: CategoryModel[];
}
