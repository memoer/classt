import { LengthArgs } from './dto/constants.dto';

// 흔히, 자주, 공통으로 사용되는 유효성 검사 메시지
export const VALIDATION_MSG = {
  MIN_LENGTH: ({ name, length }: LengthArgs): string =>
    `${name} :최소 ${length} 글자 이상이여야 합니다.`,
  MAX_LENGTH: ({ name, length }: LengthArgs): string =>
    `${name} :최대 ${length} 글자 까지 가능합니다.`,
  PASSWORD: (): string =>
    '비밀번호는 8~20 글자여야 하며 문자,숫자,특수문자 최소 1글자씩 포함해야 합니다.',
};
