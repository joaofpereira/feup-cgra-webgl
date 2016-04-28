/**
* MyDrone
* @constructor
*/
var degToRad = Math.PI / 180.0;

function MyDrone(scene) {
	CGFobject.call(this, scene);
	
	this.angle = 0;
	this.offsetZ = 0;
	this.offsetX = 0;

	this.initBuffers();
};

MyDrone.prototype = Object.create(CGFobject.prototype);
MyDrone.prototype.constructor = MyDrone;

MyDrone.prototype.initBuffers = function() {
	// BEGIN --- generate vertices
 	this.vertices = [
 	              0.5, 0.3, 0,
 	              -0.5, 0.3, 0,
 	              0, 0.3, 2];
     	
	// BEGIN --- generate indices
	this.indices = [0, 1, 2];

	// BEGIN --- generate normals
	this.normals = [
	               0, 1, 0,
	               0, 1, 0,
	               0, 1, 0];
	
	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

MyDrone.prototype.rotateLeft = function(angle) {
	this.angle += angle;
};

MyDrone.prototype.rotateRight = function(angle) {
	this.angle -= angle;
};

MyDrone.prototype.moveForward = function(offset) {
	this.offsetZ += offset * Math.cos(this.angle * degToRad);
	this.offsetX += offset * Math.sin(this.angle * degToRad);
};

MyDrone.prototype.moveBack = function(offset) {
	this.offsetZ -= offset * Math.cos(this.angle * degToRad);
	this.offsetX -= offset * Math.sin(this.angle * degToRad);
};

MyDrone.prototype.display = function() {
	this.scene.pushMatrix();
	this.scene.translate(this.offsetX, 0, this.offsetZ);
	this.scene.rotate(this.angle * degToRad, 0, 1, 0);
	this.drawElements(this.primitiveType);
	this.scene.popMatrix();
};