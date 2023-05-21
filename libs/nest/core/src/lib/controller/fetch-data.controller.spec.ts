import { Test, TestingModule } from '@nestjs/testing';
import { FetchDataController } from './fetch-data.controller';

describe('FetchDataController', () => {
  let controller: FetchDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FetchDataController],
    }).compile();

    controller = module.get<FetchDataController>(FetchDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
