import time
from machine import Pin
import time
from pi_pico_neopixel_tools.led_strip import LedStrip

leds = LedStrip(71 + 8, 15)
hall_sensor = Pin(26, Pin.IN, Pin.PULL_UP)
hall_sensor_pwr = Pin(28, Pin.OUT, 0)

led = Pin("LED", Pin.OUT)
led.value(0)
print("HAL 41 F Hall Effect Sensor Ready")
print("Bring a magnet close to the sensor...")

try:
    while True:
        # The HAL 41 F output goes LOW (0) when a magnetic field is detected
        # for i in range(100):
        #     if hall_sensor.value() == 0:
        #         print("Magnetic field detected!")
        #     else:
        #         print("No magnet present.")
        time.sleep(3)

        led.value((led.value() + 1) % 2)
        # hall_sensor_pwr.value(led.value())

except KeyboardInterrupt:
    print("Program stopped.")
