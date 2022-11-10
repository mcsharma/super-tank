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
    color: string;
    teamID: string;
    bullets: ReadonlyArray<PointWithDir>;
  }>;

export type GameState = Readonly<{
  dispatch: (action: Action) => void;
  playerTankID: string;
  tanks: Readonly<{ [tankID: string]: TankState }>;
  // Map from string encoded coordinates ("x:y") to Tank ID (tankID)
  bullets: Readonly<{ [key: string]: string }>;
  score: number;
}>;

export const initialState: GameState = {
  dispatch: (action) => {},
  playerTankID: "7",
  tanks: {
    1: {
      id: "1",
      color: "red",
      teamID: "A",
      y: 12,
      x: 12,
      dir: Dir.UP,
      bullets: [],
    },
    2: {
      id: "2",
      color: "yellow",
      teamID: "A",
      y: 12,
      x: 34,
      dir: Dir.DOWN,
      bullets: [],
    },
    3: {
      id: "3",
      color: "green",
      teamID: "A",
      y: 12,
      x: 52,
      dir: Dir.UP,
      bullets: [],
    },
    4: {
      id: "4",
      color: "blue",
      teamID: "A",
      y: 30,
      x: 12,
      dir: Dir.DOWN,
      bullets: [],
    },
    5: {
      id: "5",
      color: "cyan",
      teamID: "A",
      y: 30,
      x: 40,
      dir: Dir.UP,
      bullets: [],
    },
    6: {
      id: "6",
      color: "purple",
      teamID: "A",
      y: 30,
      x: 52,
      dir: Dir.DOWN,
      bullets: [],
    },
    7: {
      id: "7",
      color: "white",
      teamID: "B",
      y: 48,
      x: 37,
      dir: Dir.UP,
      bullets: [],
    },
  },
  bullets: {},
  score: 0,
};
export const GameContext = createContext<GameState>(initialState);
