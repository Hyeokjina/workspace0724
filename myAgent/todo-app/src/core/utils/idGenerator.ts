import { v4 as uuidv4 } from 'uuid';

/**
 * ID 생성을 추상화하여 테스트 시 교체 가능하도록 합니다.
 */
export interface IdGenerator {
  generate(): string;
}

export class UuidGenerator implements IdGenerator {
  generate(): string {
    return uuidv4();
  }
}

/**
 * 기본 UUID 생성기 인스턴스
 */
export const defaultIdGenerator: IdGenerator = new UuidGenerator();
