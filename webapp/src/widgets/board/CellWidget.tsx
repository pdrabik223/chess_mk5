import type { FunctionComponent, JSX } from 'react';
import type { CellInterface } from './CellInterface';

export const CellWidget: FunctionComponent<CellInterface> = (props): JSX.Element => {
  // console.log(props.color)
  let x = props.isOccupied ? "X" : "";
  return <div style={{
    height: '100px',
    width: '100px',
    // padding: '5%',
  }}>
    <div style={{
      height: '50px',
      width: '50px',
      background: props.color.toRGB()
    }}>

      {x}
    </div>
  </div>;
};
