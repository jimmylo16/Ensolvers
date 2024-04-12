import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createdNote, expectedNotes, updatedResult } from './mocks';
import { NotesService } from './notes.service';
import { Note } from '../entities/note.entity';
import { CreateNoteDto } from '../dto/create-note.dto';

describe('Notes Service', () => {
  let service: NotesService;
  let repository: Repository<Note>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: getRepositoryToken(Note),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
    repository = module.get<Repository<Note>>(getRepositoryToken(Note));
  });

  it('should create a note', async () => {
    const createDto: CreateNoteDto = {
      title: 'test title',
      content: 'test content',
      userId: '1',
      category: ['test'],
    };

    jest.spyOn(repository, 'create').mockImplementation(() => createdNote);
    jest.spyOn(repository, 'save').mockImplementation(async () => createdNote);

    const result = await service.create(createDto);

    expect(repository.save).toHaveBeenCalledWith(createdNote);
    expect(result).toEqual(createdNote);
  });

  it('should return all notes', async () => {
    const pagination = { limit: 10, offset: 0 };

    jest.spyOn(repository, 'find').mockResolvedValue(expectedNotes);

    const result = await service.findAll(pagination);

    expect(repository.find).toHaveBeenCalledWith({
      where: { deletedAt: null },
      take: pagination.limit,
      skip: pagination.offset,
      relations: ['user', 'categories'],
    });
    expect(result).toEqual(expectedNotes);
  });

  it('should return a note by id', async () => {
    const noteId = '1';

    jest.spyOn(repository, 'findOne').mockResolvedValue(createdNote);

    const result = await service.findOne(noteId);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: noteId, deletedAt: null },
      select: ['id', 'content', 'categories', 'title', 'user', 'createdAt'],
      relations: ['user', 'categories'],
    });
    expect(result).toEqual(createdNote);
  });

  it('should update a note', async () => {
    const noteId = '1';
    const updateDto = { title: 'updated title', content: 'updated content' };

    jest.spyOn(service, 'findOne').mockResolvedValue(createdNote);
    jest.spyOn(repository, 'update').mockResolvedValue(updatedResult);

    const result = await service.update(noteId, updateDto);

    expect(result).toEqual(updatedResult);
  });

  it('should delete a note', async () => {
    const noteId = '1';

    jest.spyOn(service, 'update').mockResolvedValue(updatedResult);

    const result = await service.remove(noteId);

    expect(result).toEqual(updatedResult);
  });
});
