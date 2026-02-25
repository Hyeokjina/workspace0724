import { Request, Response, NextFunction } from 'express';
import { ICreateTodoUseCase } from '../../domain/usecases/ICreateTodoUseCase';
import { IGetTodoUseCase } from '../../domain/usecases/IGetTodoUseCase';
import { IGetAllTodosUseCase } from '../../domain/usecases/IGetAllTodosUseCase';
import { IUpdateTodoUseCase } from '../../domain/usecases/IUpdateTodoUseCase';
import { IDeleteTodoUseCase } from '../../domain/usecases/IDeleteTodoUseCase';
import { IToggleTodoUseCase } from '../../domain/usecases/IToggleTodoUseCase';

/**
 * Todo 컨트롤러
 *
 * HTTP 요청/응답 변환만 담당하며 비즈니스 로직은 UseCase에 위임합니다.
 * 모든 UseCase를 인터페이스로 주입받아 테스트 용이성을 확보합니다.
 */
export class TodoController {
  constructor(
    private readonly createTodoUseCase: ICreateTodoUseCase,
    private readonly getTodoUseCase: IGetTodoUseCase,
    private readonly getAllTodosUseCase: IGetAllTodosUseCase,
    private readonly updateTodoUseCase: IUpdateTodoUseCase,
    private readonly deleteTodoUseCase: IDeleteTodoUseCase,
    private readonly toggleTodoUseCase: IToggleTodoUseCase,
  ) {}

  /**
   * POST /api/todos
   * Todo를 생성합니다.
   */
  createTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.createTodoUseCase.execute({
        title: req.body.title as string,
        description: req.body.description as string | undefined,
      });

      if (!result.success) {
        res.status(result.error.statusCode).json({
          success: false,
          error: {
            code: result.error.code,
            message: result.error.message,
          },
        });
        return;
      }

      res.status(201).json({
        success: true,
        data: result.value,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/todos
   * 전체 Todo 목록을 조회합니다. ?completed=true/false 필터 지원.
   */
  getAllTodos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { completed } = req.query;

      let completedFilter: boolean | undefined;

      if (completed === 'true') {
        completedFilter = true;
      } else if (completed === 'false') {
        completedFilter = false;
      }
      // 그 외 값은 필터 없이 전체 조회

      const result = await this.getAllTodosUseCase.execute(
        completedFilter !== undefined ? { completed: completedFilter } : undefined,
      );

      if (!result.success) {
        res.status(result.error.statusCode).json({
          success: false,
          error: {
            code: result.error.code,
            message: result.error.message,
          },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: result.value,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/todos/:id
   * 단건 Todo를 조회합니다.
   */
  getTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.getTodoUseCase.execute(id);

      if (!result.success) {
        res.status(result.error.statusCode).json({
          success: false,
          error: {
            code: result.error.code,
            message: result.error.message,
          },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: result.value,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * PATCH /api/todos/:id
   * Todo를 부분 업데이트합니다.
   */
  updateTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.updateTodoUseCase.execute(id, {
        title: req.body.title as string | undefined,
        description: req.body.description as string | undefined,
      });

      if (!result.success) {
        res.status(result.error.statusCode).json({
          success: false,
          error: {
            code: result.error.code,
            message: result.error.message,
          },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: result.value,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * DELETE /api/todos/:id
   * Todo를 삭제합니다.
   */
  deleteTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.deleteTodoUseCase.execute(id);

      if (!result.success) {
        res.status(result.error.statusCode).json({
          success: false,
          error: {
            code: result.error.code,
            message: result.error.message,
          },
        });
        return;
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  /**
   * PATCH /api/todos/:id/toggle
   * Todo 완료 상태를 토글합니다.
   */
  toggleTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.toggleTodoUseCase.execute(id);

      if (!result.success) {
        res.status(result.error.statusCode).json({
          success: false,
          error: {
            code: result.error.code,
            message: result.error.message,
          },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: result.value,
      });
    } catch (error) {
      next(error);
    }
  };
}
