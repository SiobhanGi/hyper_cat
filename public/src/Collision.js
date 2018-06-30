function Collision(bodies) {
  this.player = bodies[0];
  this.otherBodies = bodies.slice(1);
}

Collision.prototype = {
  isCollidingOnTop(player, body) {
    return !(
      this._rightOf(player) <= this._leftOf(body)
      || this._leftOf(player) >= this._rightOf(body)
      || this._bottomOf(player) <= this._topOf(body)
      || this._topOf(player) >= this._topOf(body)
    );
  },

  isCollidingOnBottom(player, body) {
    return !(
      this._rightOf(player) <= this._leftOf(body)
      || this._leftOf(player) >= this._rightOf(body)
      || this._bottomOf(player) <= this._bottomOf(body)
      || this._topOf(player) >= this._bottomOf(body)
    );
  },

  isCollidingOnLeft(player, body) {
    return !(
      this._rightOf(player) <= this._leftOf(body)
      || this._leftOf(player) >= this._leftOf(body)
      || this._bottomOf(player) <= this._topOf(body)
      || this._topOf(player) >= this._bottomOf(body)

    );
  },

  isCollidingOnRight(player, body) {
    return !(
      this._rightOf(player) <= this._rightOf(body)
      || this._leftOf(player) >= this._rightOf(body)
      || this._bottomOf(player) <= this._topOf(body)
      || this._topOf(player) >= this._bottomOf(body)
    );
  },

  resolveCollisions() {
    this.otherBodies.forEach((body) => {
      this._resolveTopCollisions(body);
      this._resolveBottomCollisions(body);
      this._resolveLeftCollisions(body);
    });
  },

  _resolveTopCollisions(body) {
    if (this.isCollidingOnTop(this.player, body)) {
      this.player.resolveTopCollision(this._topOf(body));
    }
  },

  _resolveBottomCollisions(body) {
    if (this.isCollidingOnBottom(this.player, body)) {
      this.player.resolveBottomCollision(this._bottomOf(body));
    }
  },

  _resolveLeftCollisions(body) {
    if (this.isCollidingOnLeft(this.player, body)) {
      this.player.resolveLeftCollision(this._leftOf(body));
    }
  },

  _topOf(object) {
    return object.center.y - object.size.y / 2;
  },

  _bottomOf(object) {
    return object.center.y + object.size.y / 2;
  },

  _leftOf(object) {
    return object.center.x - object.size.x / 2;
  },

  _rightOf(object) {
    return object.center.x + object.size.x / 2;
  }
};

function CollisionFactory() {
  return {
    build: bodies => new Collision(bodies)
  };
}
