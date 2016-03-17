/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

 	var inc = 2.0 * Math.PI / this.slices;
 	var incStack = 1.0 / this.stacks;

 	this.vertices = [];

	for (var j = 0, height = 0; j < this.stacks; j++, height += incStack) {
		for (var i = 0, alphaInc = 0; i < this.slices; i++, alphaInc += inc) {
			var x1 = Math.cos(alphaInc);
			var y1 = Math.sin(alphaInc);

			var x2 = Math.cos(alphaInc + inc);
			var y2 = Math.sin(alphaInc + inc);

			this.vertices.push(x1, y1, height);
			this.vertices.push(x1, y1, height + incStack);

			this.vertices.push(x2, y2, height);
			this.vertices.push(x2, y2, height + incStack);
		}
	}

 	this.indices = [];

	for (var j = 0, ind = 0; j < this.stacks; j++) {
		for (var i = 0; i < this.slices; i++, ind += 4) {
			this.indices.push(ind + 1, ind, ind + 2);
			this.indices.push(ind + 1, ind + 2, ind + 3);
		}
	}

 	this.normals = [];
	
	for (var j = 0; j < this.stacks; j++) {
		for (var i = 0, alphaInc = 0; i < this.slices; i++, alphaInc += inc) {
			var temp = alphaInc + (inc / 2.0);
			
			var n_x = Math.cos(temp);
			var n_y = Math.sin(temp);

			this.normals.push(n_x, n_y, 0);
			this.normals.push(n_x, n_y, 0);

			this.normals.push(n_x, n_y, 0);
			this.normals.push(n_x, n_y, 0);
		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
