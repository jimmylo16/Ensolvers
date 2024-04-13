import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
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

  it('should create a category', async () => {
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

  it('should return all categorys', async () => {
    const pagination = { limit: 10, offset: 0 };

    jest.spyOn(repository, 'find').mockResolvedValue(expectedCategories);

    const result = await service.findAll(pagination, '1');

    expect(repository.find).toHaveBeenCalledWith({
      where: { deletedAt: IsNull(), user: { id: '1' } },
      take: pagination.limit,
      skip: pagination.offset,
      select: ['id', 'description', 'categorys', 'name', 'user', 'createdAt'],
      relations: { categorys: true },
    });
    expect(result).toEqual(expectedCategories);
  });

  it('should return a category by id', async () => {
    const categoryId = '1';

    jest.spyOn(repository, 'findOne').mockResolvedValue(createdCategory);

    const result = await service.findOne(categoryId);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: categoryId, deletedAt: IsNull() },
      select: ['id', 'description', 'categorys', 'name', 'user', 'createdAt'],
      relations: ['user', 'categorys'],
    });
    expect(result).toEqual(createdCategory);
  });

  it('should update a category', async () => {
    const categoryId = '1';
    const updateDto = { title: 'updated title', content: 'updated content' };

    jest.spyOn(service, 'findOne').mockResolvedValue(createdCategory);
    jest.spyOn(repository, 'update').mockResolvedValue(updatedResult);

    const result = await service.update(categoryId, updateDto);

    expect(result).toEqual(updatedResult);
  });

  it('should delete a category', async () => {
    const categoryId = '1';

    jest.spyOn(service, 'update').mockResolvedValue(updatedResult);

    const result = await service.remove(categoryId);

    expect(result).toEqual(updatedResult);
  });
});
