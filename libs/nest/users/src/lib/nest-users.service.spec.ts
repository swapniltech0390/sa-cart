import { Test } from '@nestjs/testing';
import { NestUsersService } from './nest-users.service';

describe('NestUsersService', () => {
  let service: NestUsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestUsersService],
    }).compile();

    service = module.get(NestUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
