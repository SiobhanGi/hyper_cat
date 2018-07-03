describe('Mouse', () => {
  let mouse;
  let context;
  let image;

  beforeEach(() => {
    mouse = new Mouse();
    context = jasmine.createSpyObj('context', ['drawImage']);
    image = new Image();
  });

  describe('update', () => {
    it('has an update function', () => {
      expect(typeof mouse.update).toBe('function');
    });
  });

  describe('draw', () => {
    it('calls function drawImage with correct arguments', () => {
      const playerOffset = 200;
      mouse.draw(context, playerOffset);
      expect(context.drawImage).toHaveBeenCalledWith(
        mouse.image,
        mouse.center.x - mouse.size.x / 2 - playerOffset,
        mouse.center.y - mouse.size.y / 2,
        mouse.size.x,
        mouse.size.y
      );
    });
  });

  describe('resolveCollision', () => {
    it('calls alert when colliding with player', () => {
      spyOn(mouse, '_winScreen');
      mouse.resolveCollision();
      expect(mouse._winScreen).toHaveBeenCalled();
    });
  });
});
