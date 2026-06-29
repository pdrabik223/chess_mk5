import { Board } from '../board/Board';
import { Color } from '../board/Color';

const TicTacToePieces: String = "exo"; // empty, pawn, knight, bishop, queen, knight



export class TicTacToeGame {

    state: String[] = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'];

    constructor(initialState?: String) {



        if (initialState == undefined)
            return;

        for (let i = 0; i < initialState.length; i++) {
            this.state[i] = initialState[i];
        }

    }

    toBoard() {
        let colors = [];

        for (let x = 0; x < Board.Width * Board.Height; x++) {
            colors.push(new Color(0, 0, 0));
        }

        let flip = false;
        const gray = new Color(44, 44, 44);
        const white = new Color(144, 144, 144);
        for (let x = 1; x < 7; x += 2) {
            for (let i = 0; i < 2; i++) {
                let aColor = gray;
                let bColor = white;

                if (flip) {
                    aColor = white;
                    bColor = gray;
                }

                colors[(x + i) * Board.Width + 1] = aColor;
                colors[(x + i) * Board.Width + 2] = aColor;

                colors[(x + i) * Board.Width + 3] = bColor;
                colors[(x + i) * Board.Width + 4] = bColor;

                colors[(x + i) * Board.Width + 5] = aColor;
                colors[(x + i) * Board.Width + 6] = aColor;

            }
            flip = !flip;
        }
        return new Board(colors);
    }
}
