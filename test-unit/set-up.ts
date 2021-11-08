jest.mock('typeorm-transactional-cls-hooked', () => ({
  Transactional: () => (): any => ({}),
  BaseRepository: class {},
}));
