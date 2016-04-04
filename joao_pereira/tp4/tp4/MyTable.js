/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);

	this.cube = new MyUnitCubeQuad(this.scene);
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function () {
	// base
	this.scene.materialWood.apply();

	this.scene.pushMatrix();
	this.scene.translate(0, (3.5/2) + (0.3/2), 0);
    this.scene.scale(5, 0.3, 3);
    this.cube.display();
    this.scene.popMatrix();

	//legs
	this.scene.materialMetal.apply();
	
	// front right
    this.scene.pushMatrix();
    this.scene.translate((5/2) - 0.3, 0, (3/2) - 0.3);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    this.scene.popMatrix();

    // front left
    this.scene.pushMatrix();
    this.scene.translate(((5/2) - 0.3) * (-1), 0, (3/2) - 0.3);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    this.scene.popMatrix();

    // back left
    this.scene.pushMatrix();
    this.scene.translate(((5/2) - 0.3), 0, ((3/2) - 0.3) * (-1));
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    this.scene.popMatrix();

    // back right
    this.scene.pushMatrix();
    this.scene.translate(((5/2) - 0.3) * (-1), 0, ((3/2) - 0.3) * (-1));
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    this.scene.popMatrix();
};
