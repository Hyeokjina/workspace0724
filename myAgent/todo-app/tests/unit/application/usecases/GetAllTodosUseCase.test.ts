import { GetAllTodosUseCase } from '../../../../src/application/usecases/GetAllTodosUseCase';
import { ITodoRepository } from '../../../../src/domain/repositories/ITodoRepository';
import { createTodoFixture, createCompletedTodoFixture } from '../../../fixtures/todoFixtures';

describe('GetAllTodosUseCase', () => {
  let mockRepository: jest.Mocked<ITodoRepository>;
  let useCase: GetAllTodosUseCase;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      deleteById: jest.fn(),
    };

    useCase = new GetAllTodosUseCase(mockRepository);
  });

  it('필터 없이 전체 목록을 반환한다', async () => {
    const todos = [createTodoFixture(), createCompletedTodoFixture()];
    mockRepository.findAll.mockResolvedValue(todos);

    const result = await useCase.execute();

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toHaveLength(2);
    }
    expect(mockRepository.findAll).toHaveBeenCalledWith(undefined);
  });

  it('completed=true 필터로 완료된 항목만 반환한다', async () => {
    const completedTodo = createCompletedTodoFixture();
    mockRepository.findAll.mockResolvedValue([completedTodo]);

    const result = await useCase.execute({ completed: true });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toHaveLength(1);
      expect(result.value[0].completed).toBe(true);
    }
    expect(mockRepository.findAll).toHaveBeenCalledWith({ completed: true });
  });

  it('completed=false 필터로 미완료 항목만 반환한다', async () => {
    const uncompletedTodo = createTodoFixture();
    mockRepository.findAll.mockResolvedValue([uncompletedTodo]);

    const result = await useCase.execute({ completed: false });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toHaveLength(1);
      expect(result.value[0].completed).toBe(false);
    }
    expect(mockRepository.findAll).toHaveBeenCalledWith({ completed: false });
  });

  it('빈 목록을 반환할 때 빈 배열로 성공 응답한다', async () => {
    mockRepository.findAll.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toHaveLength(0);
      expect(Array.isArray(result.value)).toBe(true);
    }
  });
});
