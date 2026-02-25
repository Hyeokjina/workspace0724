import { CreateTodoUseCase } from '../../../../src/application/usecases/CreateTodoUseCase';
import { ITodoRepository } from '../../../../src/domain/repositories/ITodoRepository';
import { Todo } from '../../../../src/domain/entities/Todo';
import { createTodoFixture } from '../../../fixtures/todoFixtures';
import { IdGenerator } from '../../../../src/core/utils/idGenerator';

describe('CreateTodoUseCase', () => {
  let mockRepository: jest.Mocked<ITodoRepository>;
  let mockIdGenerator: jest.Mocked<IdGenerator>;
  let useCase: CreateTodoUseCase;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      deleteById: jest.fn(),
    };

    mockIdGenerator = {
      generate: jest.fn().mockReturnValue('test-uuid-1234'),
    };

    useCase = new CreateTodoUseCase(mockRepository, mockIdGenerator);
  });

  it('유효한 요청으로 Todo를 생성한다', async () => {
    const savedTodo = createTodoFixture({ title: '새 할일', description: '설명' });
    mockRepository.save.mockResolvedValue(savedTodo);

    const result = await useCase.execute({ title: '새 할일', description: '설명' });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.title).toBe('새 할일');
      expect(result.value.description).toBe('설명');
      expect(result.value.completed).toBe(false);
    }
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });

  it('description 없이 Todo를 생성한다 (선택사항)', async () => {
    const savedTodo = createTodoFixture({ title: '제목만', description: '' });
    mockRepository.save.mockResolvedValue(savedTodo);

    const result = await useCase.execute({ title: '제목만' });

    expect(result.success).toBe(true);
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });

  it('빈 title로 생성 시 ValidationError를 반환한다', async () => {
    const result = await useCase.execute({ title: '' });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.code).toBe('VALIDATION_ERROR');
      expect(result.error.statusCode).toBe(400);
    }
    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  it('공백만 있는 title로 생성 시 ValidationError를 반환한다', async () => {
    const result = await useCase.execute({ title: '   ' });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.code).toBe('VALIDATION_ERROR');
    }
  });

  it('생성된 Todo의 ID는 idGenerator에서 제공한 값을 사용한다', async () => {
    let capturedTodo: Todo | undefined;
    mockRepository.save.mockImplementation(async (todo: Todo) => {
      capturedTodo = todo;
      return todo;
    });

    await useCase.execute({ title: '제목' });

    expect(capturedTodo?.id).toBe('test-uuid-1234');
    expect(mockIdGenerator.generate).toHaveBeenCalledTimes(1);
  });

  it('생성된 Todo는 초기 completed 상태가 false이다', async () => {
    let capturedTodo: Todo | undefined;
    mockRepository.save.mockImplementation(async (todo: Todo) => {
      capturedTodo = todo;
      return todo;
    });

    await useCase.execute({ title: '제목' });

    expect(capturedTodo?.completed).toBe(false);
  });
});
