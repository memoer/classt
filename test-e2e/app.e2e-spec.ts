import { AppModule } from '@app/src/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiTestBuilder } from './common/api-test.builder';

function startTest(): void {
  let nestApp: INestApplication;
  // ! initialize
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    nestApp = module.createNestApplication();
    await nestApp.init();
    const apiBuilder = new ApiTestBuilder(nestApp);
  });
  // ! start test
}

startTest();
