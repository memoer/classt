import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@app/src/app.module';
import { adminE2ETest } from './1-admin.e2e';
import { schoolE2ETest } from './2-school.e2e';
import { studentE2ETest } from './3-student.e2e';
import { studentSchoolE2ETest } from './4-student-school.e2e';
import { notificationE2ETest } from './5-notification.e2e';
import { deleteE2ETest } from './99-delete.e2e';
import { ApiTestBuilder } from './common/api-test.builder';

let nestApp: INestApplication;
const apiBuilder = new ApiTestBuilder();
// ! initialize
beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  nestApp = module.createNestApplication();
  apiBuilder.setApp(nestApp);
  await nestApp.init();
});
afterAll(async () => {
  nestApp.close();
});
// ! start test
adminE2ETest(apiBuilder);
schoolE2ETest(apiBuilder);
studentE2ETest(apiBuilder);
studentSchoolE2ETest(apiBuilder);
notificationE2ETest(apiBuilder);
deleteE2ETest(apiBuilder);
