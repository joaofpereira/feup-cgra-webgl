/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'speed', -5, 5);

	// Lights Group Checkbox
	var lights = this.gui.addFolder("Lights");

	lights.add(this.scene, 'light0');
	lights.add(this.scene, 'light1');
	lights.add(this.scene, 'light2');
	lights.add(this.scene, 'light3');

	lights.open();

	this.gui.add(this.scene, 'pauseClock');

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
/*MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (65):	// only works for capital 'A', as it is
			console.log("Key 'A' pressed");
	};
};*/

MyInterface.prototype.processKeyDown = function(event) {
	CGFinterface.prototype.processKeyDown.call(this,event);

	switch (event.keyCode)
	{
		case (65):	// only works for capital 'A', as it is
			this.scene.rotateLeft = true;
			console.log("Key 'A' pressed");
			break;
		case (68):	// only works for capital 'D', as it is
			this.scene.rotateRight = true;
			console.log("Key 'D' pressed");
			break;
		case (87):	// only works for capital 'W', as it is
			this.scene.moveForward = true;
			console.log("Key 'W' pressed");
			break;
		case (83):	// only works for capital 'S', as it is
			this.scene.moveBack = true;
			console.log("Key 'S' pressed");
			break;
	};
};

MyInterface.prototype.processKeyUp = function(event) {
	CGFinterface.prototype.processKeyUp.call(this,event);

	switch (event.keyCode)
	{
		case (65):	// only works for capital 'A', as it is
			this.scene.rotateLeft = false;
			console.log("Key 'A' released");
			break;
		case (68):	// only works for capital 'D', as it is
			this.scene.rotateRight = false;
			console.log("Key 'D' released");
			break;
		case (87):	// only works for capital 'W', as it is
			this.scene.moveForward = false;
			console.log("Key 'W' released");
			break;
		case (83):	// only works for capital 'S', as it is
			this.scene.moveBack = false;
			console.log("Key 'S' released");
			break;
	};
};
