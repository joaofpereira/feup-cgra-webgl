/**
* MyCylinder
* @constructor
*/
function MyCylinder(scene, slices, stacks) {
	CGFobject.call(this, scene);

	this.slices = slices;
	this.stacks = stacks;

	this.circle = new MyCircle(this.scene, this.slices);

	this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function() {
	// BEGIN --- generate vertices
	var inc = 2.0 * Math.PI / this.slices;
 	var incStack = 1.0 / this.stacks;

 	this.vertices = [];

	for (var n = 0, height = 0; n <= this.stacks; n++, height += incStack) {
		for (var i = 0, alphaInc = 0; i < this.slices; i++, alphaInc += inc) {
			var x = Math.cos(alphaInc);
			var y = Math.sin(alphaInc);

			this.vertices.push(x, y, height);
		}
	}

	// BEGIN --- generate indices
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

	// BEGIN --- generate normals
	this.normals = [], normalsTemplate = []; 

	var normalsTemplate = this.vertices.slice(0, this.slices * 3);

	for (var i = 0; i <= this.stacks; i++)
		this.normals.push.apply(this.normals, normalsTemplate);

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

MyCylinder.prototype.display = function() {
	this.drawElements(this.primitiveType);

	this.scene.pushMatrix();
	this.scene.rotate(Math.PI, 0, 1, 0);
	this.circle.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0, 0, 1);
	this.circle.display();
	this.scene.popMatrix();
};