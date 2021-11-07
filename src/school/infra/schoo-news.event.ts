import { NotificationOpenHostService } from '@app/src/notification/application/service/notification-oh.service';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { SchoolNewsCreatedEvent } from '../dto/school-news-created-event.in';

@Injectable()
export class SchoolNewsEvent {
  static readonly CREATED: 'schoolNews.created';
  constructor(private readonly notificationOpenHostService: NotificationOpenHostService) {}

  @Transactional()
  @OnEvent(SchoolNewsEvent.CREATED)
  async handleSchoolNewsCreatedEvent(payload: SchoolNewsCreatedEvent): Promise<void> {
    this.notificationOpenHostService.create(payload);
  }
}
