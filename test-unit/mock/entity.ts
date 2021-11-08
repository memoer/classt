import { AdminAuth, AdminAuthType } from '@app/src/admin/domain/entity/admin-auth.entity';
import { Admin } from '@app/src/admin/domain/entity/admin.entity';
import { StudentSchool } from '@app/src/student/domain/entity/student-school.entity';
import { Student } from '@app/src/student/domain/entity/student.entity';

export const mockAdmin = (): Admin => {
  const admin = new Admin();
  admin.id = 1;
  admin.email = 'admin@naver.com';
  admin.name = 'admin';
  admin.password = 'q1w2e3#';
  admin.authList = [
    mockAdminAuth(admin.id, AdminAuthType.CREATE_SCHOOL),
    mockAdminAuth(admin.id, AdminAuthType.DELETE_SCHOOL),
  ];
  return admin;
};
export const mockAdminAuth = (adminId: number, type: AdminAuthType): AdminAuth => {
  return AdminAuth.createAdminAuth({ adminId, type });
};
export const mockStudent = (): Student => {
  const student = new Student();
  student.id = 1;
  student.email = 'student@naver.com';
  student.name = 'student';
  student.password = 'q1w2e3#';
  return student;
};
interface MockStudentSchool {
  studentId?: number;
  schoolId?: number;
}
export const mockStudentSchool = ({ studentId, schoolId }: MockStudentSchool): StudentSchool => {
  const studentSchool = new StudentSchool();
  if (studentId) studentSchool.studentId = studentId;
  if (schoolId) studentSchool.schoolId = schoolId;
  return studentSchool;
};
