/**
 * Todo 수정 요청 DTO
 * 모든 필드가 선택사항입니다 (부분 업데이트).
 */
export interface UpdateTodoRequestDto {
  readonly title?: string;
  readonly description?: string;
}
