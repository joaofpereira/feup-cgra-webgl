/**
 * MyHouse
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyHouse(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyHouse.prototype = Object.create(CGFobject.prototype);
MyHouse.prototype.constructor=MyHouse;

MyHouse.prototype.initBuffers = function () {
	this.vertices = [
	        // quad
            -0.5, -0.5, 0,
            0.5, -0.5, 0,
            -0.5, 0.5, 0,
            0.5, 0.5, 0,

            // triangle
            1.0, 0.5, 0,
            -1.0, 0.5, 0,
            0, 1.5, 0
			];

	this.indices = [
	        // quad
            0, 1, 2, 
			3, 2, 1,

			//triangle
			4, 6, 5
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
