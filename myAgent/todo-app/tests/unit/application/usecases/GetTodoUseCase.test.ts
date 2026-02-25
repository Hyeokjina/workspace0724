import { GetTodoUseCase } from '../../../../src/application/usecases/GetTodoUseCase';
import { ITodoRepository } from '../../../../src/domain/repositories/ITodoRepository';
import { createTodoFixture, TODO_ID_1, TODO_ID_NOT_FOUND } from '../../../fixtures/todoFixtures';

describe('GetTodoUseCase', () => {
  let mockRepository: jest.Mocked<ITodoRepository>;
  let useCase: GetTodoUseCase;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      deleteById: jest.fn(),
    };

    useCase = new GetTodoUseCase(mockRepository);
  });

  it('존재하는 ID로 조회 시 Todo를 반환한다', async () => {
    const todo = createTodoFixture({ id: TODO_ID_1 });
    mockRepository.findById.mockResolvedValue(todo);

    const result = await useCase.execute(TODO_ID_1);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.id).toBe(TODO_ID_1);
      expect(result.value.title).toBe(todo.title);
    }
    expect(mockRepository.findById).toHaveBeenCalledWith(TODO_ID_1);
  });

  it('존재하지 않는 ID로 조회 시 TodoNotFoundError를 반환한다', async () => {
    mockRepository.findById.mockResolvedValue(null);

    const result = await useCase.execute(TODO_ID_NOT_FOUND);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.code).toBe('TODO_NOT_FOUND');
      expect(result.error.statusCode).toBe(404);
    }
  });

  it('응답 DTO는 ISO 8601 날짜 형식을 포함한다', async () => {
    const todo = createTodoFixture();
    mockRepository.findById.mockResolvedValue(todo);

    const result = await useCase.execute(TODO_ID_1);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(typeof result.value.createdAt).toBe('string');
      expect(new Date(result.value.createdAt).toISOString()).toBe(result.value.createdAt);
    }
  });
});
