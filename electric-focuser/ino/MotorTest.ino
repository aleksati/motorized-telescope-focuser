// code from https://learn.sparkfun.com/tutorials/easy-driver-hook-up-guide?_ga=2.39140388.689569295.1626355120-1811491594.1626355120

#define STEP 5
#define DIR 6
#define MS1 7
#define MS2 8
#define ENABLE 9


void setup() {
	pinMode(STEP, OUTPUT);
	pinMode(DIR, OUTPUT);
	pinMode(MS1, OUTPUT);
	pinMode(MS2, OUTPUT);
	pinMode(ENABLE, OUTPUT);
	resetEDPins();
	Serial.begin(9600);
	Serial.println("Begin motor control");
	Serial.println();
	Serial.println("Enter number for control option:");
	Serial.println("1. Turn at default microstep mode.");
	Serial.println("2. Reverse direction at default microstep mode.");
	Serial.println("3. Turn at 1/8th microstep mode.");
	Serial.println("4. Step forward and reverse direction.");
	Serial.println();
} 

void loop() {
	while(Serial.avaliable()) {

		user_input = Serial.read();
		digitalWrite(EN, LOW); //pull enable pin to low to allow for motor control
		
		if (user_input == "1") {
			stepforwarddefault();	
		} else if (user_input == "2") {
			reversestepdefault();
		} else if (user_input == "3") {
			smallstepmode();
		} else if (user_input == "4") {
			forwardbackwardstep();
		} else {
			Serial.println("Invalid option entered..");
		}
		resetEDPins();
	}
}


void stepforwarddefault() {
	Serial.println("Moving forward at default step mode.");
	digitalWrite(DIR, LOW); // pull direction pin low to move "forward"
	for (x=0; x<1000; x++) {
		digitalWrite(STEP, HIGH); // move one forward
		delay(1);
		digitalWrite(STEP, LOW);
		delay(1);	
	}
	Serial.println("Enter new option");
	Serial.println();
}


void reversestepdefault() {
	Serial.println("Moving reverse at default step mode.");
	digitalWrite(DIR, HIGH); // pull direction pin high to move "backward"
	for (x=0; x<1000; x++) {
		digitalWrite(STEP, HIGH); // move one forward
		delay(1);
		digitalWrite(STEP, LOW);
		delay(1);	
	}
	Serial.println("Enter new option");
	Serial.println();
}


void smallstepmode() {
	Serial.println("Stepping at 1/8th microstep mode");
	
	digitalWrite(MS1, HIGH);
	digitalWrite(MS2, HIGH); // set to microstep resolution.

	digitalWrite(DIR, LOW); // pull direction pin low to move "forward"
	for (x=0; x<1000; x++) {
		digitalWrite(STEP, HIGH); // move one forward
		delay(1);
		digitalWrite(STEP, LOW);
		delay(1);	
	}
	Serial.println("Enter new option");
	Serial.println();
}


void forwardbackwardstep() {
	Serial.println("Alternate between stepping forward and reverse");
	for (x=1; x<5; x++) {
		state = digitalRead(DIR);
		if (state == HIGH) {
			digitalWrite(DIR, LOW);
		} else if (state == LOW) {
			digitalWrite(DIR, HIGH);
		}
		for (y=0; y<1000; y++) {
			digitalWrite(STEP, HIGH);
			delay(1);
			digitalWrite(STEP, LOW);
			delay(1);
		}
	}
	Serial.println("Enter new option");
	Serial.println();
}

void resetEDPins() {
	digitalWrite(STEP, LOW);
	digitalWrite(DIR, LOW);
	digitalWrite(MS1, LOW);
	digitalWrite(MS2, LOW);
	digitalWrite(ENABLE, HIGH);

}


