const Game = function Game(player, platforms) {
  this.bodies = [player].concat(platforms);
};

Game.prototype = {
  update(gameSize) {
    this.bodies.forEach((body) => {
      body.update(gameSize);
    });
  },

  draw(context, gameSize) {
    context.clearRect(0, 0, gameSize.x, gameSize.y);
    this.bodies.forEach((body) => {
      body.draw(context);
    });
  },
};

function GameFactory() {
  return {
    build: (player = new Player(), platforms = []) => new Game(player, platforms)
  };
}
