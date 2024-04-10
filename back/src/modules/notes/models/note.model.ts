import { BaseModel } from 'src/common/models/base.model';
import { UserModel } from 'src/modules/users/models/user.model';
import { CategoryModel } from './category.model';

export enum NoteStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}
export class NoteModel extends BaseModel {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly status?: NoteStatus;
  readonly user: UserModel;
  readonly categories: CategoryModel[];
}
