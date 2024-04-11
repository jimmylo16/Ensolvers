import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @ApiProperty({ example: 'Category title' })
  readonly name: string;

  @IsString()
  @ApiProperty({ example: 'Category description' })
  readonly description: string;

  @IsString()
  @IsOptional()
  readonly userId: string;
}
