'use strict';
import {MAX_ENEMY_NUMBER, MAX_FOOD_NUMBER, CONVERGENCE_RADIUS} from './Config';

export class Motion {
  static enemy(state) {
    for (let j = 0; j < MAX_ENEMY_NUMBER; j++) {
      for (let g in state.players) {
        if (this._radiusVisibility(state.players[g], state.enemies[j], CONVERGENCE_RADIUS)) {
          this.playerMove(state.players[g].x, state.players[g].y, state.enemies[j])
        } else {
          this.playerMove(this._findNearestFoodCoordinate(state.enemies[j], state).x, this._findNearestFoodCoordinate(state.enemies[j], state).y, state.enemies[j])
        }
      }
    }
  }

  static playerMove(coordX, coordY, obj) {
    let xDistance = coordX - obj.x;
    let yDistance = coordY - obj.y;
    let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    if (distance > 0) {
      obj.x += xDistance * obj.acceleration;
      obj.y += yDistance * obj.acceleration;
    }
  }

  static _findNearestFoodCoordinate(enemy, state) {
    let coordinate_x = 1;
    let coordinate_y = 1;
    let newCoordinate_x = 0;
    let newCoordinate_y = 0;
    let numberNearestFood = 0;
    for (let i = 0; i != MAX_FOOD_NUMBER; i++) {
      newCoordinate_x = Math.abs(enemy.x - state.food[i].x);
      newCoordinate_y = Math.abs(enemy.y - state.food[i].y);
      if ((newCoordinate_x < coordinate_x) && (newCoordinate_y < coordinate_y)) {
        coordinate_x = newCoordinate_x;
        coordinate_y = newCoordinate_y;
        numberNearestFood = i;
      }
      if (i == MAX_FOOD_NUMBER - 1) {
        return {x: state.food[numberNearestFood].x, y: state.food[numberNearestFood].y}
      }
    }
  }

  static _radiusVisibility(first_obj, second_obj, radius) {
    return (this._positionRight(first_obj, second_obj, radius) || this._positionLeft(first_obj, second_obj, radius))
      && (this._positionDown(first_obj, second_obj, radius) || this._positionUp(first_obj, second_obj, radius))
  }

  static _positionRight(first_obj, second_obj, radius) {
    if ((first_obj.x - second_obj.x) <= radius && (first_obj.x + second_obj.width / 2 - second_obj.x) > 0)
      return true;
  }

  static _positionLeft(first_obj, second_obj, radius) {
    if ((second_obj.x - first_obj.x) <= radius && (second_obj.x + second_obj.width / 2 - first_obj.x) > 0)
      return true;
  }

  static _positionUp(first_obj, second_obj, radius) {
    if ((second_obj.y - first_obj.y) < radius && (second_obj.y + second_obj.height / 2 - first_obj.y) > 0)
      return true;
  }

  static _positionDown(first_obj, second_obj, radius) {
    if ((first_obj.y - second_obj.y) < radius && (first_obj.y + second_obj.height / 2 - second_obj.y) > 0)
      return true;
  }
}
