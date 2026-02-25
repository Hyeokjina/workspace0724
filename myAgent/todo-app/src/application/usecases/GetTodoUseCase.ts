import { IGetTodoUseCase } from '../../domain/usecases/IGetTodoUseCase';
import { ITodoRepository } from '../../domain/repositories/ITodoRepository';
import { TodoResponseDto, toTodoResponseDto } from '../dto/TodoResponseDto';
import { Result, ok, fail } from '../../core/Result';
import { createTodoNotFoundError } from '../errors/AppErrors';

export class GetTodoUseCase implements IGetTodoUseCase {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async execute(id: string): Promise<Result<TodoResponseDto>> {
    const todo = await this.todoRepository.findById(id);

    if (todo === null) {
      return fail(createTodoNotFoundError(id));
    }

    return ok(toTodoResponseDto(todo));
  }
}
