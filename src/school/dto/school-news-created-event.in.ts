import { Properties } from '@app/config';

export class SchoolNewsCreatedEvent {
  schoolId: number;
  schoolNewsId: number;

  constructor({ schoolId, schoolNewsId }: Properties<SchoolNewsCreatedEvent>) {
    this.schoolId = schoolId;
    this.schoolNewsId = schoolNewsId;
  }
}
