import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from '@app/src/notification/application/service/notification.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotificationRepository } from '@app/src/notification/infra/notification.repository';
import { mockRepository } from '../../common/mock';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        { provide: getRepositoryToken(NotificationRepository), useValue: mockRepository() },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
