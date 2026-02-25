import { IDeleteTodoUseCase } from '../../domain/usecases/IDeleteTodoUseCase';
import { ITodoRepository } from '../../domain/repositories/ITodoRepository';
import { Result, ok, fail } from '../../core/Result';
import { createTodoNotFoundError } from '../errors/AppErrors';

export class DeleteTodoUseCase implements IDeleteTodoUseCase {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async execute(id: string): Promise<Result<void>> {
    const deleted = await this.todoRepository.deleteById(id);

    if (!deleted) {
      return fail(createTodoNotFoundError(id));
    }

    return ok(undefined);
  }
}
