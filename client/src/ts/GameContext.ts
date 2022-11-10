import { createContext } from "react";
import { Action } from "./actions";
import { Dir } from "./util";

export type PointWithDir = Readonly<{
  x: number;
  y: number;
  dir: Dir;
}>;

export type TankState = PointWithDir &
  Readonly<{
    id: string;
    teamID: string;
    bullets: ReadonlyArray<PointWithDir>;
  }>;

export type GameState = Readonly<{
  dispatch: (action: Action) => void;
  playerTankID: string;
  tanks: Readonly<{ [tankID: string]: TankState }>;
  // Map from string encoded coordinates ("x:y") to Tank ID (tankID)
  bullets: Readonly<{ [key: string]: string }>;
}>;

export const initialState: GameState = {
  dispatch: (action) => {},
  playerTankID: "p",
  tanks: {
    red: { id: "red", teamID: "A", y: 40, x: 5, dir: Dir.UP, bullets: [] },
    yellow: {
      id: "yellow",
      teamID: "A",
      y: 20,
      x: 40,
      dir: Dir.DOWN,
      bullets: [],
    },
    green: { id: "green", teamID: "A", y: 2, x: 5, dir: Dir.UP, bullets: [] },
    blue: { id: "blue", teamID: "A", y: 5, x: 40, dir: Dir.DOWN, bullets: [] },
    cyan: { id: "cyan", teamID: "A", y: 5, x: 10, dir: Dir.UP, bullets: [] },
    pink: { id: "pink", teamID: "A", y: 25, x: 30, dir: Dir.DOWN, bullets: [] },
    p: { id: "p", teamID: "B", y: 48, x: 36, dir: Dir.UP, bullets: [] },
  },
  bullets: {},
};
export const GameContext = createContext<GameState>(initialState);
