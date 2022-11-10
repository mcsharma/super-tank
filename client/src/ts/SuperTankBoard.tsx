import * as React from "react";
import { Tank } from "./Tank";
import { BLOCK_SIZE, HEIGHT, WIDTH } from "./config";
import { Dir, Point } from "./util";
import { useContext, useEffect, useRef } from "react";
import { GameContext } from "./GameContext";
import { useFireFromTank, useTurnOrMoveTank } from "./actions";

interface Props {}

interface TankInfo {
  dir: Dir;
  pos: Point;
}

interface State {
  selfTankInfo: TankInfo;
  enemyTankInfos: TankInfo[];
}

export function SuperTankBoard() {
  const { tanks, playerTankID, score } = useContext(GameContext);
  const turnOrMoveTank = useTurnOrMoveTank();
  const fireFromTank = useFireFromTank();
  let boardWidth = BLOCK_SIZE * WIDTH + (WIDTH + 1);
  let boardHeight = BLOCK_SIZE * HEIGHT + (HEIGHT + 1);
  let boardStyle = { width: boardWidth, height: boardHeight };

  useEffect(() => {
    const onKeyDown = ({ key }: KeyboardEvent) => {
      if (key === "ArrowUp") {
        turnOrMoveTank(playerTankID, Dir.UP);
      } else if (key === "ArrowLeft") {
        turnOrMoveTank(playerTankID, Dir.LEFT);
      } else if (key === "ArrowRight") {
        turnOrMoveTank(playerTankID, Dir.RIGHT);
      } else if (key === "ArrowDown") {
        turnOrMoveTank(playerTankID, Dir.DOWN);
      } else if (key === "f") {
        fireFromTank(playerTankID);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="tk-arena">
      <div className="tk-game-info">
        <div>Use arrow keys to move, 'F' to shoot.</div>
        <div>Score: {score}</div>
      </div>
      <div className="tk-board" style={boardStyle}>
        {Object.keys(tanks).map((tankID) => {
          return (
            <Tank
              key={tankID}
              moveType={tankID === playerTankID ? "player" : "auto"}
              tank={tanks[tankID]}
            />
          );
        })}
        {!tanks[playerTankID] ? (
          <div className="tk-game-over">
            <div className="tk-game-over-label">Game Over</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
