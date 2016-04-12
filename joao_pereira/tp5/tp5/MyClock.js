/**
* MyClock
* @constructor
*/
function MyClock(scene) {
	CGFobject.call(this, scene);

	this.body = new MyCylinder(this.scene, 12, 1, false);
	this.circle = new MyCircle(this.scene, 12);

	this.initBuffers();
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.display = function() {
    this.body.display();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 1);
	this.scene.clockAppearance.apply();
	this.circle.display();
	this.scene.popMatrix();
};
