import { Test, TestingModule } from '@nestjs/testing';
import { NotificationMutationResolver } from './notification.resolver';
import { NotificationService } from './notification.service';

describe('NotificationMutationResolver', () => {
  let resolver: NotificationMutationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationMutationResolver, NotificationService],
    }).compile();

    resolver = module.get<NotificationMutationResolver>(NotificationMutationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
