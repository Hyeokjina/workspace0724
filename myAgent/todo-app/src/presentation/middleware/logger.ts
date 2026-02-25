import { Request, Response, NextFunction } from 'express';

/**
 * HTTP 요청/응답 로깅 미들웨어
 * 요청 메서드, URL, 응답 시간, 상태 코드를 기록합니다.
 */
export function loggerMiddleware(req: Request, res: Response, next: NextFunction): void {
  const startTime = Date.now();
  const { method, url } = req;

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const { statusCode } = res;
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] ${method} ${url} ${statusCode} - ${duration}ms`);
  });

  next();
}
