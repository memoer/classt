import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from '@app/src/notification/application/service/notification.service';
import { NotificationRepository } from '@app/src/notification/infra/notification.repository';
import { MockRepositoryReturns, mockRepositoryValue } from '../../mock/value';

describe('NotificationService', () => {
  let notificationService: NotificationService;
  let mockNotificationRepository: MockRepositoryReturns;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        { provide: NotificationRepository, useValue: mockRepositoryValue() },
      ],
    }).compile();

    notificationService = module.get<NotificationService>(NotificationService);
    mockNotificationRepository = module.get(NotificationRepository);
  });

  it('should be defined', () => {
    expect(notificationService).toBeDefined();
  });

  it('read', async () => {
    // value
    const input = { studentId: 1, notificationId: 2 };
    const expected = true;
    // when
    // then
    const result = await notificationService.read(input.studentId, input.notificationId);
    expect(mockNotificationRepository.update).toHaveBeenNthCalledWith(
      1,
      {
        studentId: input.studentId,
        id: input.notificationId,
      },
      { isReaded: true },
    );
    expect(result).toEqual(expected);
  });

  it('readAll', async () => {
    // value
    const studentId = 1;
    const expected = true;
    // when
    // then
    const result = await notificationService.readAll(studentId);
    expect(mockNotificationRepository.update).toHaveBeenNthCalledWith(
      1,
      { studentId },
      { isReaded: true },
    );
    expect(result).toEqual(expected);
  });
});
