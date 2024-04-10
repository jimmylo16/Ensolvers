import { BaseModel } from 'src/common/models/base.model';
import { NoteModel } from './note.model';
import { UserModel } from 'src/modules/users/models/user.model';

export class CategoryModel extends BaseModel {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly user: UserModel;
  readonly notes: NoteModel[];
}
