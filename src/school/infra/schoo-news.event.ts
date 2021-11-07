import { NotificationOpenHostService } from '@app/src/notification/application/service/notification-oh.service';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { SchoolNewsCreatedEvent } from '../dto/school-news-created-event.in';

@Injectable()
export class SchoolNewsEvent {
  static readonly SCHOOL_NEWS_CREATED: 'schoolNewsCreated';
  constructor(private readonly notificationOpenHostService: NotificationOpenHostService) {}

  @Transactional()
  @OnEvent(SchoolNewsEvent.SCHOOL_NEWS_CREATED)
  async handleSchoolNewsCreatedEvent(payload: SchoolNewsCreatedEvent): Promise<void> {
    this.notificationOpenHostService.create(payload);
  }
}
