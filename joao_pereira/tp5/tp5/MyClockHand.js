/**
* MyClockHand
* @constructor
*/
function MyClockHand(scene, deltaX, deltaY, deltaZ) {
	CGFobject.call(this, scene);

	this.hand = new MyUnitCubeQuad(this.scene);
	this.deltaX = deltaX;
	this.deltaY = deltaY;
	this.deltaZ = deltaZ;

	this.angle = 0;

	this.initBuffers();
};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor = MyClockHand;

MyClockHand.prototype.setAngle = function(angle) {
    this.angle = angle;
};

MyClockHand.prototype.incAngle = function(inc) {
    this.angle += inc;
};

MyClockHand.prototype.display = function() {
    this.scene.rotate(this.angle * (-1) * Math.PI / 180.0, 0, 0, 1);
    this.scene.translate(0, this.deltaY / 2, 1);
    this.scene.scale(this.deltaX, this.deltaY, this.deltaZ);
	this.hand.display();
};
