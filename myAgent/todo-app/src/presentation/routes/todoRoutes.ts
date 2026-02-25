import { Router } from 'express';
import { TodoController } from '../controllers/TodoController';
import { validateCreateTodoRequest, validateUpdateTodoRequest } from '../middleware/requestValidator';

/**
 * Todo 라우터 팩토리 함수
 * 컨트롤러를 주입받아 라우트를 구성합니다.
 */
export function createTodoRouter(controller: TodoController): Router {
  const router = Router();

  // POST /api/todos - Todo 생성
  router.post('/', validateCreateTodoRequest, controller.createTodo);

  // GET /api/todos - 전체 목록 조회 (completed 필터 지원)
  router.get('/', controller.getAllTodos);

  // GET /api/todos/:id - 단건 조회
  router.get('/:id', controller.getTodo);

  // PATCH /api/todos/:id/toggle - 완료 상태 토글 (순서 중요: /:id보다 먼저 등록)
  router.patch('/:id/toggle', controller.toggleTodo);

  // PATCH /api/todos/:id - 부분 업데이트
  router.patch('/:id', validateUpdateTodoRequest, controller.updateTodo);

  // DELETE /api/todos/:id - 삭제
  router.delete('/:id', controller.deleteTodo);

  return router;
}
