import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createdCategory, expectedCategories, updatedResult } from './mocks';
import { CategoryService } from './category.service';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';

describe('Category Service', () => {
  let service: CategoryService;
  let repository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  it('should create a note', async () => {
    const createDto: CreateCategoryDto = {
      name: 'Test category',
      description: '',
      userId: '1',
    };

    jest.spyOn(repository, 'create').mockImplementation(() => createdCategory);
    jest
      .spyOn(repository, 'save')
      .mockImplementation(async () => createdCategory);

    const result = await service.create(createDto);

    expect(repository.save).toHaveBeenCalledWith(createdCategory);
    expect(result).toEqual(createdCategory);
  });

  it('should return all notes', async () => {
    const pagination = { limit: 10, offset: 0 };

    jest.spyOn(repository, 'find').mockResolvedValue(expectedCategories);

    const result = await service.findAll(pagination);

    expect(repository.find).toHaveBeenCalledWith({
      where: { deletedAt: null },
      take: pagination.limit,
      skip: pagination.offset,
      select: ['id', 'description', 'notes', 'name', 'user', 'createdAt'],
      relations: { notes: true },
    });
    expect(result).toEqual(expectedCategories);
  });

  it('should return a note by id', async () => {
    const noteId = '1';

    jest.spyOn(repository, 'findOne').mockResolvedValue(createdCategory);

    const result = await service.findOne(noteId);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: noteId, deletedAt: null },
      select: ['id', 'description', 'notes', 'name', 'user', 'createdAt'],
      relations: ['user', 'notes'],
    });
    expect(result).toEqual(createdCategory);
  });

  it('should update a note', async () => {
    const noteId = '1';
    const updateDto = { title: 'updated title', content: 'updated content' };

    jest.spyOn(service, 'findOne').mockResolvedValue(createdCategory);
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
