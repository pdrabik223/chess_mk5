import time
from machine import Pin

from machine import Pin
import time

# Configure the GPIO pin as an input with a pull-up resistor
# Adjust pin number based on your specific board
hall_sensor = Pin(26, Pin.IN, Pin.PULL_UP)

print("HAL 41 F Hall Effect Sensor Ready")
print("Bring a magnet close to the sensor...")

try:
    while True:
        # The HAL 41 F output goes LOW (0) when a magnetic field is detected
        if hall_sensor.value() == 0:
            print("Magnetic field detected!")
        else:
            print("No magnet present.")
        
        time.sleep(0.5)

except KeyboardInterrupt:
    print("Program stopped.")