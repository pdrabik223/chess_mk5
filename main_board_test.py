import time
from machine import Pin
import time
from pi_pico_neopixel_tools.led_strip import LedStrip, Color

leds = LedStrip(71 + 8, 6)
leds.fill(color=Color.black())

cell_leds = [73, 74, 78, 77]
leds.set_pixel(73, Color.warm_white())
leds.set_pixel(78, Color.warm_white())

hal_prw_line = [
    Pin(2, Pin.OUT, 0),
    Pin(3, Pin.OUT, 0),
]

hal_data_line = [
    Pin(5, Pin.IN, Pin.PULL_UP),
    Pin(4, Pin.IN, Pin.PULL_UP),
]


hal_data = [[1 for _ in range(len(hal_data_line))] for _ in range(len(hal_prw_line))]

new_hal_data = [
    [1 for _ in range(len(hal_data_line))] for _ in range(len(hal_prw_line))
]

led = Pin("LED", Pin.OUT)
led.value(1)

time.sleep(5)
iterator = 0
try:
    while True:
        for pwr in range(len(hal_prw_line)):
            hal_prw_line[pwr].value(1)
            time.sleep(0.01)

            for data in range(len(hal_data_line)):
                value = hal_data_line[data].value()
                new_hal_data[pwr][data] = value
                # print("pwr:", pwr, "data:", data, "val", value)

            hal_prw_line[pwr].value(0)

        changed_list = []
        for pwr in range(len(hal_prw_line)):
            for data in range(len(hal_data_line)):

                if hal_data[pwr][data] != new_hal_data[pwr][data]:
                    changed_list.append([pwr, data])
                    hal_data[pwr][data] = new_hal_data[pwr][data]

        for change in changed_list:
            leds.set_pixel(
                cell_leds[change[0] * 2 + change[1]],
                Color.colors()[iterator],
            )
            iterator += 1 
            iterator %= len(Color.colors())

except KeyboardInterrupt:
    print("Program stopped.")
