/**
* MyClock
* @constructor
*/
function MyClock(scene) {
	CGFobject.call(this, scene);

	this.body = new MyCylinder(this.scene, 12, 1, false);
	this.circle = new MyCircle(this.scene, 12);

	this.hours = new MyClockHand(this.scene, 0.045, 0.6, 0.01);
	this.minutes = new MyClockHand(this.scene, 0.025, 0.7, 0.01);
	this.seconds = new MyClockHand(this.scene, 0.0125, 0.8, 0.01);

	this.secondsInc = 360 / 60;
	this.minutesInc = 360 / 60 / 60;
	this.hoursInc = 360 / 60 / 60 / 12;

	this.initBuffers();
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.update = function(time) {
	this.seconds.incAngle(time * this.secondsInc / 1000);
	this.minutes.incAngle(time * this.minutesInc / 1000);
	this.hours.incAngle(time * this.hoursInc / 1000);
}

MyClock.prototype.display = function() {
    this.body.display();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 1);
	this.scene.clockAppearance.apply();
	this.circle.display();
	this.scene.popMatrix();

	this.scene.materialDefault.apply();

	this.scene.pushMatrix();
	this.hours.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.minutes.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.seconds.display();
	this.scene.popMatrix();
};
