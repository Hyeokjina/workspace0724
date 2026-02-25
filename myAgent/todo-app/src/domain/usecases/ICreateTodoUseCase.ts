import { Result } from '../../core/Result';
import { TodoResponseDto } from '../../application/dto/TodoResponseDto';
import { CreateTodoRequestDto } from '../../application/dto/CreateTodoRequestDto';

export interface ICreateTodoUseCase {
  execute(request: CreateTodoRequestDto): Promise<Result<TodoResponseDto>>;
}
