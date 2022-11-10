import { HEIGHT, WIDTH } from "./config";
import { PointWithDir, TankState } from "./GameContext";

export type Point = {
  y: number;
  x: number;
};

export enum Dir {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}

/**
 * Calls a given function. and if it returns true, schedule itself recursively to execute after
 * given time.
 * @param {() => boolean} func
 * @param {number} interval
 */
export function callEveryNMs(func: () => void, interval: number): () => void {
  func();
  let clearTimerFn: null | (() => void) = null;
  let timer = setTimeout(() => {
    clearTimerFn = callEveryNMs(func, interval);
  }, interval);
  return () => {
    clearTimeout(timer);
    clearTimerFn && clearTimerFn();
  };
}

export function getRandomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isValidPoint(point: PointWithDir): boolean {
  return point.y >= 0 && point.y < HEIGHT && point.x >= 0 && point.x < WIDTH;
}

export function getBlockPositions(
  tank: TankState
): Array<{ x: number; y: number }> {
  return tankLayout[tank.dir].map((pos) => {
    return {
      y: tank.y + pos.y,
      x: tank.x + pos.x,
    };
  });
}

export const tankLayout: Point[][] = [
  [
    // UP
    { y: -1, x: 0 },
    { y: 0, x: -1 },
    { y: 0, x: 0 },
    { y: 0, x: 1 },
    { y: 1, x: -1 },
    { y: 1, x: 1 },
  ],
  [
    // RIGHT
    { y: -1, x: -1 },
    { y: -1, x: 0 },
    { y: 0, x: 0 },
    { y: 0, x: 1 },
    { y: 1, x: -1 },
    { y: 1, x: 0 },
  ],
  [
    // DOWN
    { y: -1, x: -1 },
    { y: -1, x: 1 },
    { y: 0, x: -1 },
    { y: 0, x: 0 },
    { y: 1, x: 0 },
    { y: 0, x: 1 },
  ],
  [
    // LEFT
    { y: -1, x: 0 },
    { y: -1, x: 1 },
    { y: 0, x: -1 },
    { y: 0, x: 0 },
    { y: 1, x: 0 },
    { y: 1, x: 1 },
  ],
];
