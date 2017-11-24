'use strict';
import {
  MAX_ENEMY_NUMBER,
  MAX_FOOD_NUMBER,
  CONVERGENCE_RADIUS,
  SMALL_BALL_SIZE,
  SMALL_BALL_RADIUS,
  ENEMY_SIZE,
  ENEMY_RADIUS,
  ENEMY_ACCELERATION,
  PLAYER_RADIUS,
  PLAYER_SIZE,
  PLAYER_ACCELERATION,
  KEY_FOOD,
  KEY_PLAYERS,
  KEY_ENEMIES
} from './Config';
import {Utils} from './Utils';

export class MovementController {
  moveEnemy(state) {
    for (let j = 0; j < MAX_ENEMY_NUMBER; j++) {
      for (let g of Object.keys(state[KEY_PLAYERS])) {

        if (this._radiusVisibility(state[KEY_PLAYERS][g], state[KEY_ENEMIES][j], CONVERGENCE_RADIUS)) {
          this.movePlayer(state[KEY_PLAYERS][g].x, state[KEY_PLAYERS][g].y, state[KEY_ENEMIES][j])
        } else {
          this.movePlayer(this._findNearestFoodCoordinate(state[KEY_ENEMIES][j], state).x, this._findNearestFoodCoordinate(state[KEY_ENEMIES][j], state).y, state[KEY_ENEMIES][j])
        }
      }
    }
  }

  checkBorder(coord) {
    let newCoord;
    if (coord < 0) {
      newCoord = 0;
    }
    else if (coord > 1) {
      newCoord = 1;
    }
    else {
      newCoord = coord;
    }
    return newCoord;
  }

  movePlayer(coordX, coordY, obj) {
    coordX = this.checkBorder(coordX);
    coordY = this.checkBorder(coordY);
    let xDistance = coordX - obj.x;
    let yDistance = coordY - obj.y;
    let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    if (distance > 0) {
      obj.x += xDistance * obj.acceleration;
      obj.y += yDistance * obj.acceleration;
    }
  }

  foodPositions(food) {
    for (let i = 0; MAX_FOOD_NUMBER - food.length > 0; i++) {
      food.push({
        x: Utils.randomCoordinates(0, 1),
        y: Utils.randomCoordinates(0, 1),
        color: Utils.randomColor(),
        width: SMALL_BALL_SIZE,
        height: SMALL_BALL_SIZE,
        radius: SMALL_BALL_RADIUS,
      })
    }
    return food;
  }

  enemiesPositions(enemies) {
    for (let i = 0; MAX_ENEMY_NUMBER - enemies.length >= 1; i++) {
      enemies.push({
        x: Utils.randomCoordinates(0, 1),
        y: Utils.randomCoordinates(0, 1),
        color: Utils.randomColor(),
        width: ENEMY_SIZE,
        height: ENEMY_SIZE,
        radius: ENEMY_RADIUS,
        acceleration: ENEMY_ACCELERATION,
      })
    }
    return enemies;
  }

  playersPositions(id, state) {
    state[KEY_PLAYERS][id] = {
      x: Utils.randomCoordinates(0, 1),
      y: Utils.randomCoordinates(0, 1),
      radius: PLAYER_RADIUS,
      color: Utils.randomColor(),
      width: PLAYER_SIZE,
      height: PLAYER_SIZE,
      acceleration: PLAYER_ACCELERATION,
    };
  }


  _findNearestFoodCoordinate(enemy, state) {
    let coordinate_x = 1;
    let coordinate_y = 1;
    let newCoordinate_x = 0;
    let newCoordinate_y = 0;
    let numberNearestFood = 0;
    for (let i = 0; i != MAX_FOOD_NUMBER; i++) {
      newCoordinate_x = Math.abs(enemy.x - state[KEY_FOOD][i].x);
      newCoordinate_y = Math.abs(enemy.y - state[KEY_FOOD][i].y);
      if ((newCoordinate_x < coordinate_x) && (newCoordinate_y < coordinate_y)) {
        coordinate_x = newCoordinate_x;
        coordinate_y = newCoordinate_y;
        numberNearestFood = i;
      }
      if (i == MAX_FOOD_NUMBER - 1) {
        return {x: state[KEY_FOOD][numberNearestFood].x, y: state[KEY_FOOD][numberNearestFood].y}
      }
    }
  }

  _radiusVisibility(first_obj, second_obj, radius) {
    return (this._positionRight(first_obj, second_obj, radius) || this._positionLeft(first_obj, second_obj, radius))
      && (this._positionDown(first_obj, second_obj, radius) || this._positionUp(first_obj, second_obj, radius))
  }

  _positionRight(first_obj, second_obj, radius) {
    if ((first_obj.x - second_obj.x) <= radius && (first_obj.x + second_obj.radius / 2 - second_obj.x) > 0)
      return true;
  }

  _positionLeft(first_obj, second_obj, radius) {
    if ((second_obj.x - first_obj.x) <= radius && (second_obj.x + second_obj.radius / 2 - first_obj.x) > 0)
      return true;
  }

  _positionUp(first_obj, second_obj, radius) {
    if ((second_obj.y - first_obj.y) < radius && (second_obj.y + second_obj.radius / 2 - first_obj.y) > 0)
      return true;
  }

  _positionDown(first_obj, second_obj, radius) {
    if ((first_obj.y - second_obj.y) < radius && (first_obj.y + second_obj.radius / 2 - second_obj.y) > 0)
      return true;
  }
}
