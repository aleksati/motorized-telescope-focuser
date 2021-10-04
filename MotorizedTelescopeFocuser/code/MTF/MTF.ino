
// Motorized Telescope Focuser
// Arduino Nano Every + Easy Driver
// By Aleksander Tidemann
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

const int STEPS_PER_REV = 1600; // stepper motor steps per revolution.
const int MAXSPEED = 150;       // the maximum stepper steps per second "allowed".
const float POT_EXPO = 0.2;     // The closer to 0, the more logarithmic the potentiometer curve becomes.
const int POT_RANGE = 707;      // The range of the potentiometer, when read through analogRead();

float motor_dir = 1; // init motor to CW rotation. -1 for CCW
float potval;

// Create stepper motor object
AccelStepper focusStepper(EASYDRIVER, STEP, DIR);

void setup()
{
    // Serial
    Serial.begin(9600);

    //  init Motor
    focusStepper.setPinsInverted(true, false, true); // I have to invert the enable pin, for some reason.
    focusStepper.setMaxSpeed(MAXSPEED);
    focusStepper.setAcceleration(1000); // int determining the frequency of steps during accelration an decelration
    focusStepper.setEnablePin(EN);

    // Set stepper to eigth step; from 200 - 1600 steps per rev
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
    }
    potval = map(analogRead(POT), POT_RANGE, 0, MAXSPEED, 0); // init pot value

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
            potval = logPot(POT_EXPO, POT_RANGE, MAXSPEED);
            focusStepper.enableOutputs();
            // motor_dir is 1 or -1, turning the potval either positive or negative, rotating the motor either CW or CCW.
            focusStepper.setSpeed(potval * motor_dir);
            focusStepper.run();
            return;
        }
    }
    // Disabling the motor (outputs) when the button is "un-pressed" gives me the ability to focus my telescope
    // manually even if the motor is still attached to it.
    focusStepper.disableOutputs();
}

// Give a linear potentiometer a desired logatirthmic curve.
float logPot(float expo, int actualPotRange, int desiredPotRange)
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
    // Serial.println(result);
    return result;
}
