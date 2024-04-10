import { BaseEntity } from 'src/common/entities/base.entity';
import { NoteModel, NoteStatus } from '../models/note.model';
import { User } from 'src/modules/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity('notes')
export class Note extends BaseEntity implements NoteModel {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ApiProperty()
  @Column('text')
  readonly title: string;

  @ApiProperty()
  @Column('text')
  readonly content: string;

  @ApiProperty({ example: 'Active' })
  @Column({
    type: 'enum',
    enum: NoteStatus,
    default: NoteStatus.ACTIVE,
  })
  readonly status?: NoteStatus;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.notes)
  readonly user: User;

  @ApiProperty({ type: () => Category })
  @ManyToMany(() => Category)
  @JoinTable()
  readonly categories: Category[];
}
