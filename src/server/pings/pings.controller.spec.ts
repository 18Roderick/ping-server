import { Test, TestingModule } from '@nestjs/testing';
import { PingsController } from './pings.controller';
import { PingsService } from './pings.service';

describe('PingsController', () => {
  let controller: PingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PingsController],
      providers: [PingsService],
    }).compile();

    controller = module.get<PingsController>(PingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
