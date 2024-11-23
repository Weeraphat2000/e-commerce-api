import { Test, TestingModule } from '@nestjs/testing';
import { DeliveringController } from './delivering.controller';
import { DeliveringService } from './delivering.service';

describe('DeliveringController', () => {
  let controller: DeliveringController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveringController],
      providers: [DeliveringService],
    }).compile();

    controller = module.get<DeliveringController>(DeliveringController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
