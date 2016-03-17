/**
* MyLamp
* @constructor
*/
function MyLamp(scene, slices, stacks) {
	CGFobject.call(this, scene);

	this.slices = slices;
	this.stacks = stacks;

	this.circle = new MyCircle(this.scene, this.slices);

	this.initBuffers();
};

MyLamp.prototype = Object.create(CGFobject.prototype);
MyLamp.prototype.constructor = MyLamp;

MyLamp.prototype.initBuffers = function() {
	// BEGIN --- generate vertices
	var stackInc = Math.PI / 2 / this.stacks; // we rotate only 90 degrees -> stacks
 	var angInc = 2 * Math.PI / this.slices; // we rotate 360 degrees -> slices

 	this.vertices = [];

 	for (var stack = 0, stackAng = 0; stack <= this.stacks; stack++, stackAng += stackInc) {
		var stackZ = Math.sin(stackAng); // factor and z coordinate to the stacks
 		var stackRadius = Math.cos(stackAng); // factor in slices

 		for (var i = 0, ang = 0; i < this.slices; i++, ang += angInc) {
 			var x = Math.cos(ang) * stackRadius;
 			var y = Math.sin(ang) * stackRadius;

 			this.vertices.push(x, y, stackZ);
 		}
 	}

	// BEGIN --- generate indices -- the order of the indexes are also the same as in cylinder
	this.indices = [];

	for (var i = 0; i < this.slices; i++) {
		this.indices.push(i, i + 1, this.slices + i);

		if (i < this.slices - 1)
			this.indices.push(i + 1, this.slices + i + 1, this.slices + i);
		else
			this.indices.push(i + 1 - this.slices, i + 1, i);
	}

	// remaining stacks indices
	var numIndicesPerStack = this.indices.length;
	for (var i = 1; i < this.stacks; i++) {
		var prevStackStart = (i - 1) * numIndicesPerStack;

		for (var j = 0; j < numIndicesPerStack; j++)
			this.indices.push(this.indices[prevStackStart + j] + this.slices);
	}

	// BEGIN --- generate normals --like on clylinder, normals are the same as vertices, but all the vertices
	this.normals = []; 

	this.normals = this.vertices;

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

MyLamp.prototype.display = function() {
	this.drawElements(this.primitiveType);
};