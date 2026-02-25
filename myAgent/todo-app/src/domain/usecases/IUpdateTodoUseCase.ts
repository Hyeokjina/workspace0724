import { Result } from '../../core/Result';
import { TodoResponseDto } from '../../application/dto/TodoResponseDto';
import { UpdateTodoRequestDto } from '../../application/dto/UpdateTodoRequestDto';

export interface IUpdateTodoUseCase {
  execute(id: string, request: UpdateTodoRequestDto): Promise<Result<TodoResponseDto>>;
}
