import dayjs, { OpUnitType, QUnitType } from 'dayjs';

export class DiffTimeArgs {
  diff: string | number | Date | dayjs.Dayjs;
  unit: QUnitType | OpUnitType;
}

export class IfWrongPasswordThrowArgs {
  plainPassword: string;
  hashPassword: string;
}
