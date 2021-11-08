import { Test, TestingModule } from '@nestjs/testing';
import { NotificationOpenHostService } from '@app/src/notification/application/service/notification-oh.service';
import { StudentSchoolDAO } from '@app/src/student/infra/student-school.dao';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotificationRepository } from '@app/src/notification/infra/notification.repository';
import { mockRepository } from '../../common/mock';

describe('NotificationOpenHostService', () => {
  let service: NotificationOpenHostService;
  const mockStudentSchoolDAO = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationOpenHostService,
        { provide: StudentSchoolDAO, useValue: mockStudentSchoolDAO },
        { provide: getRepositoryToken(NotificationRepository), useValue: mockRepository() },
      ],
    }).compile();

    service = module.get<NotificationOpenHostService>(NotificationOpenHostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
