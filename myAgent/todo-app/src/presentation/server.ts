import express, { Application } from 'express';
import { TodoController } from './controllers/TodoController';
import { createTodoRouter } from './routes/todoRoutes';
import { loggerMiddleware } from './middleware/logger';
import { globalErrorHandler, notFoundHandler } from './middleware/errorHandler';
import { ICreateTodoUseCase } from '../domain/usecases/ICreateTodoUseCase';
import { IGetTodoUseCase } from '../domain/usecases/IGetTodoUseCase';
import { IGetAllTodosUseCase } from '../domain/usecases/IGetAllTodosUseCase';
import { IUpdateTodoUseCase } from '../domain/usecases/IUpdateTodoUseCase';
import { IDeleteTodoUseCase } from '../domain/usecases/IDeleteTodoUseCase';
import { IToggleTodoUseCase } from '../domain/usecases/IToggleTodoUseCase';

export interface ServerDependencies {
  readonly createTodoUseCase: ICreateTodoUseCase;
  readonly getTodoUseCase: IGetTodoUseCase;
  readonly getAllTodosUseCase: IGetAllTodosUseCase;
  readonly updateTodoUseCase: IUpdateTodoUseCase;
  readonly deleteTodoUseCase: IDeleteTodoUseCase;
  readonly toggleTodoUseCase: IToggleTodoUseCase;
}

/**
 * Express 애플리케이션을 생성하고 구성합니다.
 * 의존성을 외부에서 주입받아 테스트 시 Mock으로 교체할 수 있습니다.
 */
export function createApp(dependencies: ServerDependencies): Application {
  const app = express();

  // 기본 미들웨어
  app.use(express.json());
  app.use(loggerMiddleware);

  // 컨트롤러 생성
  const todoController = new TodoController(
    dependencies.createTodoUseCase,
    dependencies.getTodoUseCase,
    dependencies.getAllTodosUseCase,
    dependencies.updateTodoUseCase,
    dependencies.deleteTodoUseCase,
    dependencies.toggleTodoUseCase,
  );

  // 라우터 등록
  app.use('/api/todos', createTodoRouter(todoController));

  // 404 핸들러 (라우터 이후에 등록)
  app.use(notFoundHandler);

  // 전역 에러 핸들러 (가장 마지막에 등록)
  app.use(globalErrorHandler);

  return app;
}
