import { AppModule } from '@app/src/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { adminE2ETest } from './1-admin.e2e';
import { ApiTestBuilder } from './common/api-test.builder';

function startTest(): void {
  let nestApp: INestApplication;
  const apiBuilder = new ApiTestBuilder();
  // ! initialize
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    nestApp = module.createNestApplication();
    await nestApp.init();
    apiBuilder.setApp(nestApp);
  });
  // ! start test
  adminE2ETest(apiBuilder);
}

startTest();
