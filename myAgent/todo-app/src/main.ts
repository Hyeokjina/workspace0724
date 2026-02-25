import { createApp } from './presentation/server';
import { InMemoryTodoRepository } from './infrastructure/repositories/InMemoryTodoRepository';
import { CreateTodoUseCase } from './application/usecases/CreateTodoUseCase';
import { GetTodoUseCase } from './application/usecases/GetTodoUseCase';
import { GetAllTodosUseCase } from './application/usecases/GetAllTodosUseCase';
import { UpdateTodoUseCase } from './application/usecases/UpdateTodoUseCase';
import { DeleteTodoUseCase } from './application/usecases/DeleteTodoUseCase';
import { ToggleTodoUseCase } from './application/usecases/ToggleTodoUseCase';

const PORT = process.env.PORT ?? 3001;

/**
 * 의존성 조합 (Composition Root)
 *
 * 모든 의존성을 여기서 조립합니다.
 * 이 패턴을 통해 각 레이어는 인터페이스에만 의존하고,
 * 실제 구현체 결정은 진입점인 main.ts에서만 이루어집니다.
 */
function bootstrap(): void {
  // Infrastructure 레이어
  const todoRepository = new InMemoryTodoRepository();

  // Application 레이어 - UseCase 조합
  const createTodoUseCase = new CreateTodoUseCase(todoRepository);
  const getTodoUseCase = new GetTodoUseCase(todoRepository);
  const getAllTodosUseCase = new GetAllTodosUseCase(todoRepository);
  const updateTodoUseCase = new UpdateTodoUseCase(todoRepository);
  const deleteTodoUseCase = new DeleteTodoUseCase(todoRepository);
  const toggleTodoUseCase = new ToggleTodoUseCase(todoRepository);

  // Presentation 레이어
  const app = createApp({
    createTodoUseCase,
    getTodoUseCase,
    getAllTodosUseCase,
    updateTodoUseCase,
    deleteTodoUseCase,
    toggleTodoUseCase,
  });

  app.listen(PORT, () => {
    console.log(`Todo API 서버가 포트 ${PORT}에서 실행 중입니다.`);
    console.log(`API 기본 URL: http://localhost:${PORT}/api/todos`);
  });
}

bootstrap();
