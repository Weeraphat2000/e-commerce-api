import { Test, TestingModule } from '@nestjs/testing';
import { DeliveringService } from './delivering.service';

describe('DeliveringService', () => {
  let service: DeliveringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveringService],
    }).compile();

    service = module.get<DeliveringService>(DeliveringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
