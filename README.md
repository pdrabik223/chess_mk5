# chess_mk5

 LET'S OVER-ENGINEER IT and fuck AI 

1. local chess server 
   1. web app detects if there's chess board present in local network, connects to it and enables two ppl to play chess with board as server - maybe add clock 
   2. when game is played on chess board - app displays clock with time for every user 
   3. ADD leds around the border of chess board
   4. Buzzers for sound 
   5. Buttons under board are a shit idea
   6. Chess puzzle mode
   7. Animation generation -> based on chess pieces placement the animation params change and thus you can create   

Front end should be written in React-ts so not te be horrific. Now rpi probably could host small app in  html & js, but is not nesesery. Web App that can work both as Board IU and Game Interface. So the approach is I host it on GH, and board redirects to it when user log's in. App on startup tries to connect to board using Local network. And from there we communicate with board back and forward.

# [c_sdk info](https://www.raspberrypi.com/documentation/microcontrollers/c_sdk.html)

# Web app functionality 
1. User should be logged in with a name, simple cookies based naming will do
2. UI should allow for complete control over board:
   1. changing current animation
   2. displaying current piece detection
   3. changing current cell colors
3. Second screen for 2 player games that require whole board for single player  
4. Coordinated by board 2 player games
 

# Questions
1. how well does the cell lights up
2. what type of magnet should I use     


# Games we can play
1. Chess 
2. Checkers
3. 8*8 Ships
4. 3*3 Tic Tac toe 

# Set up 

## WebApp

1. Project is using vite 
```bash
npm install -g vite
```

2. Install packages
```bash
npm i
```
3. Run application in dev mode
```bash 
npm run dev
```


# Rpi Pi pico Utf's:

[Local Pico W](RPI_PICO_W-20260406-v1.28.0.uf2)

[Pico W](https://micropython.org/download/RPI_PICO_W/) 



# How to connect fronted to board server in local network

Rpi pi pico after connecting to local network is assigned random local ip. Now depending on router used and network settings, it's possible to request mapping between "local host name" and assigned ip address or to lock ip for specific mac adres. This is not always possible or requires local network router configuration. 

This random ip is a problem since our frontend web app needs to know this address in order to send and receive data. This means that board server needs to somehow pass it's IP information to web app running on another device, assuming it's connected to the same network.

Some approaches how to solve this issue:
1. Plain display for user to type into interface. Small or hidden display that shows server IP address.
2. Active RFID antenna that will allow user to scan it with phone and open website with ip provided as param
3. Scan all 255 possible addresses in search of the one specific one 
4. Display some kind of encoded message using board led's for user to type in the interface
5. Make server broadcast it's own IP so it's easily detectable by any app


Connecting a Frontend to a Board Server on a Local Network

When a device connects to a local network, it is assigned a dynamic local IP address via DHCP. Depending on the router configuration, it may be possible to associate a fixed hostname with the device or reserve a static IP address based on its MAC address. However, these options are not always available and often require administrative access to the local network router.

This variability in IP assignment presents a challenge for frontend applications, which need to know the board’s address in order to communicate with its server. As a result, the device must expose its network identity in a way that allows a frontend application running on another device (on the same network) to discover it.

There are few approaches (that I can think of) to passing on the IP address:

1. Manual IP Entry via display
Display the assigned IP address on a built-in screen, so the user can manually enter it into the frontend application.
1. Broadcast direct link to application from board that encodes the device’s IP into connection URL.
2. Network Scanning (Subnet Discovery)
Perform a scan across the local subnet (e.g., all 255 possible IPv4 addresses in a /24 network) to identify the active device based on known ports or response signatures.
1. Set up minimal remote server with static address that board connects to and posts it's IP. Same server can that host web application.
2. Board LEDS Encoding System
Encode the IP address using onboard LEDs, which the user then inputs into the frontend interface.
1. Network Broadcast
Implement a discovery mechanism where the board periodically broadcasts its presence (e.g., via UDP multicast), allowing client to automatically detect and connect to it without manual input.

None of the approaches resolve the initial network provisioning problem. Before the server can operate on a local network, it must first be provided with valid Wi-Fi credentials (SSID and password).

In the current setup, the server is configured with a default, pre-defined SSID and password. The intended workflow is therefore as follows: the user first sets up and connects to this default network, after which the board establishes a connection. The user can then access a configuration interface to input the target network’s SSID and password. Once updated, the board disconnects from the default network and reconnects to the user-selected network.

After this transition, the user must reconnect their device to the same target network and then retrieve the newly assigned IP address of the board in order to establish communication with the frontend application.

Valid characters in wifi password 26 (a-z) + 26 (A-Z) + 10 (0-9) + "_" + " " = 64 -> 2^6. Note: space is not a valid character, but I have space for space so let's add it!
Assuming average wifi password has 32 characters, target value range should be 

Assuming I have 8*8 board and 32 pieces, I have multiple methods of encoding a number:
1. Using all pieces and all cells on the board. Every 2 cells and one pawn ca describe 3 bit number, options are 0: [][] 1: [][x] 2:[x][], since we have 32 of those pars, it's possible to encode 32 bit number in trinary system. That makes **3^32 = 1.85*10^15**, **8.45 liter w haśle**
2. If we instruct player to place one pawn after another, anywhere on the board that makes 63! - 31! = **1.92*10^87** 49 character password
3. If we make user simply move single piece around the board, every position describes number from 0-63, so every move makes one letter of the password. 


