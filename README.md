# chess_mk5

 LET'S OVER-ENGINEER IT and duck AI 

1. local chess server 
   1. web app detects if there's chess board present in local network, connects to it and enables two ppl to play chess with board as server - maybe add clock 
   2. when game is played on chess board - app displays clock with time for every user 
   3. ADD leds around the border of chess board
   4. Buzzers for sound 
   5. Buttons under board are a shit idea
   6. Chess puzzle mode
   7. Animation generation -> based on chess pieces placement the animation params change and thus you can create   

Front end should be written in React-ts so not te be horrific. Now rpi probably could host small app in  html & js, but is not nesesery. Web App that can work both as Board IU and Game Interface. So the approach is I host it on GH, and board redirects to it when user log's in. App on startup tries to connect to board using Local network. And from there we communicate with board back and forward.

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

