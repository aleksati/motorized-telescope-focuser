
// Electronic Telescope Focuser
// Arduino Nano Every + Easy Driver
// Sketch by Aleksander Tidemann
// https://github.com/AleksanderTidemann

#include <AccelStepper.h>

#define EASYDRIVER 1
#define DIR 2
#define STEP 3
#define MS1 4
#define MS2 5
#define EN 6
#define BTN 7
#define SWITCH 8
#define LED 9
#define POT A0

const int STEPS_PER_REV = 1600;
const int MAXSPEED = 150;
float motor_dir = 1; // init motor to CW rotation
float potval;

float potExpo = 0.2; // The lower the potExpo, the more exponentinal the pot becomes
int OrgPotRange = 707;

// Create stepper motor object
AccelStepper focusStepper(EASYDRIVER, STEP, DIR);

void setup()
{
    // Serial
    Serial.begin(9600);

    //  init Motor
    focusStepper.setPinsInverted(true, false, true); // I have to invert the enable pin, for some reason.
    focusStepper.setMaxSpeed(MAXSPEED);              // int for max steps per second.
    focusStepper.setAcceleration(1000);              // int for steps per second during accelration an decelration
    focusStepper.setEnablePin(EN);                   // enableOutputs() == MotorON and disableOutputs() == OFF

    // Set stepper to eigth step; 1600 steps per rev
    // Init light to signal that the arudiono is ready.
    pinMode(MS1, OUTPUT);
    pinMode(MS2, OUTPUT);
    pinMode(LED, OUTPUT);
    digitalWrite(MS1, HIGH);
    digitalWrite(MS2, HIGH);
    digitalWrite(LED, HIGH);

    // Motor Controls
    pinMode(BTN, INPUT_PULLUP);
    pinMode(SWITCH, INPUT);
    if (!digitalRead(SWITCH))
    {
        motor_dir = -1;
    }                                              // set the motor rotation to CCW
    potval = map(analogRead(POT), 707, 0, 150, 0); // init read pot value

    // Motor direction Event handler
    attachInterrupt(digitalPinToInterrupt(SWITCH), changedir, CHANGE);
}

void changedir()
{
    motor_dir = -motor_dir;
}

void loop()
{
    if (!digitalRead(BTN))
    {
        if (analogRead(POT) > 0)
        {
            potval = logPotVal(potExpo, OrgPotRange, MAXSPEED);
            focusStepper.enableOutputs();
            focusStepper.setSpeed(potval * motor_dir); //number of steps per second, times the current durection flag (1 or -1)
            focusStepper.run();
            return;
        }
    }
    focusStepper.disableOutputs();
}

// Convert a linear potentiometer to a desired logatirthmic scale.
float logPotVal(float expo, int actualPotRange, int desiredPotRange)
{
    float norm_pot;
    float result;
    float currPotVal = analogRead(POT);

    norm_pot = ((float)1 / (float)actualPotRange) * currPotVal; // normalize the current pot value.
    norm_pot = (float)1 - norm_pot;                             // invert the normalized range.
    if (norm_pot <= 0)
    {
        return 0;
    }

    result = pow(norm_pot, expo);           // raise the inverted normalized pot value to the power of the chosen exponent.
    result = result * desiredPotRange;      // scale the result to a desired range.
    result = abs(result - desiredPotRange); // Flip the values back to the original (re-invert)
    Serial.println(result);
    return result;
}
