import { Request, Response, NextFunction } from 'express';

/**
 * 전역 에러 핸들러 미들웨어
 *
 * Express의 4개 인자 미들웨어는 에러 핸들러로 동작합니다.
 * next(error)로 전달된 모든 에러를 여기서 처리합니다.
 */
export function globalErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  console.error(`[ERROR] ${err.message}`, {
    stack: err.stack,
    url: req.url,
    method: req.method,
  });

  // JSON 파싱 에러 처리
  if (err.name === 'SyntaxError') {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: '올바르지 않은 JSON 형식입니다.',
      },
    });
    return;
  }

  // 그 외 예상치 못한 에러
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: '서버 내부 오류가 발생했습니다.',
    },
  });
}

/**
 * 404 Not Found 핸들러 미들웨어
 * 등록되지 않은 라우트에 대한 요청을 처리합니다.
 */
export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: `${req.method} ${req.url} 라우트를 찾을 수 없습니다.`,
    },
  });
}
