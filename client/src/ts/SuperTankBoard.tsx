import * as React from "react";
import { Tank } from "./Tank";
import { BLOCK_SIZE, HEIGHT, WIDTH } from "./config";
import { Dir, Point } from "./util";
import { useContext, useEffect, useRef, useState } from "react";
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
  const { tanks, playerTankID } = useContext(GameContext);
  const turnOrMoveTank = useTurnOrMoveTank();
  const fireFromTank = useFireFromTank();
  let boardWidth = BLOCK_SIZE * WIDTH + (WIDTH + 1);
  let boardHeight = BLOCK_SIZE * HEIGHT + (HEIGHT + 1);
  let boardStyle = { width: boardWidth, height: boardHeight };

  const selfTankRef = useRef(null);

  const onKeyPress = (keyCode: number) => {
    if (keyCode === 38) {
      turnOrMoveTank(playerTankID, Dir.UP);
    } else if (keyCode === 37) {
      turnOrMoveTank(playerTankID, Dir.LEFT);
    } else if (keyCode === 39) {
      turnOrMoveTank(playerTankID, Dir.RIGHT);
    } else if (keyCode === 40) {
      turnOrMoveTank(playerTankID, Dir.DOWN);
    } else if (keyCode === 70) {
      // Key 'f'
      fireFromTank(playerTankID);
    }
  };

  return (
    <div className="ts-arena">
      <div
        className="tk-board"
        tabIndex={0}
        style={boardStyle}
        onKeyDown={(evt) => onKeyPress(evt.keyCode)}
      >
        {Object.keys(tanks).map((tankID) => {
          return (
            <Tank
              key={tankID}
              moveType={tankID === playerTankID ? "player" : "auto"}
              tank={tanks[tankID]}
            />
          );
        })}
      </div>
      <div className="tk-game-info">Use arrow keys to move, 'F' to shoot.</div>
    </div>
  );
}
