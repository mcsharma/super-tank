import * as React from "react";
import { callEveryNMs, Dir, isValidPoint, Point, tankLayout } from "./util";
import { BLOCK_SIZE } from "./config";
import { TankState } from "./GameContext";
import { useEffect } from "react";
import {
  useFireFromTankAuto,
  useMoveBullets,
  useMoveTankAuto,
} from "./actions";

export type PosAndDir = {
  pos: Point;
  dir: Dir;
};

interface Props {
  tank: TankState;
  moveType: "auto" | "player";
  // onMove?: (position: Point, rotation: Dir) => boolean;
}

export function Tank({ moveType, tank }: Props) {
  const moveBullets = useMoveBullets();
  const moveTankAuto = useMoveTankAuto();
  const fireFromTankAuto = useFireFromTankAuto();
  useEffect(() => {
    callEveryNMs(() => {
      moveBullets(tank.id);
      return true;
    }, 20);
    if (moveType === "auto") {
      callEveryNMs(() => {
        moveTankAuto(tank.id);
        return true;
      }, 100);
      callEveryNMs(() => {
        fireFromTankAuto(tank.id);
        return true;
      }, 500);
    }
  }, []);

  const blockPositions = tankLayout[tank.dir].map((pos) => {
    return {
      y: tank.y + pos.y,
      x: tank.x + pos.x,
    };
  });
  return (
    <div className="tk-tank">
      {blockPositions.map((pos) => {
        let left = pos.x * BLOCK_SIZE + (pos.x + 1);
        let top = pos.y * BLOCK_SIZE + (pos.y + 1);
        return (
          <div
            key={pos.y + ":" + pos.x}
            className="tk-block"
            style={{
              left: left,
              top: top,
              width: BLOCK_SIZE,
              height: BLOCK_SIZE,
              backgroundColor: moveType === "player" ? "lightgreen" : "blue",
            }}
          ></div>
        );
      })}
      {tank.bullets.map((bullet, index) => {
        if (!isValidPoint(bullet)) {
          return null;
        }
        let left = bullet.x * BLOCK_SIZE + (bullet.x + 1);
        let top = bullet.y * BLOCK_SIZE + (bullet.y + 1);
        return (
          <div
            key={index}
            className="tk-bullet"
            style={{
              left: left,
              top: top,
              width: BLOCK_SIZE,
              height: BLOCK_SIZE,
              backgroundColor: "red",
            }}
          ></div>
        );
      })}
    </div>
  );
}
