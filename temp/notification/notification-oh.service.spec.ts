import { Test, TestingModule } from '@nestjs/testing';
import { NotificationOpenHostService } from '@app/src/notification/application/service/notification-oh.service';
import { StudentSchoolDAO } from '@app/src/student/infra/student-school.dao';
import { NotificationRepository } from '@app/src/notification/infra/notification.repository';
import { mockRepositoryValue, MockRepositoryReturns } from '../../mock/function';

describe('NotificationOpenHostService', () => {
  let notificationOpenHostService: NotificationOpenHostService;
  let mockNoitifcaitonRepository: MockRepositoryReturns;
  let mockStudentSchoolDAO: Record<'findManyBySchoolId', jest.Mock<any, any>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationOpenHostService,
        { provide: NotificationRepository, useValue: mockRepositoryValue() },
        { provide: StudentSchoolDAO, useValue: { findManyBySchoolId: jest.fn() } },
      ],
    }).compile();

    notificationOpenHostService = module.get<NotificationOpenHostService>(
      NotificationOpenHostService,
    );
    mockNoitifcaitonRepository = module.get(NotificationRepository);
    mockStudentSchoolDAO = module.get(StudentSchoolDAO);
  });

  it('should be defined', () => {
    expect(notificationOpenHostService).toBeDefined();
  });

  it('create', async () => {
    // value
    const input = { schoolId: 1, schoolNewsId: 2 };
    const findManyBySchoolIdReturn = [{ studentId: 3 }];
    // when
    mockStudentSchoolDAO.findManyBySchoolId.mockResolvedValue(findManyBySchoolIdReturn);
    // then
    await notificationOpenHostService.create(input);
    expect(mockStudentSchoolDAO.findManyBySchoolId).toHaveBeenNthCalledWith(1, {
      schoolId: input.schoolId,
      select: ['studentId'],
    });
    expect(mockNoitifcaitonRepository.insert).toHaveBeenNthCalledWith(
      1,
      findManyBySchoolIdReturn.map(({ studentId }) => ({
        studentId,
        schoolNewsId: input.schoolNewsId,
      })),
    );
  });
});
