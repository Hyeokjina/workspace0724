import { UpdateTodoUseCase } from '../../../../src/application/usecases/UpdateTodoUseCase';
import { ITodoRepository } from '../../../../src/domain/repositories/ITodoRepository';
import { createTodoFixture, TODO_ID_1, TODO_ID_NOT_FOUND } from '../../../fixtures/todoFixtures';

describe('UpdateTodoUseCase', () => {
  let mockRepository: jest.Mocked<ITodoRepository>;
  let useCase: UpdateTodoUseCase;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      deleteById: jest.fn(),
    };

    useCase = new UpdateTodoUseCase(mockRepository);
  });

  it('title을 부분 업데이트한다', async () => {
    const originalTodo = createTodoFixture({ title: '원래 제목' });
    mockRepository.findById.mockResolvedValue(originalTodo);
    mockRepository.update.mockImplementation(async (todo) => todo);

    const result = await useCase.execute(TODO_ID_1, { title: '변경된 제목' });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.title).toBe('변경된 제목');
    }
    expect(mockRepository.update).toHaveBeenCalledTimes(1);
  });

  it('description을 부분 업데이트한다', async () => {
    const originalTodo = createTodoFixture({ description: '원래 설명' });
    mockRepository.findById.mockResolvedValue(originalTodo);
    mockRepository.update.mockImplementation(async (todo) => todo);

    const result = await useCase.execute(TODO_ID_1, { description: '변경된 설명' });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.description).toBe('변경된 설명');
    }
  });

  it('존재하지 않는 ID로 업데이트 시 TodoNotFoundError를 반환한다', async () => {
    mockRepository.findById.mockResolvedValue(null);

    const result = await useCase.execute(TODO_ID_NOT_FOUND, { title: '새 제목' });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.code).toBe('TODO_NOT_FOUND');
      expect(result.error.statusCode).toBe(404);
    }
    expect(mockRepository.update).not.toHaveBeenCalled();
  });

  it('빈 title로 업데이트 시 ValidationError를 반환한다', async () => {
    const originalTodo = createTodoFixture();
    mockRepository.findById.mockResolvedValue(originalTodo);

    const result = await useCase.execute(TODO_ID_1, { title: '' });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.code).toBe('VALIDATION_ERROR');
      expect(result.error.statusCode).toBe(400);
    }
    expect(mockRepository.update).not.toHaveBeenCalled();
  });

  it('업데이트된 Todo의 updatedAt이 갱신된다', async () => {
    const originalTodo = createTodoFixture();
    mockRepository.findById.mockResolvedValue(originalTodo);
    mockRepository.update.mockImplementation(async (todo) => todo);

    const result = await useCase.execute(TODO_ID_1, { title: '새 제목' });

    expect(result.success).toBe(true);
    if (result.success) {
      const updatedAt = new Date(result.value.updatedAt);
      expect(updatedAt.getTime()).toBeGreaterThanOrEqual(originalTodo.updatedAt.getTime());
    }
  });
});
