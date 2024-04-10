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
import { NotesService } from '../services/notes.service';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { User } from 'src/modules/users/entities/user.entity';

@Controller('notes')
@ApiTags('Notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createPostDto: CreateNoteDto, @Req() req: Request) {
    const user = (req as any).user as User;
    const userId = user['id'];
    return this.notesService.create({ ...createPostDto, userId: userId });
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.notesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.notesService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdateNoteDto,
  ) {
    return this.notesService.update(id, updatePostDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.notesService.remove(id);
  }
}
