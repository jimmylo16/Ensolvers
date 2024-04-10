import { BaseEntity } from 'src/common/entities/base.entity';
import { UserModel } from '../models/user.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Note } from 'src/modules/notes/entities/note.entities';

@Entity('users')
export class User extends BaseEntity implements UserModel {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  readonly id: string;

  @Column('text')
  @ApiProperty()
  readonly fullName: string;

  @Column('int')
  @ApiProperty()
  readonly age: number;

  @Column('text', {
    unique: true,
  })
  @ApiProperty()
  readonly email: string;

  @Column('text', {
    select: false,
  })
  @ApiProperty()
  password: string;

  @Column('text', { nullable: true })
  readonly refreshToken?: string;

  @OneToMany(() => Note, (note) => note.user)
  @ApiProperty({ type: () => Note })
  readonly notes: Note[];
}
