import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryModel } from '../models/category.model';
import { Note } from './note.entity';

@Entity('category')
export class Category extends BaseEntity implements CategoryModel {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ApiProperty()
  @Column('text')
  readonly description: string;

  @ApiProperty()
  @Column('text')
  readonly content: string;
  name: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.notes)
  readonly user: User;

  @ApiProperty({ type: () => Note })
  @ManyToOne(() => Note, (note) => note.categories)
  notes: Note[];
}
