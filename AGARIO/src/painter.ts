import {GameObject} from "./object";
import {Food} from "./food";
import {Field} from "./field";
import {FIELD_COLOR, FONT_COLOR, CANVAS_SCALE, X_REVIEW, Y_REVIEW, RESIZE_COEF} from "./config";

export class Painter {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private state = {
        players: null,
        food: null,
        food_length: 0,
        food_width: 0,
        food_radius: 0,
        enemies: null,
        enemies_length: 0,
        enemies_width: 0,
        enemies_radius: 0,
    };
    private movement = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        radius: 0,
    };
    private player: GameObject;
    private field: Field;
    private other_players: GameObject;
    private start: boolean;

    paint(context, canvas, statePlayers, movement, player, field, start, food_length, enemies_length, food, enemies) {
        this.context = context;
        this.canvas = canvas;
        this.state.players = statePlayers;
        this.state.food_length = food_length;
        this.state.enemies_length = enemies_length;
        this.state.food = food;
        this.state.enemies = enemies;

        this.movement = movement;
        this.player = player;
        this.field = field;
        this.start = start;
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        X_REVIEW = this.canvas.width / RESIZE_COEF;
        Y_REVIEW = this.canvas.height / RESIZE_COEF;
        this.context.setTransform(X_REVIEW / this.canvas.width, 0, 0, Y_REVIEW / this.canvas.height, this._gameCameraCoordinates().x, this._gameCameraCoordinates().y);
        this.field.draw(this.context);
        this._drawFood();
        this._drawPlayers();
        this._drawEnemies();
        if (!this.start) {
            this._drawWallpaper();
        }
    }

    _drawWallpaper() {
        this.context.fillStyle = FIELD_COLOR;
        this.context.globalAlpha = 1;
        this.context.fillRect(0, 0, this.canvas.scrollWidth, this.canvas.scrollHeight);
        this.context.fillStyle = FONT_COLOR;
        this.context.font = this.canvas.height * 1 / 7 + 'px lobster';
        this.context.fillText('AGARIO', this.canvas.width * 3 / 10, this.canvas.height * 4 / 10);
        this.context.font = this.canvas.height * 1 / 9 + 'px lobster';
        this.context.fillText('Click to continue', this.canvas.width * 3 / 10, this.canvas.height * 5 / 10);
    }

    _drawPlayers() {
        for (let id in this.state.players) {
            this.other_players = this.state.players[id];
            this.movement.width = this.other_players.width;
            this.movement.height = this.other_players.height;
            this.movement.radius = this.other_players.radius;
            this.context.beginPath();
            this.context.fillStyle = this.other_players.color;
            this.context.arc(this.other_players.x * this.canvas.width, this.other_players.y * this.canvas.height, this.movement.radius * this.canvas.width, 0, Math.PI * 2);
            this.context.fill();
        }
    }

    _drawFood() {
        for (let i = 0; i < this.state.food_length; i++) {
            let food = this.state.food[i];
            food = new Food(this.context, this.canvas, food.x, food.y, food.width, food.height, food.color, food.radius);
            food.draw(this.context);
        }
    }

    _drawEnemies() {
        for (let i = 0; i < this.state.enemies_length; i++) {
            let enemy = this.state.enemies[i];
            enemy = new GameObject(this.context, this.canvas, enemy.x, enemy.y, enemy.width, enemy.height, enemy.color, enemy.radius, enemy.acceleration);
            this.context.beginPath();
            this.context.fillStyle = enemy.color;
            this.context.arc(enemy.x * this.canvas.width, enemy.y * this.canvas.height, enemy.radius * this.canvas.width, 0, Math.PI * 2);
            this.context.fill();
        }
    }

    _gameCameraCoordinates() {
        let cameraX = Math.round((this.canvas.width / CANVAS_SCALE - this.movement.x * this.canvas.width - this.player.width / 2));
        let cameraY = Math.round((this.canvas.height / CANVAS_SCALE - this.movement.y * this.canvas.height - this.player.height / 2));
        return {x: cameraX, y: cameraY}
    }

}