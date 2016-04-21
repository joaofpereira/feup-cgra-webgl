/**
* MyCylinder
* @constructor
*/
function MyCylinder(scene, slices, stacks, isClosed) {
	CGFobject.call(this, scene);

	this.slices = slices;
	this.stacks = stacks;
	this.isClosed = isClosed;

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
		for (var i = 0, alphaInc = 0; i <= this.slices; i++, alphaInc += inc) {
			var x = Math.cos(alphaInc);
			var y = Math.sin(alphaInc);

			this.vertices.push(x, y, height);
		}
	}

	// BEGIN --- generate indices
	this.indices = [];

	for (var j = 0; j < this.stacks; j++) {
		for (var i = 0; i < this.slices; i++) {
			this.indices.push(i + (j * this.slices) + j, i + (j * this.slices) + j + 1, i + 1 + ((j + 1) * this.slices) + j + 1);
			this.indices.push(i + 1 + ((j + 1) * this.slices) + j + 1, i + ((j + 1) * this.slices) + j + 1,  i + (j * this.slices) + j);
		}
	}

	console.log(this.vertices);
	console.log(this.indices);

	// BEGIN --- generate normals
	this.normals = [], normalsTemplate = []; 

	var normalsTemplate = this.vertices.slice(0, (this.slices + 1) * 3);

	for (var i = 0; i <= this.stacks; i++)
		this.normals.push.apply(this.normals, normalsTemplate);

	// BEGIN --- generate texture coordinates
	this.texCoords = [];

	var deltaS = 1.0 / this.slices, deltaT = 1.0 / this.stacks;

	for (var j = 0; j <= this.stacks; j++)
		for (var i = 0; i <= this.slices; i++)
			this.texCoords.push(deltaS * i, deltaT * j);

	
	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

MyCylinder.prototype.display = function() {
	this.drawElements(this.primitiveType);

	if(this.isClosed) {
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.pillar.apply();
		this.circle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, 0, 1);
		this.scene.pillar.apply();
		this.circle.display();
		this.scene.popMatrix();
	}
};