import { IUpdateTodoUseCase } from '../../domain/usecases/IUpdateTodoUseCase';
import { ITodoRepository } from '../../domain/repositories/ITodoRepository';
import { UpdateTodoRequestDto } from '../dto/UpdateTodoRequestDto';
import { TodoResponseDto, toTodoResponseDto } from '../dto/TodoResponseDto';
import { Result, ok, fail } from '../../core/Result';
import { createTodoNotFoundError, createValidationError } from '../errors/AppErrors';

export class UpdateTodoUseCase implements IUpdateTodoUseCase {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async execute(id: string, request: UpdateTodoRequestDto): Promise<Result<TodoResponseDto>> {
    const existingTodo = await this.todoRepository.findById(id);

    if (existingTodo === null) {
      return fail(createTodoNotFoundError(id));
    }

    const updateResult = existingTodo.update({
      title: request.title,
      description: request.description,
    });

    if (!updateResult.isValid) {
      return fail(createValidationError(updateResult.errors));
    }

    const updatedTodo = await this.todoRepository.update(updateResult.todo);

    return ok(toTodoResponseDto(updatedTodo));
  }
}
