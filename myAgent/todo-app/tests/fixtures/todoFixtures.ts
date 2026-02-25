import { Todo } from '../../src/domain/entities/Todo';
import { TodoResponseDto } from '../../src/application/dto/TodoResponseDto';

/**
 * 테스트용 고정 날짜
 */
export const FIXED_DATE = new Date('2024-01-15T09:00:00.000Z');
export const FIXED_UPDATED_DATE = new Date('2024-01-15T10:00:00.000Z');

/**
 * 테스트용 UUID
 */
export const TODO_ID_1 = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
export const TODO_ID_2 = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
export const TODO_ID_NOT_FOUND = 'ffffffff-ffff-4fff-8fff-ffffffffffff';

/**
 * 기본 Todo 생성 헬퍼
 */
export function createTodoFixture(overrides: Partial<{
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}> = {}): Todo {
  const props = {
    id: overrides.id ?? TODO_ID_1,
    title: overrides.title ?? '테스트 할일',
    description: overrides.description ?? '테스트 설명',
    completed: overrides.completed ?? false,
    createdAt: overrides.createdAt ?? FIXED_DATE,
    updatedAt: overrides.updatedAt ?? FIXED_DATE,
  };

  const result = Todo.create(props);

  if (!result.isValid) {
    throw new Error(`Fixture 생성 실패: ${result.errors.join(', ')}`);
  }

  return result.todo;
}

/**
 * 완료된 Todo 픽스처
 */
export function createCompletedTodoFixture(): Todo {
  return createTodoFixture({
    id: TODO_ID_2,
    title: '완료된 할일',
    description: '완료된 설명',
    completed: true,
  });
}

/**
 * TodoResponseDto 픽스처
 */
export function createTodoResponseDtoFixture(overrides: Partial<TodoResponseDto> = {}): TodoResponseDto {
  return {
    id: overrides.id ?? TODO_ID_1,
    title: overrides.title ?? '테스트 할일',
    description: overrides.description ?? '테스트 설명',
    completed: overrides.completed ?? false,
    createdAt: overrides.createdAt ?? FIXED_DATE.toISOString(),
    updatedAt: overrides.updatedAt ?? FIXED_DATE.toISOString(),
  };
}
