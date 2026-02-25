import { Todo, TITLE_MAX_LENGTH, DESCRIPTION_MAX_LENGTH } from '../../../../src/domain/entities/Todo';
import { createTodoFixture, FIXED_DATE, TODO_ID_1 } from '../../../fixtures/todoFixtures';

describe('Todo 엔티티', () => {
  describe('Todo.create()', () => {
    it('유효한 props로 Todo를 생성한다', () => {
      const result = Todo.create({
        id: TODO_ID_1,
        title: '할일 제목',
        description: '할일 설명',
        completed: false,
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
      });

      expect(result.isValid).toBe(true);
      if (result.isValid) {
        expect(result.todo.id).toBe(TODO_ID_1);
        expect(result.todo.title).toBe('할일 제목');
        expect(result.todo.description).toBe('할일 설명');
        expect(result.todo.completed).toBe(false);
      }
    });

    it('description이 빈 문자열이어도 생성에 성공한다', () => {
      const result = Todo.create({
        id: TODO_ID_1,
        title: '할일 제목',
        description: '',
        completed: false,
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
      });

      expect(result.isValid).toBe(true);
    });

    it('title이 빈 문자열이면 생성에 실패한다', () => {
      const result = Todo.create({
        id: TODO_ID_1,
        title: '',
        description: '설명',
        completed: false,
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
      });

      expect(result.isValid).toBe(false);
      if (!result.isValid) {
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });

    it('title이 공백만 있으면 생성에 실패한다', () => {
      const result = Todo.create({
        id: TODO_ID_1,
        title: '   ',
        description: '설명',
        completed: false,
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
      });

      expect(result.isValid).toBe(false);
    });

    it(`title이 ${TITLE_MAX_LENGTH}자를 초과하면 생성에 실패한다`, () => {
      const longTitle = 'a'.repeat(TITLE_MAX_LENGTH + 1);

      const result = Todo.create({
        id: TODO_ID_1,
        title: longTitle,
        description: '',
        completed: false,
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
      });

      expect(result.isValid).toBe(false);
    });

    it(`title이 정확히 ${TITLE_MAX_LENGTH}자이면 생성에 성공한다`, () => {
      const maxTitle = 'a'.repeat(TITLE_MAX_LENGTH);

      const result = Todo.create({
        id: TODO_ID_1,
        title: maxTitle,
        description: '',
        completed: false,
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
      });

      expect(result.isValid).toBe(true);
    });

    it(`description이 ${DESCRIPTION_MAX_LENGTH}자를 초과하면 생성에 실패한다`, () => {
      const longDescription = 'a'.repeat(DESCRIPTION_MAX_LENGTH + 1);

      const result = Todo.create({
        id: TODO_ID_1,
        title: '제목',
        description: longDescription,
        completed: false,
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
      });

      expect(result.isValid).toBe(false);
    });
  });

  describe('todo.update()', () => {
    it('title을 변경한다', () => {
      const todo = createTodoFixture();
      const result = todo.update({ title: '새로운 제목' });

      expect(result.isValid).toBe(true);
      if (result.isValid) {
        expect(result.todo.title).toBe('새로운 제목');
        expect(result.todo.description).toBe(todo.description); // 변경되지 않음
      }
    });

    it('description을 변경한다', () => {
      const todo = createTodoFixture();
      const result = todo.update({ description: '새로운 설명' });

      expect(result.isValid).toBe(true);
      if (result.isValid) {
        expect(result.todo.description).toBe('새로운 설명');
        expect(result.todo.title).toBe(todo.title); // 변경되지 않음
      }
    });

    it('업데이트 시 updatedAt이 갱신된다', () => {
      const todo = createTodoFixture();
      const result = todo.update({ title: '새 제목' });

      expect(result.isValid).toBe(true);
      if (result.isValid) {
        expect(result.todo.updatedAt.getTime()).toBeGreaterThanOrEqual(todo.updatedAt.getTime());
      }
    });

    it('원본 엔티티는 변경되지 않는다 (불변성)', () => {
      const todo = createTodoFixture();
      const originalTitle = todo.title;

      todo.update({ title: '새로운 제목' });

      expect(todo.title).toBe(originalTitle);
    });

    it('빈 title로 업데이트하면 실패한다', () => {
      const todo = createTodoFixture();
      const result = todo.update({ title: '' });

      expect(result.isValid).toBe(false);
    });
  });

  describe('todo.toggleCompleted()', () => {
    it('false에서 true로 토글된다', () => {
      const todo = createTodoFixture({ completed: false });
      const toggled = todo.toggleCompleted();

      expect(toggled.completed).toBe(true);
    });

    it('true에서 false로 토글된다', () => {
      const todo = createTodoFixture({ completed: true });
      const toggled = todo.toggleCompleted();

      expect(toggled.completed).toBe(false);
    });

    it('토글 후 updatedAt이 갱신된다', () => {
      const todo = createTodoFixture();
      const toggled = todo.toggleCompleted();

      expect(toggled.updatedAt.getTime()).toBeGreaterThanOrEqual(todo.updatedAt.getTime());
    });

    it('원본 엔티티의 completed는 변경되지 않는다 (불변성)', () => {
      const todo = createTodoFixture({ completed: false });
      todo.toggleCompleted();

      expect(todo.completed).toBe(false);
    });
  });

  describe('todo.toObject()', () => {
    it('순수 객체로 변환된다', () => {
      const todo = createTodoFixture();
      const obj = todo.toObject();

      expect(obj.id).toBe(todo.id);
      expect(obj.title).toBe(todo.title);
      expect(obj.description).toBe(todo.description);
      expect(obj.completed).toBe(todo.completed);
      expect(obj.createdAt).toEqual(todo.createdAt);
      expect(obj.updatedAt).toEqual(todo.updatedAt);
    });
  });
});
