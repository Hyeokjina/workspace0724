import { DeleteTodoUseCase } from '../../../../src/application/usecases/DeleteTodoUseCase';
import { ITodoRepository } from '../../../../src/domain/repositories/ITodoRepository';
import { TODO_ID_1, TODO_ID_NOT_FOUND } from '../../../fixtures/todoFixtures';

describe('DeleteTodoUseCase', () => {
  let mockRepository: jest.Mocked<ITodoRepository>;
  let useCase: DeleteTodoUseCase;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      deleteById: jest.fn(),
    };

    useCase = new DeleteTodoUseCase(mockRepository);
  });

  it('존재하는 Todo를 삭제하면 성공한다', async () => {
    mockRepository.deleteById.mockResolvedValue(true);

    const result = await useCase.execute(TODO_ID_1);

    expect(result.success).toBe(true);
    expect(mockRepository.deleteById).toHaveBeenCalledWith(TODO_ID_1);
  });

  it('존재하지 않는 ID로 삭제 시 TodoNotFoundError를 반환한다', async () => {
    mockRepository.deleteById.mockResolvedValue(false);

    const result = await useCase.execute(TODO_ID_NOT_FOUND);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.code).toBe('TODO_NOT_FOUND');
      expect(result.error.statusCode).toBe(404);
    }
  });

  it('삭제 성공 시 반환값은 void (undefined)이다', async () => {
    mockRepository.deleteById.mockResolvedValue(true);

    const result = await useCase.execute(TODO_ID_1);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toBeUndefined();
    }
  });
});
