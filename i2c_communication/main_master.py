import time

import machine

status_led = machine.Pin("LED", machine.Pin.OUT).value(1)

if __name__ == "__main__":
    while 1 < 2:
        time.sleep(1)
