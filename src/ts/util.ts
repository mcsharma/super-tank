import { HEIGHT, WIDTH } from "./config";
import { PointWithDir } from "./GameContext";

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
export function callEveryNMs(func: () => boolean, interval: number): void {
  if (func()) {
    setTimeout(() => {
      callEveryNMs(func, interval);
    }, interval);
  }
}

export function getRandomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isValidPoint(point: PointWithDir): boolean {
  return point.y >= 0 && point.y < HEIGHT && point.x >= 0 && point.x < WIDTH;
}

export const tankLayout: Point[][] = [
  [
    { y: 0, x: -1 },
    { y: 1, x: -1 },
    { y: -1, x: 0 },
    { y: 0, x: 0 },
    {
      y: 0,
      x: 1,
    },
    { y: 1, x: 1 },
  ],
  [
    { y: -1, x: -1 },
    { y: -1, x: 0 },
    { y: 0, x: 0 },
    { y: 0, x: 1 },
    {
      y: 1,
      x: -1,
    },
    { y: 1, x: 0 },
  ],
  [
    { y: -1, x: -1 },
    { y: 0, x: -1 },
    { y: 0, x: 0 },
    { y: 1, x: 0 },
    {
      y: -1,
      x: 1,
    },
    { y: 0, x: 1 },
  ],
  [
    { y: -1, x: 0 },
    { y: -1, x: 1 },
    { y: 0, x: -1 },
    { y: 0, x: 0 },
    {
      y: 1,
      x: 0,
    },
    { y: 1, x: 1 },
  ],
];
