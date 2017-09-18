/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	__webpack_require__(3);
	var SuperTankBoard_1 = __webpack_require__(7);
	ReactDOM.render(React.createElement(SuperTankBoard_1.SuperTankBoard, null), document.getElementById("root-container"));


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = React;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = ReactDOM;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	var Tank_1 = __webpack_require__(8);
	var config_1 = __webpack_require__(10);
	var util_1 = __webpack_require__(9);
	var SuperTankBoard = /** @class */ (function (_super) {
	    __extends(SuperTankBoard, _super);
	    function SuperTankBoard(props) {
	        var _this = _super.call(this, props) || this;
	        _this.state = {
	            enemyTankInfos: [
	                { dir: util_1.Dir.UP, pos: { y: 40, x: 5 } },
	                { dir: util_1.Dir.DOWN, pos: { y: 20, x: 40 } },
	                { dir: util_1.Dir.UP, pos: { y: 2, x: 5 } },
	                { dir: util_1.Dir.DOWN, pos: { y: 5, x: 40 } }
	            ],
	            selfTankInfo: { dir: util_1.Dir.UP, pos: { y: 48, x: 37 } },
	        };
	        return _this;
	    }
	    SuperTankBoard.prototype.componentDidMount = function () {
	        this.focusBoard();
	    };
	    SuperTankBoard.prototype.componentDidUpdate = function () {
	        this.focusBoard();
	    };
	    SuperTankBoard.prototype.render = function () {
	        var _this = this;
	        var boardWidth = config_1.BLOCK_SIZE * config_1.WIDTH + (config_1.WIDTH + 1);
	        var boardHeight = config_1.BLOCK_SIZE * config_1.HEIGHT + (config_1.HEIGHT + 1);
	        var boardStyle = { width: boardWidth, height: boardHeight };
	        return (React.createElement("div", { className: "ts-arena" },
	            React.createElement("div", { ref: "tkBoard", className: "tk-board", tabIndex: 0, style: boardStyle, onKeyDown: function (event) { return _this.onKeyPress(event.keyCode); } },
	                this.state.enemyTankInfos.map(function (tankInfo, index) {
	                    return React.createElement(Tank_1.Tank, { key: index, dir: tankInfo.dir, pos: tankInfo.pos, onMove: function () { return true; } });
	                }),
	                React.createElement(Tank_1.Tank, { ref: "selfTank", dir: this.state.selfTankInfo.dir, manualMove: true, pos: this.state.selfTankInfo.pos })),
	            React.createElement("div", { className: "tk-game-info" }, "Use arrow keys to move, 'F' to shoot.")));
	    };
	    SuperTankBoard.prototype.focusBoard = function () {
	        ReactDOM.findDOMNode(this.refs.tkBoard).focus();
	    };
	    SuperTankBoard.prototype.onKeyPress = function (keyCode) {
	        if (keyCode === 38) {
	            this.refs.selfTank.headOrMoveUp();
	        }
	        else if (keyCode === 37) {
	            this.refs.selfTank.headOrMoveLeft();
	        }
	        else if (keyCode === 39) {
	            this.refs.selfTank.headOrMoveRight();
	        }
	        else if (keyCode === 40) {
	            this.refs.selfTank.headOrMoveDown();
	        }
	        else if (keyCode === 70) {
	            // Key 'f'
	            this.refs.selfTank.fireBulletInCurrentDir();
	        }
	    };
	    return SuperTankBoard;
	}(React.Component));
	exports.SuperTankBoard = SuperTankBoard;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var React = __webpack_require__(1);
	var util_1 = __webpack_require__(9);
	var config_1 = __webpack_require__(10);
	var Tank = /** @class */ (function (_super) {
	    __extends(Tank, _super);
	    function Tank(props) {
	        var _this = _super.call(this) || this;
	        _this.state = {
	            pos: props.pos,
	            dir: props.dir,
	            bullets: []
	        };
	        return _this;
	    }
	    Tank.prototype.componentDidMount = function () {
	        this.startMovingBulletsAutomatically();
	        if (!this.props.manualMove) {
	            this.startMovingAutomatically();
	            this.startShootingAutomatically();
	        }
	    };
	    Tank.prototype.render = function () {
	        var _this = this;
	        return (React.createElement("div", { className: "tk-tank" },
	            this.getBlockPositions().map(function (pos) {
	                var left = pos.x * config_1.BLOCK_SIZE + (pos.x + 1);
	                var top = pos.y * config_1.BLOCK_SIZE + (pos.y + 1);
	                return (React.createElement("div", { key: pos.y + ':' + pos.x, className: "tk-block", style: {
	                        left: left,
	                        top: top,
	                        width: config_1.BLOCK_SIZE,
	                        height: config_1.BLOCK_SIZE,
	                        backgroundColor: _this.props.manualMove ? 'lightgreen' : 'blue'
	                    } }));
	            }),
	            this.state.bullets.map(function (bullet, index) {
	                var pos = bullet.pos;
	                if (!_this.isValid(pos)) {
	                    console.log('invalid bullet', pos);
	                    return null;
	                }
	                var left = pos.x * config_1.BLOCK_SIZE + (pos.x + 1);
	                var top = pos.y * config_1.BLOCK_SIZE + (pos.y + 1);
	                return (React.createElement("div", { key: index, className: "tk-bullet", style: {
	                        left: left,
	                        top: top,
	                        width: config_1.BLOCK_SIZE,
	                        height: config_1.BLOCK_SIZE,
	                        backgroundColor: 'red'
	                    } }));
	            })));
	    };
	    Tank.prototype.fireBulletInCurrentDir = function () {
	        var bullet;
	        switch (this.state.dir) {
	            case util_1.Dir.UP:
	                bullet = {
	                    pos: { y: this.state.pos.y - 2, x: this.state.pos.x },
	                    dir: util_1.Dir.UP
	                };
	                break;
	            case util_1.Dir.DOWN:
	                bullet = {
	                    pos: { y: this.state.pos.y + 2, x: this.state.pos.x },
	                    dir: util_1.Dir.DOWN
	                };
	                break;
	            case util_1.Dir.LEFT:
	                bullet = {
	                    pos: { y: this.state.pos.y, x: this.state.pos.x - 2 },
	                    dir: util_1.Dir.LEFT
	                };
	                break;
	            case util_1.Dir.RIGHT:
	                bullet = {
	                    pos: { y: this.state.pos.y, x: this.state.pos.x + 2 },
	                    dir: util_1.Dir.RIGHT
	                };
	                break;
	        }
	        this.state.bullets.push(bullet);
	        this.forceUpdate();
	    };
	    Tank.prototype.headOrMoveUp = function () {
	        if (this.state.dir !== util_1.Dir.UP) {
	            this.setState({ dir: util_1.Dir.UP });
	        }
	        else {
	            this.moveUp();
	        }
	    };
	    Tank.prototype.headOrMoveDown = function () {
	        if (this.state.dir !== util_1.Dir.DOWN) {
	            this.setState({ dir: util_1.Dir.DOWN });
	        }
	        else {
	            this.moveDown();
	        }
	    };
	    Tank.prototype.headOrMoveLeft = function () {
	        if (this.state.dir !== util_1.Dir.LEFT) {
	            this.setState({ dir: util_1.Dir.LEFT });
	        }
	        else {
	            this.moveLeft();
	        }
	    };
	    Tank.prototype.headOrMoveRight = function () {
	        if (this.state.dir !== util_1.Dir.RIGHT) {
	            this.setState({ dir: util_1.Dir.RIGHT });
	        }
	        else {
	            this.moveRight();
	        }
	    };
	    Tank.prototype.moveUp = function () {
	        if (this.state.pos.y > 1) {
	            this.setState({ pos: { y: this.state.pos.y - 1, x: this.state.pos.x } });
	        }
	    };
	    Tank.prototype.moveDown = function () {
	        if (this.state.pos.y < config_1.HEIGHT - 2) {
	            this.setState({ pos: { y: this.state.pos.y + 1, x: this.state.pos.x } });
	        }
	    };
	    Tank.prototype.moveLeft = function () {
	        if (this.state.pos.x > 1) {
	            this.setState({ pos: { y: this.state.pos.y, x: this.state.pos.x - 1 } });
	        }
	    };
	    Tank.prototype.moveRight = function () {
	        if (this.state.pos.x < config_1.WIDTH - 2) {
	            this.setState({ pos: { y: this.state.pos.y, x: this.state.pos.x + 1 } });
	        }
	    };
	    Tank.prototype.isValid = function (pos) {
	        return pos.y >= 0 && pos.y < config_1.HEIGHT && pos.x >= 0 && pos.x < config_1.WIDTH;
	    };
	    Tank.prototype.startMovingAutomatically = function () {
	        var _this = this;
	        util_1.callEveryNMs(function () { return _this.autoMove(); }, 100);
	    };
	    Tank.prototype.startShootingAutomatically = function () {
	        var _this = this;
	        util_1.callEveryNMs(function () { return _this.shoot(); }, 500);
	    };
	    Tank.prototype.startMovingBulletsAutomatically = function () {
	        var _this = this;
	        util_1.callEveryNMs(function () { return _this.moveBullets(); }, 20);
	    };
	    Tank.prototype.autoMove = function () {
	        var rand = util_1.getRandomInteger(1, 10);
	        if (rand === 1 || !this.canMoveInCurDirection()) {
	            var coinflip = util_1.getRandomInteger(0, 1);
	            var newDir = (this.state.dir === util_1.Dir.UP || this.state.dir === util_1.Dir.DOWN)
	                ? (coinflip === 0 ? util_1.Dir.LEFT : util_1.Dir.RIGHT)
	                : (coinflip === 0 ? util_1.Dir.UP : util_1.Dir.DOWN);
	            this.setState({ dir: newDir });
	        }
	        else {
	            this.moveInCurrentDirection();
	        }
	        return true;
	    };
	    Tank.prototype.moveBullets = function () {
	        var _this = this;
	        var newBullets = this.state.bullets.map((function (bullet) {
	            switch (bullet.dir) {
	                case util_1.Dir.UP:
	                    bullet.pos.y--;
	                    break;
	                case util_1.Dir.DOWN:
	                    bullet.pos.y++;
	                    break;
	                case util_1.Dir.LEFT:
	                    bullet.pos.x--;
	                    break;
	                case util_1.Dir.RIGHT:
	                    bullet.pos.x++;
	                    break;
	            }
	            if (!_this.isValid(bullet.pos)) {
	                return null;
	            }
	            return bullet;
	        })).filter(function (bullet) { return bullet !== null; });
	        this.setState({ bullets: newBullets });
	        return true;
	    };
	    Tank.prototype.shoot = function () {
	        var coinflip = util_1.getRandomInteger(1, 2);
	        if (coinflip === 1) {
	            this.fireBulletInCurrentDir();
	        }
	        return true;
	    };
	    Tank.prototype.getBlockPositions = function () {
	        var _this = this;
	        return util_1.tankLayout[this.state.dir].map(function (pos) {
	            return {
	                y: _this.state.pos.y + pos.y,
	                x: _this.state.pos.x + pos.x
	            };
	        });
	    };
	    Tank.prototype.canMoveInCurDirection = function () {
	        switch (this.state.dir) {
	            case util_1.Dir.UP:
	                return this.state.pos.y > 1;
	            case util_1.Dir.DOWN:
	                return this.state.pos.y < config_1.HEIGHT - 2;
	            case util_1.Dir.LEFT:
	                return this.state.pos.x > 1;
	            case util_1.Dir.RIGHT:
	                return this.state.pos.x < config_1.WIDTH - 2;
	        }
	    };
	    Tank.prototype.moveInCurrentDirection = function () {
	        if (this.state.dir === util_1.Dir.UP) {
	            this.moveUp();
	        }
	        else if (this.state.dir === util_1.Dir.DOWN) {
	            this.moveDown();
	        }
	        else if (this.state.dir == util_1.Dir.LEFT) {
	            this.moveLeft();
	        }
	        else {
	            this.moveRight();
	        }
	    };
	    return Tank;
	}(React.Component));
	exports.Tank = Tank;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Dir;
	(function (Dir) {
	    Dir[Dir["UP"] = 0] = "UP";
	    Dir[Dir["RIGHT"] = 1] = "RIGHT";
	    Dir[Dir["DOWN"] = 2] = "DOWN";
	    Dir[Dir["LEFT"] = 3] = "LEFT";
	})(Dir = exports.Dir || (exports.Dir = {}));
	/**
	 * Calls a given function. and if it returns true, schedule itself recursively to execute after
	 * given time.
	 * @param {() => boolean} func
	 * @param {number} interval
	 */
	function callEveryNMs(func, interval) {
	    var _this = this;
	    if (func()) {
	        this.timer = setTimeout(function () {
	            _this.callEveryNMs(func, interval);
	        }, interval);
	    }
	}
	exports.callEveryNMs = callEveryNMs;
	function getRandomInteger(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	exports.getRandomInteger = getRandomInteger;
	exports.tankLayout = [
	    [{ y: 0, x: -1 }, { y: 1, x: -1 }, { y: -1, x: 0 }, { y: 0, x: 0 }, {
	            y: 0,
	            x: 1
	        }, { y: 1, x: 1 }],
	    [{ y: -1, x: -1 }, { y: -1, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 1 }, {
	            y: 1,
	            x: -1
	        }, { y: 1, x: 0 }],
	    [{ y: -1, x: -1 }, { y: 0, x: -1 }, { y: 0, x: 0 }, { y: 1, x: 0 }, {
	            y: -1,
	            x: 1
	        }, { y: 0, x: 1 }],
	    [{ y: -1, x: 0 }, { y: -1, x: 1 }, { y: 0, x: -1 }, { y: 0, x: 0 }, {
	            y: 1,
	            x: 0
	        }, { y: 1, x: 1 }]
	];


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.BLOCK_SIZE = 12;
	exports.HEIGHT = 50;
	exports.WIDTH = 75;


/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map