import { UtilCommon } from '@app/util';
import { Test, TestingModule } from '@nestjs/testing';

describe('UtilCommon', () => {
  let service: UtilCommon;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilCommon],
    }).compile();

    service = module.get<UtilCommon>(UtilCommon);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
