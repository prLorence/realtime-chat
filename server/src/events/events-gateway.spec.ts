import { Test, TestingModule } from '@nestjs/testing';
import { EventsGateway } from './events-gateway';

describe('EventsGateway', () => {
  let provider: EventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsGateway],
    }).compile();

    provider = module.get<EventsGateway>(EventsGateway);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
