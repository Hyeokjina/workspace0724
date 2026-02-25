import { Result } from '../../core/Result';

export interface IDeleteTodoUseCase {
  execute(id: string): Promise<Result<void>>;
}
