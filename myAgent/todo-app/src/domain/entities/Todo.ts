/**
 * Todo 도메인 엔티티
 *
 * 도메인 규칙:
 * - title은 1자 이상 200자 이하
 * - description은 0자 이상 1000자 이하
 * - 외부 의존성 없음 (순수 도메인 모델)
 */

export interface TodoProps {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export const TITLE_MIN_LENGTH = 1;
export const TITLE_MAX_LENGTH = 200;
export const DESCRIPTION_MAX_LENGTH = 1000;

export class Todo {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  private constructor(props: TodoProps) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.completed = props.completed;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  /**
   * Todo 엔티티를 생성합니다.
   * 유효성 검사를 통과한 경우에만 인스턴스를 반환합니다.
   */
  static create(props: TodoProps): { isValid: true; todo: Todo } | { isValid: false; errors: string[] } {
    const errors = Todo.validate(props.title, props.description);

    if (errors.length > 0) {
      return { isValid: false, errors };
    }

    return { isValid: true, todo: new Todo(props) };
  }

  /**
   * 기존 Todo를 부분 업데이트하여 새 인스턴스를 반환합니다.
   * 불변성을 유지합니다.
   */
  update(params: { title?: string; description?: string }): { isValid: true; todo: Todo } | { isValid: false; errors: string[] } {
    const newTitle = params.title !== undefined ? params.title : this.title;
    const newDescription = params.description !== undefined ? params.description : this.description;

    const errors = Todo.validate(newTitle, newDescription);

    if (errors.length > 0) {
      return { isValid: false, errors };
    }

    return {
      isValid: true,
      todo: new Todo({
        ...this,
        title: newTitle,
        description: newDescription,
        updatedAt: new Date(),
      }),
    };
  }

  /**
   * 완료 상태를 토글하여 새 인스턴스를 반환합니다.
   */
  toggleCompleted(): Todo {
    return new Todo({
      ...this,
      completed: !this.completed,
      updatedAt: new Date(),
    });
  }

  /**
   * title과 description의 도메인 규칙을 검사합니다.
   */
  private static validate(title: string, description: string): string[] {
    const errors: string[] = [];

    if (title.trim().length < TITLE_MIN_LENGTH) {
      errors.push(`title은 최소 ${TITLE_MIN_LENGTH}자 이상이어야 합니다.`);
    }

    if (title.length > TITLE_MAX_LENGTH) {
      errors.push(`title은 최대 ${TITLE_MAX_LENGTH}자 이하이어야 합니다.`);
    }

    if (description.length > DESCRIPTION_MAX_LENGTH) {
      errors.push(`description은 최대 ${DESCRIPTION_MAX_LENGTH}자 이하이어야 합니다.`);
    }

    return errors;
  }

  /**
   * 직렬화를 위한 순수 객체 변환
   */
  toObject(): TodoProps {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      completed: this.completed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
