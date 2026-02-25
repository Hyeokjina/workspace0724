import { IToggleTodoUseCase } from '../../domain/usecases/IToggleTodoUseCase';
import { ITodoRepository } from '../../domain/repositories/ITodoRepository';
import { TodoResponseDto, toTodoResponseDto } from '../dto/TodoResponseDto';
import { Result, ok, fail } from '../../core/Result';
import { createTodoNotFoundError } from '../errors/AppErrors';

export class ToggleTodoUseCase implements IToggleTodoUseCase {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async execute(id: string): Promise<Result<TodoResponseDto>> {
    const existingTodo = await this.todoRepository.findById(id);

    if (existingTodo === null) {
      return fail(createTodoNotFoundError(id));
    }

    const toggledTodo = existingTodo.toggleCompleted();
    const updatedTodo = await this.todoRepository.update(toggledTodo);

    return ok(toTodoResponseDto(updatedTodo));
  }
}
