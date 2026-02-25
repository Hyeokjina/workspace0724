import { ToggleTodoUseCase } from '../../../../src/application/usecases/ToggleTodoUseCase';
import { ITodoRepository } from '../../../../src/domain/repositories/ITodoRepository';
import { createTodoFixture, createCompletedTodoFixture, TODO_ID_1, TODO_ID_NOT_FOUND } from '../../../fixtures/todoFixtures';

describe('ToggleTodoUseCase', () => {
  let mockRepository: jest.Mocked<ITodoRepository>;
  let useCase: ToggleTodoUseCase;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      deleteById: jest.fn(),
    };

    useCase = new ToggleTodoUseCase(mockRepository);
  });

  it('미완료 Todo를 토글하면 completed가 true가 된다', async () => {
    const uncompletedTodo = createTodoFixture({ completed: false });
    mockRepository.findById.mockResolvedValue(uncompletedTodo);
    mockRepository.update.mockImplementation(async (todo) => todo);

    const result = await useCase.execute(TODO_ID_1);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.completed).toBe(true);
    }
  });

  it('완료된 Todo를 토글하면 completed가 false가 된다', async () => {
    const completedTodo = createCompletedTodoFixture();
    mockRepository.findById.mockResolvedValue(completedTodo);
    mockRepository.update.mockImplementation(async (todo) => todo);

    const result = await useCase.execute(TODO_ID_1);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.completed).toBe(false);
    }
  });

  it('존재하지 않는 ID로 토글 시 TodoNotFoundError를 반환한다', async () => {
    mockRepository.findById.mockResolvedValue(null);

    const result = await useCase.execute(TODO_ID_NOT_FOUND);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.code).toBe('TODO_NOT_FOUND');
      expect(result.error.statusCode).toBe(404);
    }
    expect(mockRepository.update).not.toHaveBeenCalled();
  });

  it('토글 시 repository.update가 호출된다', async () => {
    const todo = createTodoFixture();
    mockRepository.findById.mockResolvedValue(todo);
    mockRepository.update.mockImplementation(async (t) => t);

    await useCase.execute(TODO_ID_1);

    expect(mockRepository.update).toHaveBeenCalledTimes(1);
  });

  it('토글 후 updatedAt이 갱신된다', async () => {
    const todo = createTodoFixture();
    mockRepository.findById.mockResolvedValue(todo);
    mockRepository.update.mockImplementation(async (t) => t);

    const result = await useCase.execute(TODO_ID_1);

    expect(result.success).toBe(true);
    if (result.success) {
      const updatedAt = new Date(result.value.updatedAt);
      expect(updatedAt.getTime()).toBeGreaterThanOrEqual(todo.updatedAt.getTime());
    }
  });
});
