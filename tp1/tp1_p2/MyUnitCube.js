/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [
	       // base vertices
	       -0.5, -0.5, -0.5,
	       -0.5, -0.5, 0.5,
	        0.5, -0.5, 0.5,
	        0.5, -0.5, -0.5,

	        // top vertices
	       -0.5, 0.5, -0.5,
	       -0.5, 0.5, 0.5,
	        0.5, 0.5, 0.5,
	        0.5, 0.5, -0.5,
			];

	this.indices = [
            // top face
            4, 5, 7,
            5, 6, 7,

            // base face
            0, 2, 1,
            0, 3, 2,

            //front face
            5, 1, 6,
            1, 2, 6,

            //back face
            7, 3, 4,
            3, 0, 4,

            // left face
            4, 0, 5,
            0, 1, 5,

            // right face
            6, 2, 3,
            3, 7, 6
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
