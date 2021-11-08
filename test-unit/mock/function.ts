export interface MockUtilCommonReturns {
  exception: jest.Mock<any, any>;
}
export interface MockUtilDAOReturns {
  getSkip: jest.Mock<any, any>;
}
export interface MockUtilHashReturns {
  genHash: jest.Mock<any, any>;
  isEquals: jest.Mock<any, any>;
}
export interface MockUtilValidatorReturns {
  ifWrongPasswordThrow: jest.Mock<any, any>;
  ifThereIsPasswordButWithoutConfirmPasswordThrow: jest.Mock<any, any>;
  ifNotFoundThrow: jest.Mock<any, any>;
}
export interface MockUtilJwtReturns {
  sign: jest.Mock<any, any>;
  verify: jest.Mock<any, any>;
  getToken: jest.Mock<any, any>;
}
export interface MockRepositoryReturns {
  findOne: jest.Mock<any, any>;
  save: jest.Mock<any, any>;
  create: jest.Mock<any, any>;
  softDelete: jest.Mock<any, any>;
  restore: jest.Mock<any, any>;
  insert: jest.Mock<any, any>;
  update: jest.Mock<any, any>;
  // findAndCount: jest.Mock<any, any>;
}
export interface MockConnectionReturns {
  createQueryBuilder: jest.Mock<any, any>;
  from: jest.Mock<any, any>;
  where: jest.Mock<any, any>;
  getMany: jest.Mock<any, any>;
}
export interface MockEventEmitterReturns {
  emit: jest.Mock<any, any>;
}

export const mockUtilCommonValue = (): MockUtilCommonReturns => ({ exception: jest.fn() });
export const mockUtilDAO = (): MockUtilDAOReturns => ({ getSkip: jest.fn() });
export const mockUtilHashValue = (): MockUtilHashReturns => ({
  genHash: jest.fn(),
  isEquals: jest.fn(),
});
export const mockUtilValidatorValue = (): MockUtilValidatorReturns => ({
  ifWrongPasswordThrow: jest.fn(),
  ifThereIsPasswordButWithoutConfirmPasswordThrow: jest.fn(),
  ifNotFoundThrow: jest.fn(),
});
export const mockUtilJwtValue = (): MockUtilJwtReturns => ({
  sign: jest.fn(),
  verify: jest.fn(),
  getToken: jest.fn(),
});
export const mockRepositoryValue = (): MockRepositoryReturns => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  softDelete: jest.fn(),
  restore: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
  // findAndCount: jest.fn(),
});
export const mockConnection = (): MockConnectionReturns => ({
  createQueryBuilder: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  getMany: jest.fn(),
});
export const mockEventEmitter = (): MockEventEmitterReturns => ({ emit: jest.fn() });
