import { Action, useFireFromTankAuto, useMoveTankAuto } from "./actions";
import { HEIGHT, WIDTH } from "./config";
import { GameState, PointWithDir, TankState } from "./GameContext";
import { Dir, getRandomInteger, isValidPoint } from "./util";

export function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "turn_or_move":
      return turnOrMove(action.tankID, action.dir, state);
    case "move_tank":
      return moveTank(action.tankID, state);
    case "move_tank_auto":
      return moveTankAuto(action.tankID, state);
    case "fire_from_tank":
      return fireFromTank(action.tankID, state);
    case "fire_from_tank_auto":
      return fireFromTankAuto(action.tankID, state);
    case "move_bullets":
      return moveBullets(action.tankID, state);
    default:
      throw new Error();
  }
}

function turnOrMove(tankID: string, dir: Dir, state: GameState): GameState {
  if (state.tanks[tankID].dir === dir) {
    return moveTank(tankID, state);
  }
  return changeDir(tankID, dir, state);
}

function moveTankAuto(tankID: string, state: GameState) {
  let tank = state.tanks[tankID];
  let rand = getRandomInteger(1, 10);
  if (rand === 1 || !canMoveInCurDirection(tank)) {
    let coinflip = getRandomInteger(0, 1);
    let newDir =
      tank.dir === Dir.UP || tank.dir === Dir.DOWN
        ? coinflip === 0
          ? Dir.LEFT
          : Dir.RIGHT
        : coinflip === 0
        ? Dir.UP
        : Dir.DOWN;
    state = changeDir(tankID, newDir, state);
  } else {
    state = moveTank(tankID, state);
  }
  return state;
}

function fireFromTankAuto(tankID: string, state: GameState): GameState {
  let coinflip = getRandomInteger(1, 2);
  if (coinflip === 1) {
    return state;
  }
  return fireFromTank(tankID, state);
}

function fireFromTank(tankID: string, state: GameState): GameState {
  let tank = state.tanks[tankID];
  let bullet: PointWithDir | null = null;
  switch (tank.dir) {
    case Dir.UP:
      bullet = {
        y: tank.y - 2,
        x: tank.x,
        dir: Dir.UP,
      };
      break;
    case Dir.DOWN:
      bullet = {
        y: tank.y + 2,
        x: tank.x,
        dir: Dir.DOWN,
      };
      break;
    case Dir.LEFT:
      bullet = {
        y: tank.y,
        x: tank.x - 2,
        dir: Dir.LEFT,
      };
      break;
    case Dir.RIGHT:
      bullet = {
        y: tank.y,
        x: tank.x + 2,
        dir: Dir.RIGHT,
      };
      break;
  }
  tank = { ...tank, bullets: [...tank.bullets, bullet] };
  return { ...state, tanks: { ...state.tanks, [tankID]: tank } };
}

function moveBullets(tankID: string, state: GameState): GameState {
  const tank = state.tanks[tankID];
  const newBullets = tank.bullets
    .map((bullet) => {
      const newBullet = { ...bullet };
      switch (bullet.dir) {
        case Dir.UP:
          newBullet.y--;
          break;
        case Dir.DOWN:
          newBullet.y++;
          break;
        case Dir.LEFT:
          newBullet.x--;
          break;
        case Dir.RIGHT:
          newBullet.x++;
          break;
      }
      if (!isValidPoint(newBullet)) {
        return null;
      }
      return newBullet;
    })
    .filter((bullet): bullet is PointWithDir => bullet != null);

  const updatedTank: TankState = {
    ...state.tanks[tankID],
    bullets: newBullets,
  };
  return {
    ...state,
    tanks: {
      ...state.tanks,
      [tankID]: updatedTank,
    },
  };
}

function moveTank(tankID: string, state: GameState): GameState {
  let tank = state.tanks[tankID];
  switch (tank.dir) {
    case Dir.UP:
      if (tank.y > 1) {
        tank = { ...tank, y: tank.y - 1 };
      }
      break;
    case Dir.DOWN:
      if (tank.y < HEIGHT - 2) {
        tank = { ...tank, y: tank.y + 1 };
      }
      break;
    case Dir.LEFT:
      if (tank.x > 1) {
        tank = { ...tank, x: tank.x - 1 };
      }
      break;
    case Dir.RIGHT:
      if (tank.x < WIDTH - 2) {
        tank = { ...tank, x: tank.x + 1 };
      }
      break;
  }
  return {
    ...state,
    tanks: {
      ...state.tanks,
      [tankID]: tank,
    },
  };
}

function changeDir(tankID: string, dir: Dir, state: GameState): GameState {
  let tank = state.tanks[tankID];
  tank = { ...tank, dir };
  return { ...state, tanks: { ...state.tanks, [tankID]: tank } };
}

function canMoveInCurDirection(point: PointWithDir): boolean {
  switch (point.dir) {
    case Dir.UP:
      return point.y > 1;
    case Dir.DOWN:
      return point.y < HEIGHT - 2;
    case Dir.LEFT:
      return point.x > 1;
    case Dir.RIGHT:
      return point.x < WIDTH - 2;
  }
}
