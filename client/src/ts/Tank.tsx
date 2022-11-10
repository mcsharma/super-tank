import * as React from "react";
import { Dir, getBlockPositions, isValidPoint, Point } from "./util";
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
    let timer1 = window.setInterval(() => {
      moveBullets(tank.id);
    }, 20);
    let timer2: number | null = null;
    let timer3: number | null = null;
    if (moveType === "auto") {
      timer2 = window.setInterval(() => {
        moveTankAuto(tank.id);
      }, 200);
      timer3 = window.setInterval(() => {
        fireFromTankAuto(tank.id);
      }, 500);
    }
    return () => {
      clearInterval(timer1);
      if (timer2 !== null) {
        clearInterval(timer2);
      }
      if (timer3 !== null) {
        clearInterval(timer3);
      }
    };
  }, []);

  return (
    <div className="tk-tank">
      {getBlockPositions(tank).map((pos) => {
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
              backgroundColor: moveType === "auto" ? tank.id : "white",
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
