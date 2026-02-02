import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateEntity } from './entity/state.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateEntity)
    private readonly stateRepository: Repository<StateEntity>,
  ) {}

  async getAllStates(): Promise<StateEntity[]> {
    return this.stateRepository.find();
  }
}
