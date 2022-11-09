import * as React from "react";
import * as ReactDOM from "react-dom";
import { SuperTankBoard } from "./SuperTankBoard";
import "../css/app.less";
import { GameContext, GameState, initialState } from "./GameContext";
import { useMemo, useReducer } from "react";
import { reducer } from "./reducer";

ReactDOM.render(<Root />, document.getElementById("root"));

function Root() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const context = useMemo(() => ({ ...state, dispatch }), [state, dispatch]);
  return (
    <GameContext.Provider value={context}>
      <SuperTankBoard />
    </GameContext.Provider>
  );
}
