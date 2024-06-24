import { IAxiosManager } from './interfaces';
import { AxiosManager } from './AxiosManager';

export abstract class AbstractService {
  public manager: IAxiosManager

  constructor(manager: IAxiosManager = new AxiosManager()) {
    this.manager = manager
  }
}
