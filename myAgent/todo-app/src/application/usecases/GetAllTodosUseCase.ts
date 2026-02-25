import { IGetAllTodosUseCase, GetAllTodosFilter } from '../../domain/usecases/IGetAllTodosUseCase';
import { ITodoRepository } from '../../domain/repositories/ITodoRepository';
import { TodoResponseDto, toTodoResponseDto } from '../dto/TodoResponseDto';
import { Result, ok } from '../../core/Result';

export class GetAllTodosUseCase implements IGetAllTodosUseCase {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async execute(filter?: GetAllTodosFilter): Promise<Result<TodoResponseDto[]>> {
    const todos = await this.todoRepository.findAll(filter);

    return ok(todos.map(toTodoResponseDto));
  }
}
