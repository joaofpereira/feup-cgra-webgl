/**
* MyPaperPlane
* @constructor
*/
function MyPaperPlane(scene) {
	CGFobject.call(this, scene);

	this.initBuffers();

	this.pos = [12, 3.65, 8];
	this.vel = [-3, 0.3, 0];

	this.state = {
		STILL: 0,
		FLYING : 1,
		FALLING : 2,
		DONE : 3
	}

	this.currentState = this.state.STILL;
};

MyPaperPlane.prototype = Object.create(CGFobject.prototype);
MyPaperPlane.prototype.constructor = MyPaperPlane;

MyPaperPlane.prototype.initBuffers = function() {
	var height = 0.1;
	var spread = 0.3;
	var creaseSpread = 0.03;

	// BEGIN --- generate vertices
	this.vertices = [
	0, 0, 1,
	spread, height, 0,
	creaseSpread, height, 0,

	0, 0, 1,
	creaseSpread, height, 0,
	0, 0, 0,
	
	0, 0, 1,
	0, 0, 0,
	-creaseSpread, height, 0,

	0, 0, 1,
	-creaseSpread, height, 0,
	-spread, height, 0
	];

	// BEGIN --- generate indices
	this.indices = [];

	for (var i = 0; i < this.vertices.length / 3; i++)
		this.indices.push(i);

	// BEGIN --- generate normals
	this.normals = [
	0, 1, 0,
	0, 1, 0,
	0, 1, 0,

	-1, 0, 0,
	-1, 0, 0,
	-1, 0, 0,

	1, 0, 0,
	1, 0, 0,
	1, 0, 0,

	0, 1, 0,
	0, 1, 0,
	0, 1, 0
	];

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

MyPaperPlane.prototype.update = function(t) {
	if (this.currentState === this.state.STILL) {
		this.currentState = this.state.FLYING;
	} else {
		this.pos[0] += this.vel[0] * t / 1000;
		this.pos[1] += this.vel[1] * t / 1000;
		this.pos[2] += this.vel[2] * t / 1000;

		if (this.currentState === this.state.FLYING) {
			if (this.pos[0] < 0) {
				this.pos[0] = 0.3;

				this.vel = [0, -5, 0];

				this.currentState = this.state.FALLING;
			}
		} else if (this.currentState === this.state.FALLING) {
			if (this.pos[1] < 0) {
				this.pos[1] = 0;

				this.vel = [0, 0, 0];

				this.currentState = this.state.DONE;
			}
		}
	}
}

MyPaperPlane.prototype.display = function() {
	this.scene.pushMatrix();

	this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);

	if (this.currentState === this.state.FLYING)
		this.scene.rotate(-10 * degToRad, 0, 0, 1);

	if (this.currentState === this.state.FALLING)
		this.scene.rotate(Math.PI / 2, 0, 0, 1);

	this.scene.rotate(-Math.PI / 2, 0, 1, 0);
	this.scene.translate(0, 0, -1);

	this.scene.gl.disable(this.scene.gl.CULL_FACE);
	this.drawElements(this.primitiveType);
	this.scene.gl.enable(this.scene.gl.CULL_FACE);

	this.scene.popMatrix();
}
