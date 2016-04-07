
/** Represents a plane with nrDivs divisions along both axis, with center at (0,0) */
function Plane(scene, nrDivs, minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);

	nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;

	this.nrDivs = nrDivs;
	this.patchLength = 1.0 / nrDivs;

	// this values can exist or not
	this.minS = minS || 0;
	this.maxS = maxS || 1;
	this.minT = minT || 0;
	this.maxT = maxT || 1;

	this.deltaS = (this.maxS - this.minS) / this.nrDivs;
	this.deltaT = (this.maxT - this.minT) / this.nrDivs;

	this.initBuffers();
};

Plane.prototype = Object.create(CGFobject.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.initBuffers = function() {

	// Generate vertices and normals 
	this.vertices = [];
	this.normals = [];
	this.texCoords = [];
	
	var yCoord = 0.5;
	var texT = this.minT;

	for (var j = 0; j <= this.nrDivs; j++) 
	{
		var xCoord = -0.5;
		var texS = this.minS;

		for (var i = 0; i <= this.nrDivs; i++) 
		{
			this.vertices.push(xCoord, yCoord, 0);
			this.texCoords.push(texS, texT);
			
			this.normals.push(0,0,1);

			xCoord += this.patchLength;
			texS += this.deltaS;
		}

		yCoord -= this.patchLength;
		texT += this.deltaT
	}

	this.indices = [];
	var ind = 0;

	for (var j = 0; j < this.nrDivs; j++)  {
		for (var i = 0; i <= this.nrDivs; i++) {
			this.indices.push(ind);
			this.indices.push(ind+this.nrDivs+1);

			ind++;
		}

		if (j+1 < this.nrDivs) {
			this.indices.push(ind+this.nrDivs);
			this.indices.push(ind);
		}
	}
	
	this.primitiveType = this.scene.gl.TRIANGLE_STRIP;

	this.initGLBuffers();
};

