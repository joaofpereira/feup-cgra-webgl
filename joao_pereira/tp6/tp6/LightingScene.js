var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.wall = new Plane(this);
	this.leftWall = new MyQuad(this, -0.5, 1.5, -0.5, 1.5);
	this.floor = new MyQuad(this, -2.5, 2.5, -3.0, 3.0);
	this.boardA = new Plane(this, BOARD_A_DIVISIONS, -0.25, 1.25, 0, 1);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS);

	this.prism = new MyPrism(this, 8, 20);
	this.cylinder = new MyCylinder(this, 8, 20, true);
	this.lamp = new MyLamp(this, 8, 20);
	this.circle = new MyCircle(this, 4);
	this.clock = new MyClock(this);
	this.paperPlane = new MyPaperPlane(this);
	this.drone = new MyDrone(this);

	// Materials
	this.materialDefault = new CGFappearance(this);

	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setAmbient(0.3,0.3,0.3,1);
	this.slidesAppearance.setDiffuse(0.6,0.6,0.6,1);
	this.slidesAppearance.setSpecular(0.2, 0.2, 0.2, 1);
	this.slidesAppearance.setShininess(30);

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setAmbient(0.3,0.3,0.3,1);
	this.boardAppearance.setDiffuse(0.6,0.6,0.6,1);
	this.boardAppearance.setSpecular(0.8,0.8,0.8,1);
	this.boardAppearance.setShininess(120);

	this.tableAppearance = new CGFappearance(this);
	this.tableAppearance.setAmbient(0.3,0.3,0.3,1);
	this.tableAppearance.setDiffuse(0.6,0.6,0.6,1);
	this.tableAppearance.setSpecular(0.2, 0.2, 0.2, 1);
	this.tableAppearance.setShininess(30);
	
	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setAmbient(0.3, 0.3, 0.3, 1);
	this.floorAppearance.setDiffuse(1.0, 0.69, 0.4, 1);
	this.floorAppearance.setSpecular(0.5, 0.3, 0.2, 1);
	this.floorAppearance.setShininess(60);

	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setAmbient(0.4, 0.4, 0.4, 1);
	this.windowAppearance.setDiffuse(0.6, 1.0, 0.6, 1);
	this.windowAppearance.setSpecular(0.2, 0.4, 0.2, 1);
	this.windowAppearance.setShininess(70);

	this.materialMetal = new CGFappearance(this);
	this.materialMetal.setAmbient(0.5, 0.5, 0.5, 1);
	this.materialMetal.setDiffuse(0.5, 0.5, 0.5, 1);
	this.materialMetal.setSpecular(0.7, 0.7, 0.7, 1);
	this.materialMetal.setShininess(110);

	this.materialBackWall = new CGFappearance(this);
	this.materialBackWall.setAmbient(0.4, 0.7, 0.9, 1);
	this.materialBackWall.setDiffuse(0.4, 0.69, 1.0, 1);
	this.materialBackWall.setSpecular(0.2, 0.3, 0.8, 1);
	this.materialBackWall.setShininess(80);

	this.pillar = new CGFappearance(this);
	this.pillar.setAmbient(0.4, 0.7, 0.9, 1);
	this.pillar.setDiffuse(0.4, 0.69, 1.0, 1);
	this.pillar.setSpecular(0.2, 0.3, 0.8, 1);
	this.pillar.setShininess(80);

	this.clockAppearance = new CGFappearance(this);
	this.clockAppearance.setAmbient(1, 1, 1, 1);
	this.clockAppearance.setDiffuse(1, 1, 1, 1);
	this.clockAppearance.setSpecular(1, 1, 1, 1);
	this.clockAppearance.setShininess(20);

	this.paperAppearance = new CGFappearance(this.scene);
	this.paperAppearance.setAmbient(0.1, 0.1, 0.1, 1);
	this.paperAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
	this.paperAppearance.setSpecular(0.1, 0.1, 0.1, 1);	
	this.paperAppearance.setShininess(30);

	// Textures
	this.enableTextures(true);

	this.tableAppearance.loadTexture("../resources/images/table.png");
	this.floorAppearance.loadTexture("../resources/images/floor.png");
	this.windowAppearance.loadTexture("../resources/images/window.png");
	this.slidesAppearance.loadTexture("../resources/images/slides.png");
	this.boardAppearance.loadTexture("../resources/images/board.png");
	this.pillar.loadTexture("../resources/images/stone.jpg");
	this.clockAppearance.loadTexture('../resources/images/clock.png');

	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	this.setUpdatePeriod(100);

	this.pauseResumeClock = false;
	
	this.speed = 3;

	this.light0 = true;
	this.light1 = true;
	this.light2 = true;
	this.light3 = true;

	this.rotateLeft = false;
	this.rotateRight = false;
	this.moveForward = false;
	this.moveBack = false;

	this.moveSpeed = 0.5;
	this.rotationSpeed = 5;
}

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
}

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0, 0 , 0, 1);

	// Positions for lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true);

	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true);

	this.lights[2].setPosition(10.5, 6.0, 8.0, 1.0);
	this.lights[2].setVisible(true);

	this.lights[3].setPosition(4.0, 6.0, 8.0, 1.0);
	this.lights[3].setVisible(true);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0.3, 0.3, 0.3, 1);
	this.lights[2].setDiffuse(0.6, 0.6, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setConstantAttenuation(0.0);
	this.lights[2].setLinearAttenuation(1.0);
	this.lights[2].setQuadraticAttenuation(0.0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0.4, 0.4, 0.4, 1.0);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setConstantAttenuation(0.0);
	this.lights[3].setLinearAttenuation(0.0);
	this.lights[3].setQuadraticAttenuation(1.0);
	this.lights[3].enable();
}

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}

LightingScene.prototype.update = function(currTime) {
	currTime -= 1000;

	this.lastTime = this.lastTime || 0;

	this.deltaTime = currTime - this.lastTime;
	this.lastTime = currTime;

	if(!this.pauseResumeClock)
		this.clock.update(this.deltaTime);
	//this.paperPlane.update(this.deltaTime);

	if(this.rotateLeft)
		this.drone.rotateLeft(this.rotationSpeed);
	
	if(this.rotateRight)
		this.drone.rotateRight(this.rotationSpeed);

	if(this.moveForward)
		this.drone.moveForward(this.moveSpeed);

	if(this.moveBack)
		this.drone.moveBack(this.moveSpeed);

	// Lights Group Control
	this.light0 ? this.lights[0].enable() : this.lights[0].disable();
	this.light1 ? this.lights[1].enable() : this.lights[1].disable();
	this.light2 ? this.lights[2].enable() : this.lights[2].disable();
	this.light3 ? this.lights[3].enable() : this.lights[3].disable();
}

LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup


	// ---- BEGIN Primitive drawing section

	//Quad
	//this.tableAppearance.apply();
	//this.quad.display();

	// Floor
	this.floorAppearance.apply();
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floor.display();
	this.popMatrix();

	// Left Wall
	this.windowAppearance.apply();
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.leftWall.display();
	this.popMatrix();

	// Plane Wall
	this.materialBackWall.apply();
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.wall.display();
	this.popMatrix();

	// First Table
	/*this.pushMatrix();
		this.translate(5, (3.5/2), 8);
		this.table.display();
	this.popMatrix();*/

	// Second Table
	/*this.pushMatrix();
		this.translate(12, (3.5/2), 8);
		this.table.display();
	this.popMatrix();*/

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);

		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);

		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();

	// Prism
	//this.prism.display();

	// Cylinder
	/*this.pushMatrix();
	this.translate(7, 0, 5);
	this.rotate(-90*degToRad, 1, 0, 0);
	this.scale(1, 1, 4);
	this.pillar.apply();
	this.cylinder.display();
	this.popMatrix();*/

	// Circle
	//this.circle.display();

	// Lamp
	//this.lamp.display();

	this.pushMatrix();
	this.translate(7.2, 7.3, 0);
	this.scale(0.6, 0.6, 0.1);
	this.materialDefault.apply();
	this.clock.display();
	this.popMatrix();

	/*this.pushMatrix();
	this.translate(0, 0.3, 0);
	this.materialDefault.apply();
	this.paperPlane.display();
	this.popMatrix();*/

	this.pushMatrix();
	this.translate(7.5, 0, 7.5);
	this.rotate(210 * degToRad, 0, 1, 0);
	this.materialDefault.apply();
	this.drone.display();
	this.popMatrix();

	// ---- END Primitive drawing section
}

LightingScene.prototype.pauseClock = function() {
	this.pauseResumeClock ? this.pauseResumeClock = false : this.pauseResumeClock = true;
}