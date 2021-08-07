#define DIR 2
#define STEP 3
#define MS1 4
#define MS2 5
#define EN 6
#define BTN_START 7
#define DIR_SWITCH 8
#define LED 9
#define POT_SPEED 0


void setup() {
	
	//  Motor	
	pinMode(DIR, OUTPUT);
	pinMode(STEP, OUTPUT);
	pinMode(MS1, OUTPUT);
	pinMode(MS2, OUTPUT);
	pinMode(EN, OUTPUT);
	pinMode(LED, OUTPUT);
	initPins();
	
	// Motor Controls
	pinMode(BTN_START, INPUT_PULLUP);
	pinMode(DIR_SWITCH, INPUT);

}


void loop() {

	// set the direction of the motor based on the switch state, ON == forward, OFF == backward
	// set the speed of the motor based on the POT signal.
	// set actually move the motor if the the button is HIGH

}


void initPins() { // set default states
	digitalWrite(DIR, LOW);
	digitalWrite(STEP, LOW);
	digitalWrite(MS1, LOW);
	digitalWrite(MS2, LOW);
	digitalWrite(EN, HIGH);
	digitalWrite(LED, HIGH);
}