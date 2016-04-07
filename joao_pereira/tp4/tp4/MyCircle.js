/**
* MyCircle
* @constructor
*/
function MyCircle(scene, slices) {
	CGFobject.call(this, scene);

	this.slices = slices;

	this.initBuffers();
};

MyCircle.prototype = Object.create(CGFobject.prototype);
MyCircle.prototype.constructor = MyCircle;

MyCircle.prototype.initBuffers = function() {
	// BEGIN --- generate vertices
	var inc = 2.0 * Math.PI / this.slices;

 	this.vertices = [0, 0, 0]; // center vertex
 	
    for (var i = 0, alphaInc = 0; i < this.slices; i++, alphaInc += inc) {
        var x = Math.cos(alphaInc);
        var y = Math.sin(alphaInc);

        this.vertices.push(x, y, 0);
    }

	// BEGIN --- generate indices
	this.indices = [];

	for (var i = 0; i < this.slices; i++) {
	   this.indices.push(0, i + 1, i + 1 == this.slices ? 1 : i + 2); // check last vertex
	}

	// BEGIN --- generate normals
	this.normals = [];

	for (var i = 0; i <= this.slices; i++) // remember vertex 0, 0, 0
	   this.normals.push(0, 0, 1);

	this.texCoords = [0.5, 0.5];
	
	for (var i = 0, alphaInc = 0; i < this.slices; i++, alphaInc += inc) {
		var s = Math.cos(alphaInc) * 0.5 + 0.5;
		var t = Math.sin(alphaInc) * 0.5 + 0.5;

		this.texCoords.push(s, t);
	}
	
	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
