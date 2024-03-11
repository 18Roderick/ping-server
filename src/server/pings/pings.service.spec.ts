import { Test, TestingModule } from '@nestjs/testing';
import { PingsService } from './pings.service';

describe('PingsService', () => {
  let service: PingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PingsService],
    }).compile();

    service = module.get<PingsService>(PingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
