import type { FunctionComponent, JSX } from 'react';
import type { Color } from '../../board/Color';

export interface CellInterface {
  color: Color;
  isOccupied: boolean;
  key: string;
  highlight?: boolean;
  child?: JSX.Element;
}


export const CellWidget: FunctionComponent<CellInterface> = (props): JSX.Element => {


  let highlight = props.highlight != null && props.highlight ? {
    borderStyle: "solid",
    borderWidth: 8,
    borderColor: 'yellow'
  } : {}



  return <div style={{
    height: '100px',
    width: '100px',
    display: "flex",
    justifyContent: "center",
    alignItems: "center", 
    // padding: '5%',
  }}>
    <div style={{
      height: '50px',
      width: '50px',
      background: props.color.toRGB(),

      ...highlight,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>

      {props.child}
    </div>
  </div >;
};
