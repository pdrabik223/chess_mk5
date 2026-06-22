import type { FunctionComponent, JSX } from "react";
import { CellWidget } from "./CellWidget";
import type { BoardWidgetInterface } from "./BoardWidgetInterface";
import { Board } from "../../board/Board";
import { v4 as uuidv4 } from 'uuid';
import { Row } from "../../components/Row";


const BoardWidget: FunctionComponent<BoardWidgetInterface> = (props): JSX.Element => {

    let cells: JSX.Element[] = [];
    let boardData = props.board.getData();
    for (let x = 0; x < Board.Width; x++) {
        let rowData: JSX.Element[] = [];
        for (let y = 0; y < Board.Height; y++) {
            rowData.push(<CellWidget color={boardData[x * Board.Width + y][0]} isOccupied={boardData[x * Board.Width + y][1]} key={uuidv4()} />);
        }
        cells.push(<Row expanded={true} key={uuidv4()} children={rowData} />);
    }

    console.log(props.board.toJson())
    return <>
        {
            cells
        }
    </>
}
export default BoardWidget;