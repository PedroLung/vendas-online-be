import { ReturnStateDto } from 'src/state/dto/returnState.dto';
import { CityEntity } from '../entity/city.entity';

export class ReturnCityDto {
  name: string;
  state?: ReturnStateDto;

  constructor(cityEntity: CityEntity) {
    this.name = cityEntity.name;
    this.state = cityEntity.state
      ? new ReturnStateDto(cityEntity.state)
      : undefined;
  }
}
