import type { Color } from '../../board/Color';

export interface CellInterface {
  color: Color;
  isOccupied: boolean;
  key: string;
}
