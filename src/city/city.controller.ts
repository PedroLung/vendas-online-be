import { Controller, Param } from '@nestjs/common';
import { CityEntity } from './entity/city.entity';
import { CityService } from './city.service';
import { Get } from '@nestjs/common';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('/:stateId')
  async getAllCitiesByStateId(
    @Param('stateId') stateId: number,
  ): Promise<CityEntity[]> {
    return this.cityService.getAllCitiesByStateId(stateId);
  }
}
