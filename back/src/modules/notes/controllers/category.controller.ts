import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseUUIDPipe,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoriesService: CategoryService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDto: CreateCategoryDto, @Req() req: Request) {
    const user = (req as any).user as User;
    const userId = user['id'];
    return this.categoriesService.create({ ...createDto, userId: userId });
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.categoriesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.remove(id);
  }
}
