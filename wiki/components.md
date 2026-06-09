
# Choosing hall sensor

Quick Comparison Chart 


| **Sensor Type**  | **Output**         | **Magnetic Response**          | **Example Use**            | **Best For**                      | **Limitation**                  |
|:-----------------|:-------------------|:-------------------------------|:---------------------------|:----------------------------------|:--------------------------------|
| Analog Hall      | Analog voltage     | Proportional to field strength | Power supply current sense | Precision analog systems          | Prone to noise, needs filtering |
| Digital Hall     | On/Off             | Switches at set threshold      | Fan or wheel speed detect  | Simple binary detection           | No field strength info          |
| Linear Hall      | Analog voltage     | Tracks linear field change     | Actuator position feedback | Accurate displacement sensing     | Needs precise alignment         |
| Threshold Hall   | On/Off             | Switches at defined point      | Limit switch, gear sensor  | Repetitive or motor motion        | Only on/off response            |
| Ratiometric Hall | Analog (Vcc-based) | Scales with field and Vcc      | Variable current sensing   | Systems with unstable supply      | Affected by power fluctuations  |
| Latching Hall    | Latched on/off     | Toggles with opposing poles    | BLDC motor rotor position  | Stable directional switching      | No field strength feedback      |
| Omni-Polar Hall  | On/Off             | Responds to either pole        | Contactless buttons        | Flexible magnet placement         | Can’t detect polarity           |
| 3D Hall          | X/Y/Z analog       | Multi-axis field sensing       | Joystick, robotics control | Full 3D motion and angle feedback | Complex setup, higher cost      |


[source](https://www.rdncontrols.com/hall-effect-sensor-types/)


|                 **Name**                 | **Type** | **Links**                                                    |
|:----------------------------------------:|:---------|:-------------------------------------------------------------|
|         HAL 49E / SS49E / OH49E          | Linear   |                                                              |
| A3144 / OH3144 / Y3144 TO92 | Digital  | [eLTY.pl](https://elty.pl/pl/p/HALL-EFFECT-SENSOR-A3144/519) |

I need 3.3v one, it should work with lower voltage eiter way, but let's find correct one.

# GPIO extender
Might not be necessary, but here's the link: MCP23017 

# PICO cluster for calculations
This is mainly for shits and giggles. 

Pi Pico W as Led controller, board state reader, web app server, and pico cluster master.

pico has 264 kB of SRAM mem (pico w a little les)


