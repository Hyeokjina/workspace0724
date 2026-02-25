import { ITodoRepository } from '../../domain/repositories/ITodoRepository';
import { Todo } from '../../domain/entities/Todo';

/**
 * In-Memory Todo 저장소 구현체
 *
 * 배열 기반의 메모리 저장소입니다.
 * 서버 재시작 시 데이터가 초기화됩니다.
 * 실제 환경에서는 DatabaseTodoRepository 등으로 교체할 수 있습니다.
 */
export class InMemoryTodoRepository implements ITodoRepository {
  private readonly store: Map<string, Todo> = new Map();

  async save(todo: Todo): Promise<Todo> {
    this.store.set(todo.id, todo);
    return todo;
  }

  async findById(id: string): Promise<Todo | null> {
    return this.store.get(id) ?? null;
  }

  async findAll(filter?: { completed?: boolean }): Promise<Todo[]> {
    const todos = Array.from(this.store.values());

    // completed 필터가 없으면 전체 반환
    if (filter?.completed === undefined) {
      return todos;
    }

    return todos.filter((todo) => todo.completed === filter.completed);
  }

  async update(todo: Todo): Promise<Todo> {
    // 존재하지 않는 ID에 대한 업데이트 시도는 UseCase 레이어에서 사전 검증됩니다.
    this.store.set(todo.id, todo);
    return todo;
  }

  async deleteById(id: string): Promise<boolean> {
    return this.store.delete(id);
  }

  /**
   * 테스트 용도: 저장소를 초기화합니다.
   */
  clear(): void {
    this.store.clear();
  }

  /**
   * 테스트 용도: 현재 저장된 항목 수를 반환합니다.
   */
  size(): number {
    return this.store.size;
  }
}
