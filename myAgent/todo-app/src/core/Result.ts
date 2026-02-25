/**
 * Result 패턴: 예외 대신 명시적 성공/실패 타입을 반환하여
 * 호출자가 에러를 반드시 처리하도록 강제합니다.
 */

export interface AppError {
  readonly code: string;
  readonly message: string;
  readonly statusCode: number;
}

export type Result<T> =
  | { readonly success: true; readonly value: T }
  | { readonly success: false; readonly error: AppError };

/**
 * 성공 Result를 생성합니다.
 */
export function ok<T>(value: T): Result<T> {
  return { success: true, value };
}

/**
 * 실패 Result를 생성합니다.
 */
export function fail<T>(error: AppError): Result<T> {
  return { success: false, error };
}
