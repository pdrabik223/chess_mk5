import type { FunctionComponent, JSX } from "react";
import { CellWidget } from "./CellWidget";
import { Board } from "../../board/Board";
import { v4 as uuidv4 } from 'uuid';
import { Row } from "../../components/Row";

export interface BoardWidgetInterface {
    board: Board;
    highlightCells?: number[];
    cellIcons?: Map<number, JSX.Element>;
}


const BoardWidget: FunctionComponent<BoardWidgetInterface> = (props): JSX.Element => {

    let cells: JSX.Element[] = [];
    let boardData = props.board.getData();

    for (let x = 0; x < Board.Width; x++) {
        let rowData: JSX.Element[] = [];
        for (let y = 0; y < Board.Height; y++) {
            let child: JSX.Element | undefined = undefined;
            let highlight = false;


            if (props.cellIcons != undefined && props.cellIcons.has(x * Board.Width + y)) {
                child = props.cellIcons.get(x * Board.Width + y)
            }

            if (props.highlightCells != undefined && props.highlightCells.includes(x * Board.Width + y)) {
                highlight = true
            }

            rowData.push(<CellWidget
               
                child={child}
                highlight={highlight}
                color={boardData[x * Board.Width + y][0]} isOccupied={boardData[x * Board.Width + y][1]} key={uuidv4()} />);
        }
        cells.push(<Row expanded={false} key={uuidv4()} children={rowData} />);
    }


    return <>
        {
            cells
        }
    </>
}
export default BoardWidget;