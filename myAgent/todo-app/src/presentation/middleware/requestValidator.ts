import { Request, Response, NextFunction } from 'express';

/**
 * Todo 생성 요청 본문 유효성 검사 미들웨어
 * Content-Type이 application/json인지, title 필드가 존재하는지 검사합니다.
 */
export function validateCreateTodoRequest(req: Request, res: Response, next: NextFunction): void {
  const { body } = req;

  if (!body || typeof body !== 'object') {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: '요청 본문이 올바른 JSON 형식이어야 합니다.',
      },
    });
    return;
  }

  if (body.title === undefined || body.title === null) {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'title 필드는 필수입니다.',
      },
    });
    return;
  }

  if (typeof body.title !== 'string') {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'title은 문자열이어야 합니다.',
      },
    });
    return;
  }

  if (body.description !== undefined && typeof body.description !== 'string') {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'description은 문자열이어야 합니다.',
      },
    });
    return;
  }

  next();
}

/**
 * Todo 수정 요청 본문 유효성 검사 미들웨어
 * title 또는 description 중 하나 이상 포함되어야 합니다.
 */
export function validateUpdateTodoRequest(req: Request, res: Response, next: NextFunction): void {
  const { body } = req;

  if (!body || typeof body !== 'object') {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: '요청 본문이 올바른 JSON 형식이어야 합니다.',
      },
    });
    return;
  }

  if (body.title === undefined && body.description === undefined) {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'title 또는 description 중 하나 이상을 제공해야 합니다.',
      },
    });
    return;
  }

  if (body.title !== undefined && typeof body.title !== 'string') {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'title은 문자열이어야 합니다.',
      },
    });
    return;
  }

  if (body.description !== undefined && typeof body.description !== 'string') {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'description은 문자열이어야 합니다.',
      },
    });
    return;
  }

  next();
}
