/**
 * Todo 생성 요청 DTO
 */
export interface CreateTodoRequestDto {
  readonly title: string;
  readonly description?: string;
}
