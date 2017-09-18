import * as React from "react";
import {callEveryNMs, Dir, getRandomInteger, Point, tankLayout} from './util';
import {BLOCK_SIZE, HEIGHT, WIDTH} from './config';

export type PosAndDir = {
    pos: Point;
    dir: Dir;
}

interface Props {
    pos: Point;
    dir: Dir;
    manualMove?: boolean;
    onMove?: (position: Point, rotation: Dir) => boolean;
}

interface State {
    pos: Point;
    dir: Dir;
    bullets: PosAndDir[];
}

export class Tank extends React.Component<Props, State> {

    constructor(props: Props) {
        super();
        this.state = {
            pos: props.pos,
            dir: props.dir,
            bullets: []
        };
    }

    componentDidMount() {
        this.startMovingBulletsAutomatically();
        if (!this.props.manualMove) {
            this.startMovingAutomatically();
            this.startShootingAutomatically();
        }
    }

    render() {
        return (
            <div className="tk-tank">
                {this.getBlockPositions().map((pos) => {
                    let left = pos.x * BLOCK_SIZE + (pos.x + 1);
                    let top = pos.y * BLOCK_SIZE + (pos.y + 1);
                    return (
                        <div key={pos.y + ':' + pos.x}
                             className="tk-block"
                             style={{
                                 left: left,
                                 top: top,
                                 width: BLOCK_SIZE,
                                 height: BLOCK_SIZE,
                                 backgroundColor: this.props.manualMove ? 'lightgreen' : 'blue'
                             }}>
                        </div>
                    );
                })}
                {this.state.bullets.map((bullet, index) => {
                    let pos = bullet.pos;
                    if (!this.isValid(pos)) {
                        console.log('invalid bullet', pos);
                        return null;
                    }
                    let left = pos.x * BLOCK_SIZE + (pos.x + 1);
                    let top = pos.y * BLOCK_SIZE + (pos.y + 1);
                    return (
                        <div key={index}
                             className="tk-bullet"
                             style={{
                                 left: left,
                                 top: top,
                                 width: BLOCK_SIZE,
                                 height: BLOCK_SIZE,
                                 backgroundColor: 'red'
                             }}>
                        </div>
                    );
                })}
            </div>
        );
    }

    public fireBulletInCurrentDir() {
        let bullet;
        switch (this.state.dir) {
            case Dir.UP:
                bullet = {
                    pos: {y: this.state.pos.y - 2, x: this.state.pos.x},
                    dir: Dir.UP
                };
                break;
            case Dir.DOWN:
                bullet = {
                    pos: {y: this.state.pos.y + 2, x: this.state.pos.x},
                    dir: Dir.DOWN
                };
                break;
            case Dir.LEFT:
                bullet = {
                    pos: {y: this.state.pos.y, x: this.state.pos.x - 2},
                    dir: Dir.LEFT
                };
                break;
            case Dir.RIGHT:
                bullet = {
                    pos: {y: this.state.pos.y, x: this.state.pos.x + 2},
                    dir: Dir.RIGHT
                };
                break;
        }
        this.state.bullets.push(bullet);
        this.forceUpdate();
    }

    public headOrMoveUp() {
        if (this.state.dir !== Dir.UP) {
            this.setState({dir: Dir.UP});
        } else {
            this.moveUp();
        }
    }

    public headOrMoveDown() {
        if (this.state.dir !== Dir.DOWN) {
            this.setState({dir: Dir.DOWN});
        } else {
            this.moveDown();
        }
    }

    public headOrMoveLeft() {
        if (this.state.dir !== Dir.LEFT) {
            this.setState({dir: Dir.LEFT});
        } else {
            this.moveLeft();
        }
    }

    public headOrMoveRight() {
        if (this.state.dir !== Dir.RIGHT) {
            this.setState({dir: Dir.RIGHT});
        } else {
            this.moveRight();
        }
    }

    public moveUp() {
        if (this.state.pos.y > 1) {
            this.setState({pos: {y: this.state.pos.y - 1, x: this.state.pos.x}});
        }
    }

    public moveDown() {
        if (this.state.pos.y < HEIGHT - 2) {
            this.setState({pos: {y: this.state.pos.y + 1, x: this.state.pos.x}});
        }
    }

    public moveLeft() {
        if (this.state.pos.x > 1) {
            this.setState({pos: {y: this.state.pos.y, x: this.state.pos.x - 1}});
        }
    }

    public moveRight() {
        if (this.state.pos.x < WIDTH - 2) {
            this.setState({pos: {y: this.state.pos.y, x: this.state.pos.x + 1}});
        }
    }

    private isValid(pos: Point): boolean {
        return pos.y >= 0 && pos.y < HEIGHT && pos.x >= 0 && pos.x < WIDTH;
    }

    private startMovingAutomatically(): void {
        callEveryNMs(() => this.autoMove(), 100);
    }

    private startShootingAutomatically() {
       callEveryNMs(() => this.shoot(), 500);
    }

    private startMovingBulletsAutomatically() {
        callEveryNMs(() => this.moveBullets(), 20);
    }

    private autoMove(): boolean {
        let rand = getRandomInteger(1, 10);
        if (rand === 1 || !this.canMoveInCurDirection()) {
            let coinflip = getRandomInteger(0, 1);
            let newDir = (this.state.dir === Dir.UP || this.state.dir === Dir.DOWN)
                ? (coinflip === 0 ? Dir.LEFT : Dir.RIGHT)
                : (coinflip === 0 ? Dir.UP : Dir.DOWN);
                this.setState({dir: newDir});
        } else {
            this.moveInCurrentDirection();
        }

        return true;
    }

    private moveBullets() {
        let newBullets = this.state.bullets.map((bullet => {
            switch (bullet.dir) {
                case Dir.UP:
                    bullet.pos.y--;
                    break;
                case Dir.DOWN:
                    bullet.pos.y++;
                    break;
                case Dir.LEFT:
                    bullet.pos.x--;
                    break;
                case Dir.RIGHT:
                    bullet.pos.x++;
                    break;
            }
            if (!this.isValid(bullet.pos)) {
                return null;
            }
            return bullet;
        })).filter((bullet) => bullet !== null);

        this.setState({bullets: newBullets});
        return true;
    }


    private shoot(): boolean {
        let coinflip = getRandomInteger(1, 2);

        if (coinflip === 1) {
            this.fireBulletInCurrentDir();
        }
        return true;
    }

    private getBlockPositions(): Point[] {
        return tankLayout[this.state.dir].map((pos) => {
            return {
                y: this.state.pos.y + pos.y,
                x: this.state.pos.x + pos.x
            };
        });
    }

    private canMoveInCurDirection() {
        switch (this.state.dir) {
            case Dir.UP:
                return this.state.pos.y > 1;
            case Dir.DOWN:
                return this.state.pos.y < HEIGHT - 2;
            case Dir.LEFT:
                return this.state.pos.x > 1;
            case Dir.RIGHT:
                return this.state.pos.x < WIDTH - 2;
        }
    }

    private moveInCurrentDirection() {
        if (this.state.dir === Dir.UP) {
            this.moveUp();
        } else if (this.state.dir === Dir.DOWN) {
            this.moveDown();
        } else if (this.state.dir == Dir.LEFT) {
            this.moveLeft();
        } else {
            this.moveRight();
        }
    }
}
