import { createContext } from "react";
import { Action } from "./actions";
import { Dir } from "./util";

export type PointWithDir = Readonly<{
  x: number;
  y: number;
  dir: Dir;
}>;

export type TankState = Readonly<
  PointWithDir & {
    id: string;
    bullets: ReadonlyArray<PointWithDir>;
  }
>;

export type GameState = Readonly<{
  dispatch: (action: Action) => void;
  playerTankID: string;
  tanks: Readonly<{ [tankID: string]: TankState }>;
}>;

export const initialState: GameState = {
  dispatch: (action) => {},
  playerTankID: "e",
  tanks: {
    a: { id: "a", y: 40, x: 5, dir: Dir.UP, bullets: [] },
    b: { id: "b", y: 20, x: 40, dir: Dir.DOWN, bullets: [] },
    c: { id: "c", y: 2, x: 5, dir: Dir.UP, bullets: [] },
    d: { id: "d", y: 5, x: 40, dir: Dir.DOWN, bullets: [] },
    e: { id: "e", y: 48, x: 37, dir: Dir.UP, bullets: [] },
  },
};
export const GameContext = createContext<GameState>(initialState);
