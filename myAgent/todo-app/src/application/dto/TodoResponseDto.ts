import { Todo } from '../../domain/entities/Todo';

/**
 * Todo 응답 DTO
 * 도메인 엔티티를 API 응답 형태로 변환합니다.
 */
export interface TodoResponseDto {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;
  readonly createdAt: string; // ISO 8601 형식
  readonly updatedAt: string; // ISO 8601 형식
}

/**
 * Todo 엔티티를 응답 DTO로 변환합니다.
 */
export function toTodoResponseDto(todo: Todo): TodoResponseDto {
  return {
    id: todo.id,
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
    createdAt: todo.createdAt.toISOString(),
    updatedAt: todo.updatedAt.toISOString(),
  };
}
