import { Result } from '../../core/Result';
import { TodoResponseDto } from '../../application/dto/TodoResponseDto';

export interface GetAllTodosFilter {
  completed?: boolean;
}

export interface IGetAllTodosUseCase {
  execute(filter?: GetAllTodosFilter): Promise<Result<TodoResponseDto[]>>;
}
