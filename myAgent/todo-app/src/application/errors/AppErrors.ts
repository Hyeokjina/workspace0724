import { AppError } from '../../core/Result';

/**
 * 도메인 에러 코드 상수
 */
export const ERROR_CODES = {
  TODO_NOT_FOUND: 'TODO_NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;

/**
 * Todo를 찾을 수 없을 때 반환하는 에러 (HTTP 404)
 */
export function createTodoNotFoundError(id: string): AppError {
  return {
    code: ERROR_CODES.TODO_NOT_FOUND,
    message: `ID '${id}'에 해당하는 Todo를 찾을 수 없습니다.`,
    statusCode: 404,
  };
}

/**
 * 입력값 유효성 검사 실패 에러 (HTTP 400)
 */
export function createValidationError(messages: string[]): AppError {
  return {
    code: ERROR_CODES.VALIDATION_ERROR,
    message: messages.join(', '),
    statusCode: 400,
  };
}

/**
 * 서버 내부 에러 (HTTP 500)
 */
export function createInternalServerError(message?: string): AppError {
  return {
    code: ERROR_CODES.INTERNAL_SERVER_ERROR,
    message: message ?? '서버 내부 오류가 발생했습니다.',
    statusCode: 500,
  };
}
