import { SchoolNewsCreatedEvent } from '@app/src/school/dto/school-news-created-event.in';
import { StudentSchoolDAO } from '@app/src/student/infra/student-school.dao';
import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../infra/notification.repository';

@Injectable()
export class NotificationOpenHostService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly studentSchoolDAO: StudentSchoolDAO,
  ) {}

  async create({ schoolId, schoolNewsId }: SchoolNewsCreatedEvent): Promise<void> {
    const studentSchoolList = await this.studentSchoolDAO.findManyBySchoolId({
      schoolId,
      select: ['studentId'],
    });
    await this.notificationRepository.insert(
      studentSchoolList.map(({ studentId }) => ({ studentId, schoolNewsId })),
    );
  }
}
