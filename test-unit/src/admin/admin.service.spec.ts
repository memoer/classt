import { Test, TestingModule } from '@nestjs/testing';
import * as cf from 'class-transformer';
import { AdminService } from '@app/src/admin/application/service/admin.service';
import { AdminValidator } from '@app/src/admin/application/lib/admin.validator';
import { AdminRepository } from '@app/src/admin/infra/admin.repository';
import { UtilHash, UtilValidator } from '@app/util';
import { UtilJwt } from '@app/util/util-jwt';
import {
  mockRepositoryValue,
  mockUtilHashValue,
  mockUtilValidatorValue,
  mockUtilJwtValue,
  MockUtilValidatorReturns,
  MockUtilJwtReturns,
  MockUtilHashReturns,
  MockRepositoryReturns,
} from '../../mock/value';
import { CreateAdminInput } from '@app/src/admin/dto/create-admin.in';
import { BadRequestException, ConflictException, ForbiddenException } from '@nestjs/common';
import { mockAdmin } from '../../mock/entity';

describe('AdminService', () => {
  let adminService: AdminService;
  let mockAdminRepository: MockRepositoryReturns;
  let mockUtilHash: MockUtilHashReturns;
  let mockUtilValidator: MockUtilValidatorReturns;
  let mockUtilJwt: MockUtilJwtReturns;
  let mockAdminValidator: Record<'ifAlreadyExistThrow', jest.Mock<any, any>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        { provide: AdminRepository, useValue: mockRepositoryValue() },
        { provide: UtilHash, useValue: mockUtilHashValue() },
        { provide: UtilValidator, useValue: mockUtilValidatorValue() },
        { provide: UtilJwt, useValue: mockUtilJwtValue() },
        { provide: AdminValidator, useValue: { ifAlreadyExistThrow: jest.fn() } },
      ],
    }).compile();

    adminService = module.get<AdminService>(AdminService);
    mockAdminRepository = module.get(AdminRepository);
    mockUtilHash = module.get(UtilHash);
    mockUtilValidator = module.get(UtilValidator);
    mockUtilJwt = module.get(UtilJwt);
    mockAdminValidator = module.get(AdminValidator);
    jest.spyOn(cf, 'plainToClass').mockClear();
  });

  it('should be defined', () => {
    expect(adminService).toBeDefined();
  });

  it('create: if email to create is duplicated, throw ConflictException', async () => {
    // value
    const input: CreateAdminInput = {
      email: 'test@naver.com',
      password: 'q1w2e3r4#',
      confirmPassword: 'q1w2e3r4#',
      name: 'test',
    };
    // when
    mockAdminValidator.ifAlreadyExistThrow.mockRejectedValueOnce(new ConflictException());
    // then
    try {
      await adminService.create(input);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
    } finally {
      expect(mockAdminValidator.ifAlreadyExistThrow).toHaveBeenCalledTimes(1);
      expect(mockAdminRepository.create).not.toHaveBeenCalled();
    }
  });

  it('create: success', async () => {
    // value
    const input: CreateAdminInput = {
      email: 'test@naver.com',
      password: 'q1w2e3r4#',
      confirmPassword: 'q1w2e3r4#',
      name: 'test',
    };
    const newAdminEntity = 'newAdminEntity';
    const newAdmin = { id: 1 };
    const expected = { data: 'data', token: 'token' };
    // when
    jest.spyOn(cf, 'plainToClass').mockReturnValue(expected.data);
    mockUtilHash.genHash.mockResolvedValue('hash');
    mockAdminRepository.create.mockReturnValue(newAdminEntity);
    mockAdminRepository.save.mockResolvedValue(newAdmin);
    mockUtilJwt.sign.mockReturnValue(expected.token);
    // then
    const result = await adminService.create(input);
    expect(mockAdminValidator.ifAlreadyExistThrow).toHaveBeenNthCalledWith(1, input.email);
    expect(mockAdminRepository.create).toHaveBeenNthCalledWith(1, {
      email: input.email,
      password: 'hash',
      name: input.name,
    });
    expect(mockUtilHash.genHash).toHaveBeenNthCalledWith(1, input.password);
    expect(mockAdminRepository.save).toHaveBeenNthCalledWith(1, newAdminEntity);
    expect(cf.plainToClass).toHaveBeenCalledTimes(1);
    expect(mockUtilJwt.sign).toHaveBeenNthCalledWith(1, newAdmin.id);
    expect(result).toEqual(expected);
  });

  it('delete: if wrong password, throw ForbiddenException', async () => {
    // value
    // when
    mockUtilValidator.ifWrongPasswordThrow.mockRejectedValueOnce(new ForbiddenException());
    // then
    try {
      await adminService.delete(mockAdmin(), 'plainPassword');
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
    } finally {
      expect(mockUtilValidator.ifWrongPasswordThrow).toHaveBeenCalledTimes(1);
      expect(mockAdminRepository.softDelete).not.toHaveBeenCalled();
    }
  });

  it('delete: success', async () => {
    // value
    const admin = mockAdmin();
    const plainPassword = 'plainPassword';
    // when
    mockAdminRepository.softDelete.mockResolvedValue({ affected: 1 });
    // then
    const result = await adminService.delete(admin, plainPassword);
    expect(mockUtilValidator.ifWrongPasswordThrow).toHaveBeenNthCalledWith(1, {
      plainPassword,
      hashPassword: admin.password,
    });
    expect(mockAdminRepository.softDelete).toHaveBeenNthCalledWith(1, admin.id);
    expect(result).toEqual(true);
  });

  it('update: if already email exists', async () => {
    // value
    const input = {
      email: '1',
      password: '1',
      confirmPassword: '1',
      name: '1',
    };
    // when
    mockAdminValidator.ifAlreadyExistThrow.mockRejectedValueOnce(new ConflictException());
    // then
    try {
      await adminService.update(mockAdmin(), input);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
    } finally {
      expect(mockAdminValidator.ifAlreadyExistThrow).toHaveBeenNthCalledWith(1, input.email);
      expect(
        mockUtilValidator.ifThereIsPasswordButWithoutConfirmPasswordThrow,
      ).not.toHaveBeenCalled();
    }
  });

  it('update: if password exist but confirm password not, throw BadRequestException', async () => {
    // value
    const input = {
      email: '1',
      password: '1',
      name: '1',
    };
    // when
    mockUtilValidator.ifThereIsPasswordButWithoutConfirmPasswordThrow.mockImplementationOnce(() => {
      throw new BadRequestException();
    });
    // then
    try {
      await adminService.update(mockAdmin(), input);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    } finally {
      expect(mockAdminValidator.ifAlreadyExistThrow).toHaveBeenNthCalledWith(1, input.email);
      expect(
        mockUtilValidator.ifThereIsPasswordButWithoutConfirmPasswordThrow,
      ).toHaveBeenCalledTimes(1);
      expect(mockUtilHash.genHash).not.toHaveBeenCalled();
    }
  });

  it('update: success', async () => {
    // value
    const admin = mockAdmin();
    const input = {
      email: 'email',
      password: 'password',
      confirmPassword: 'password',
      name: 'name',
    };
    const expected = 'sucess';
    // when
    jest.spyOn(admin, 'update');
    jest.spyOn(cf, 'plainToClass').mockReturnValue(expected);
    mockUtilHash.genHash.mockResolvedValue(input.password);
    // then
    const result = await adminService.update(admin, input);
    expect(mockAdminValidator.ifAlreadyExistThrow).toHaveBeenNthCalledWith(1, input.email);
    expect(
      mockUtilValidator.ifThereIsPasswordButWithoutConfirmPasswordThrow,
    ).toHaveBeenNthCalledWith(1, input.confirmPassword);
    expect(mockUtilHash.genHash).toHaveBeenNthCalledWith(1, input.password);
    expect(admin.update).toHaveBeenNthCalledWith(1, { email: input.email, name: input.name });
    expect(mockAdminRepository.save).toHaveBeenNthCalledWith(1, admin);
    expect(cf.plainToClass).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it('getToken: success', async () => {
    //value
    const input = { email: 'test@naver.com', password: 'q1w2e3r4#', errorMsg: '' };
    const expected = 'token';
    // when
    mockUtilJwt.getToken.mockResolvedValue(expected);
    // then
    const result = await adminService.getToken(input);
    expect(mockUtilJwt.getToken).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it('restore', async () => {
    //value
    //when
    mockAdminRepository.restore.mockResolvedValue({ affected: 1 });
    //then
    const result = await adminService.restore(99);
    expect(result).toEqual(true);
  });
});
