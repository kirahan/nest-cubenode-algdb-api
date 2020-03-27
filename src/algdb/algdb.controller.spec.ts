import { Test, TestingModule } from '@nestjs/testing';
import { AlgdbController } from './algdb.controller';

describe('Algdb Controller', () => {
  let controller: AlgdbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlgdbController],
    }).compile();

    controller = module.get<AlgdbController>(AlgdbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
