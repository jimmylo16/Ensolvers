import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseModel } from '../models/base.model';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity as TypeOrmBaseEntity } from 'typeorm';
export class BaseEntity extends TypeOrmBaseEntity implements BaseModel {
  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @Column({ type: 'date', default: null, nullable: true })
  @ApiProperty()
  deletedAt?: Date;
}
