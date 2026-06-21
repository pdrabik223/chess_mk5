import time

import machine

led = machine.Pin("LED", machine.Pin.OUT).value(1)

# i2c = machine.I2C(0, scl=machine.Pin(17), sda=machine.Pin(16))

# devices = i2c.scan()

if __name__ == "__main__":
    while 1 < 2:
        time.sleep(1)

    # if devices:
    #     for d in devices:
    #         print(hex(d))
