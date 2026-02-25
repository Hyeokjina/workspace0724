import { ICreateTodoUseCase } from '../../domain/usecases/ICreateTodoUseCase';
import { ITodoRepository } from '../../domain/repositories/ITodoRepository';
import { Todo } from '../../domain/entities/Todo';
import { CreateTodoRequestDto } from '../dto/CreateTodoRequestDto';
import { TodoResponseDto, toTodoResponseDto } from '../dto/TodoResponseDto';
import { Result, ok, fail } from '../../core/Result';
import { IdGenerator, defaultIdGenerator } from '../../core/utils/idGenerator';
import { createValidationError } from '../errors/AppErrors';

export class CreateTodoUseCase implements ICreateTodoUseCase {
  constructor(
    private readonly todoRepository: ITodoRepository,
    private readonly idGenerator: IdGenerator = defaultIdGenerator,
  ) {}

  async execute(request: CreateTodoRequestDto): Promise<Result<TodoResponseDto>> {
    const now = new Date();

    const createResult = Todo.create({
      id: this.idGenerator.generate(),
      title: request.title,
      description: request.description ?? '',
      completed: false,
      createdAt: now,
      updatedAt: now,
    });

    if (!createResult.isValid) {
      return fail(createValidationError(createResult.errors));
    }

    const savedTodo = await this.todoRepository.save(createResult.todo);

    return ok(toTodoResponseDto(savedTodo));
  }
}
