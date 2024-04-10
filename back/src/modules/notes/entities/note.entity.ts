import { BaseEntity } from 'src/common/entities/base.entity';
import { NoteModel } from '../models/note.model';
import { User } from 'src/modules/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.notes)
  readonly user: User;
}
