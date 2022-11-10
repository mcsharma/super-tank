import { Action, useFireFromTankAuto, useMoveTankAuto } from "./actions";
import { HEIGHT, WIDTH } from "./config";
import { GameState, PointWithDir, TankState } from "./GameContext";
import {
  createNewTank,
  Dir,
  getBlockPositions,
  getRandomInteger,
  isValidPoint,
} from "./util";

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
  const tank = state.tanks[tankID];
  if (!tank) {
    // This tank is dead
    return state;
  }
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
  if (!tank) {
    return state;
  }
  let allBullets = state.bullets;
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
  const positionKey = `${bullet.x}:${bullet.y}`;
  allBullets = { ...allBullets, [positionKey]: tankID };
  return {
    ...state,
    tanks: { ...state.tanks, [tankID]: tank },
    bullets: allBullets,
  };
}

function moveBullets(tankID: string, state: GameState): GameState {
  let updatedTank: TankState | undefined = state.tanks[tankID];
  if (!updatedTank) {
    return state;
  }
  const teamID = updatedTank.teamID;
  let updatedEnemyTank: TankState | null = null;
  let updatedAllBullets = { ...state.bullets };
  let updatedAllTanks = { ...state.tanks };
  let updatedScore = state.score;
  const updatedTankBullets = updatedTank.bullets
    .map((bullet) => {
      const positionKey = `${bullet.x}:${bullet.y}`;
      // Kill the current bullet, if it survive, we'll add it later
      delete updatedAllBullets[positionKey];
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
      // If bullet hit the wall
      if (!isValidPoint(newBullet)) {
        return null;
      }

      const newPositionKey = `${newBullet.x}:${newBullet.y}`;
      const tankIDOfCollidingBullet: string | null =
        updatedAllBullets[newPositionKey];
      const tankIDOfCollidingTank = getTankIDAtPosition(
        newBullet.x,
        newBullet.y,
        state
      );

      // If bullet collides with another bullet
      if (
        tankIDOfCollidingBullet != null &&
        updatedAllTanks[tankIDOfCollidingBullet] != null &&
        updatedAllTanks[tankIDOfCollidingBullet].teamID !== teamID
      ) {
        // Current bullet hit enemy tank's bullet, destry both bullets
        updatedEnemyTank = state.tanks[tankIDOfCollidingBullet];
        delete updatedAllBullets[newPositionKey];
        updatedEnemyTank = {
          ...updatedEnemyTank,
          bullets: updatedEnemyTank.bullets.filter(
            (bullet) => newBullet.x != bullet.x || newBullet.y != bullet.y
          ),
        };
        return null;
      }

      // If bullet collides with enemy's tank
      if (
        tankIDOfCollidingTank != null &&
        updatedAllTanks[tankIDOfCollidingTank] != null &&
        updatedAllTanks[tankIDOfCollidingTank].teamID !== teamID
      ) {
        if (tankIDOfCollidingTank !== state.playerTankID) {
          updatedScore++;
        }
        const collidingTank = updatedAllTanks[tankIDOfCollidingTank];
        collidingTank.bullets.forEach((bullet) => {
          const positionKey = `${bullet.x}:${bullet.y}`;
          delete updatedAllBullets[positionKey];
        });
        delete updatedAllTanks[tankIDOfCollidingTank];
        const newTank = createNewTank(collidingTank.teamID);
        updatedAllTanks[newTank.id] = newTank;
        return null;
      }

      // current bullet survived, add it back.
      updatedAllBullets[newPositionKey] = tankID;
      return newBullet;
    })
    .filter((bullet): bullet is PointWithDir => bullet != null);

  updatedTank = { ...updatedTank, bullets: updatedTankBullets };
  updatedAllTanks[tankID] = updatedTank;
  if (updatedEnemyTank != null) {
    updatedAllTanks[(updatedEnemyTank as TankState).id] = updatedEnemyTank;
  }
  let ret = {
    ...state,
    tanks: updatedAllTanks,
    bullets: updatedAllBullets,
    score: updatedScore,
  };
  return ret;
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

function getTankIDAtPosition(
  x: number,
  y: number,
  state: GameState
): string | null {
  for (let tankID in state.tanks) {
    const tank = state.tanks[tankID];
    const hasCollision = getBlockPositions(tank).some((pos) => {
      return pos.x == x && pos.y == y;
    });
    if (hasCollision) {
      return tankID;
    }
  }
  return null;
}
