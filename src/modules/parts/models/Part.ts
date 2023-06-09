import { ReturnBase } from 'src/models/ReturnBase';
import { SelectOption } from 'src/models/SelectOption';

export enum ViewType {
  Design = 'Design',
  Manufacturing = 'Manufacturing',
}

export type ViewTypeOption = SelectOption<ViewType>

export interface PartVersion extends ReturnBase {
  masterId: number,
  iteration: number,
  revision: number,
  checkout: boolean,
}

export interface Part extends ReturnBase {
  number: string,
  name: string,
  isEndItem: boolean,
  isPhantom: boolean,
  viewType: ViewType,
  viewSubtypeId: number,
  checkout: boolean,
  checkoutId: number | null,
  version: PartVersion,
}
