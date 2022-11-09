import { useContext } from "react";
import { GameContext, PointWithDir } from "./GameContext";
import { Dir } from "./util";

export type Action =
  | {
      type: "turn_or_move";
      tankID: string;
      dir: Dir;
    }
  | {
      type: "move_tank";
      tankID: string;
      dir: Dir;
    }
  | {
      type: "move_tank_auto";
      tankID: string;
    }
  | {
      type: "fire_from_tank";
      tankID: string;
    }
  | {
      type: "fire_from_tank_auto";
      tankID: string;
    }
  | {
      type: "move_bullets";
      tankID: string;
    };

export function useTurnOrMoveTank() {
  const { dispatch } = useContext(GameContext);
  return (tankID: string, dir: Dir) => {
    dispatch({ type: "turn_or_move", tankID, dir });
  };
}

export function useMoveTank() {
  const { dispatch } = useContext(GameContext);
  return (tankID: string, dir: Dir) => {
    dispatch({ type: "move_tank", tankID, dir });
  };
}

export function useMoveTankAuto() {
  const { dispatch } = useContext(GameContext);
  return (tankID: string) => {
    dispatch({ type: "move_tank_auto", tankID });
  };
}

export function useFireFromTank() {
  const { dispatch } = useContext(GameContext);
  return (tankID: string) => {
    dispatch({ type: "fire_from_tank", tankID });
  };
}

export function useFireFromTankAuto() {
  const { dispatch } = useContext(GameContext);
  return (tankID: string) => {
    dispatch({ type: "fire_from_tank_auto", tankID });
  };
}

export function useMoveBullets() {
  const { dispatch } = useContext(GameContext);
  return (tankID: string) => {
    dispatch({ type: "move_bullets", tankID });
  };
}
