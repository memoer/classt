import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../infra/notification.repository';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async read(studentId: number, notificationId: number): Promise<boolean> {
    await this.notificationRepository.update({ studentId, id: notificationId }, { isReaded: true });
    return true;
  }

  async readAll(studentId: number): Promise<boolean> {
    await this.notificationRepository.update({ studentId }, { isReaded: true });
    return true;
  }
}
