import { Test, TestingModule } from '@nestjs/testing';
import { Jobs } from './jobs';

describe('Jobs', () => {
  let provider: Jobs;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Jobs],
    }).compile();

    provider = module.get<Jobs>(Jobs);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
