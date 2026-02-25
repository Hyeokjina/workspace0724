import { Result } from '../../core/Result';
import { TodoResponseDto } from '../../application/dto/TodoResponseDto';

export interface IToggleTodoUseCase {
  execute(id: string): Promise<Result<TodoResponseDto>>;
}
