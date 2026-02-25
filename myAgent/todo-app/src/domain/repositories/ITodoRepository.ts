import { Todo } from '../entities/Todo';

/**
 * Todo 저장소 인터페이스
 *
 * 도메인 레이어에서 정의하고 인프라 레이어에서 구현합니다.
 * 이를 통해 도메인 로직이 특정 저장소 구현에 의존하지 않습니다.
 */
export interface ITodoRepository {
  /**
   * 새 Todo를 저장합니다.
   */
  save(todo: Todo): Promise<Todo>;

  /**
   * ID로 Todo를 조회합니다. 없으면 null을 반환합니다.
   */
  findById(id: string): Promise<Todo | null>;

  /**
   * 전체 Todo 목록을 조회합니다.
   * completed 파라미터가 제공되면 해당 상태로 필터링합니다.
   */
  findAll(filter?: { completed?: boolean }): Promise<Todo[]>;

  /**
   * 기존 Todo를 업데이트합니다.
   */
  update(todo: Todo): Promise<Todo>;

  /**
   * ID로 Todo를 삭제합니다. 삭제 성공 여부를 반환합니다.
   */
  deleteById(id: string): Promise<boolean>;
}
