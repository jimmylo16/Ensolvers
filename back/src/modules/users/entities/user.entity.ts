import { BaseEntity } from 'src/common/entities/base.entity';
import { UserModel } from '../models/user.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Note } from 'src/modules/notes/entities/note.entity';

@Entity('users')
export class User extends BaseEntity implements UserModel {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column('text')
  @ApiProperty()
  fullName: string;

  @Column('text', {
    unique: true,
  })
  @ApiProperty()
  email: string;

  @Column('text', {
    select: false,
  })
  @ApiProperty()
  password: string;

  @OneToMany(() => Note, (note) => note.user)
  @ApiProperty({ type: () => Note })
  notes: Note[];
}
