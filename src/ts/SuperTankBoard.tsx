import * as React from "react";
import * as ReactDOM from "react-dom";
import {Tank} from './Tank';
import {BLOCK_SIZE, HEIGHT, WIDTH} from './config';
import {Dir, Point} from './util';

interface Props {
}

interface TankInfo {
    dir: Dir;
    pos: Point;
}

interface State {
    selfTankInfo: TankInfo,
    enemyTankInfos: TankInfo[];
}

export class SuperTankBoard extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            enemyTankInfos: [
                {dir: Dir.UP, pos: {y: 40, x: 5}},
                {dir: Dir.DOWN, pos: {y: 20, x: 40}},
                {dir: Dir.UP, pos: {y: 2, x: 5}},
                {dir: Dir.DOWN, pos: {y: 5, x: 40}}
            ],
            selfTankInfo: {dir: Dir.UP, pos: {y: 48, x: 37}},
        };
    }

    componentDidMount() {
        this.focusBoard();
    }

    componentDidUpdate() {
        this.focusBoard();
    }

    render() {
        let boardWidth = BLOCK_SIZE * WIDTH + (WIDTH + 1);
        let boardHeight = BLOCK_SIZE * HEIGHT + (HEIGHT + 1);
        let boardStyle = {width: boardWidth, height: boardHeight};
        return (
            <div className="ts-arena">
                <div ref="tkBoard" className="tk-board" tabIndex={0} style={boardStyle}
                     onKeyDown={(event) => this.onKeyPress(event.keyCode)}>
                    {this.state.enemyTankInfos.map((tankInfo, index) => {
                        return <Tank
                            key={index}
                            dir={tankInfo.dir}
                            pos={tankInfo.pos}
                            onMove={() => true}
                        />;
                    })}
                    <Tank ref="selfTank"
                          dir={this.state.selfTankInfo.dir}
                          manualMove={true}
                          pos={this.state.selfTankInfo.pos}
                    />
                </div>
                <div className="tk-game-info">Use arrow keys to move, 'F' to shoot.</div>
            </div>
        );
    }

    private focusBoard(): void {
        (ReactDOM.findDOMNode(this.refs.tkBoard) as HTMLDivElement).focus();
    }

    private onKeyPress(keyCode: number) {
        if (keyCode === 38) {
            (this.refs.selfTank as Tank).headOrMoveUp();
        } else if (keyCode === 37) {
            (this.refs.selfTank as Tank).headOrMoveLeft();
        } else if (keyCode === 39) {
            (this.refs.selfTank as Tank).headOrMoveRight();
        } else if (keyCode === 40) {
            (this.refs.selfTank as Tank).headOrMoveDown();
        } else if (keyCode === 70) {
            // Key 'f'
            (this.refs.selfTank as Tank).fireBulletInCurrentDir();
        }
    }
}
