/*
Happy Birthday, Dad! 

You can press play in the top right corner, 
or by holding down control and enter at the same time.
(You can stop by pressing the stop button at the same
place, or by pressing control and period at the same time)

Sorry I can't be there to sing you happy birthday in person, 
but I hope this brings a good energy to the room :)

Have a great day and I'll see you soon!

Love,
Ben

If you want to look at the code, here's what you'll see:
  - At the top, I set the tempo and time signature
  - I then used a bunch of notes that, when viewed as a
    piano roll, will reveal a message. To keep the notes
    from interfering with the song, I set them to an 
    inaudible range (C20 -- about twelve octaves higher 
    than the highest note on the piano)
  - I then coded up some textural elements (chords etc)
  - Last is the melody!
  - After setting all the variables, I call them to play
    using the $: symbol.

  - I left you space at the bottom to fool around and 
    try it out yourself if you want!
    - If you want to fool around: 
      - I set the scale to F3 Major
      - You can use any number to indicate the note number
        on the scale you want to play (e.g. 0 means F, 1 
        means G, 2 means A, 3 means B, etc.)
      - Using the dash character means rest
      - Just make sure the number of beats doesn't change 
        (there should always be 24 beats, whether they are
        notes, i.e. numbers, or rests, i.e. dashes)
    
*/

// SET TEMPO
setCpm(120/4)

// BUILD LETTERS FOR MESSAGE
const H = n(
  "[0,1,2,3,4,5,6,7,8,9,10] \
   5 5 5 5 \
  [0,1,2,3,4,5,6,7,8,9,10] \
  - - -"
)
const A = n(
  "[[[0 1 2 3 4 5 6 7 8 9 10] \
   [- - - - - - - - - - -]], \
   [- - - 5 5 5 5 5 - - -],\
  [[- - - - - - - - - - -] \
   [10 9 8 7 6 5 4 3 2 1 0]]]@12 \
  - - -"
)
const P = n(
  "[0,1,2,3,4,5,6,7,8,9,10] \
   [5,10] [5,10] [5,10] [6,9] \
  [7,8] \
  - - -"
)
const Y = n(
  "[[[10 9 8 7 6 5] \
   [- - - - - - - - - - -]], \
   [- - - - - [4,3,2,1,0] - - - - -],\
  [[- - - - - - - - - - -] \
   [5 6 7 8 9 10]]]@12 \
  - - -"
)
const B = n(
  "[0,1,2,3,4,5,6,7,8,9,10] \
   [0,5,10] [0,5,10] [0,5,10] [1,4,6,9] \
  [2,3,7,8] \
  - - -"
)
const I = n(
  "[0,10] [0,10] [0,10] [0,10] \
  [0,1,2,3,4,5,6,7,8,9,10] \
  [0,10] [0,10] [0,10] [0,10] \
  - - -"
)
const R = n(
  "[0,1,2,3,4,5,6,7,8,9,10] \
   [5,10] [4,3,5,10] [2,5,10] [1,6,9] \
  [0,7,8] \
  - - -"
)
const T = n(
  "10 10 10 10 \
  [0,1,2,3,4,5,6,7,8,9,10] \
  10 10 10 10 \
  - - -"
)
const D = n(
  "[0,1,2,3,4,5,6,7,8,9,10] \
   [0,10]@3 [1,9] [2,8] [3,4,5,6,7] \
  - - -"
)
// DEFINE MESSAGE, SET TO INAUDIBLE SCALE
const message = cat(H.color("red"),
                    A.color("orange"),
                    P.color("yellow"),
                    P.color("green"),
                    Y.color("blue"), 
                    n("-*6"), 
                    B.color("purple"),
                    I.color("red"),
                    R.color("orange"),
                    T.color("green"),
                    H.color("blue"),
                    D.color("purple"),
                    A.color("teal"),
                    Y.color("pink")).scale("C20:Major")
// DISPLAY MESSAGE
$: message.gain("1").punchcard()

// TEXTURE
const twinkle = n(
    "<- - - [-1,1,4,6] - - - - - [0,2,4,7] - -\
      - - - [0,3,5,7] - - - - - [0,2,4,7] - ->*4"
  ).scale("F4:Major")
  // .sound("gm_celesta")
  .sound("gm_pad_halo")
  // .sound('piano').add(note(12))
  .off(1/32, x=>x.add(note(12)).delay("0.5"))
  .off(1/16, x=>x.add(note(24)).vib(0.5).delay("0.6"))
  .off(1/8, x=>x.add(note(36)).vib(1).delay("0.8"))
  .off(1/4, x=>x.add(note(48)).vib(3).delay("1"))
  .sustain("0.2")
  .decay("0.3")
  .room("0.7")
  .lpf(1000)

// CHORDS
const chords = n(
    "<- - [0,2,4,7] [-1,1,4,6]@2 - - - [-1,1,4,6] [0,2,4,7]@2 -\
      - - - [0,3,5,7]@2 - - [0,3,5,7] [0,3,5,7] [0,2,4,7]@2 ->*4"
  ).scale("F3:Major")
  .sound('piano')
  .sustain("0.6")
  .release("0.2")

// MAIN MELODY
const song_complex = n(
  "<5 4 7 [6@3 -]@2 [4@2 4] 5 4 8 [7@3 -]@2 [4@2 4] \
    11 9 7 6 5 [10@2 10] 9 7 8 [7@3 -] - [4@2 4]>*4"
).scale("F3:Major").s('triangle')

const harmony = n(
  "<5 4 9 [8@3 -]@2 [4@2 4] 5 4 10 [9@3 -]@2 [4@2 4] \
    14 12 11 11 10 [12@2 12] 11 9 10 [9@3 -] - [4@2 4]>*4"
).scale("F3:Major").s('gm_voice_oohs').gain(0.4).pan(0.2)

///////////////////////////////////////////////////////////////////////////
// PLAY TIME 

$: song_complex
$: harmony

$: twinkle

$: chords

///////////////////////////////////////////////////////////////////////////
// CHANGE WHATEVER YOU WANT HERE!
$: note(
  "<0 0 0 -1 - - -1 -1 -1 0 - -\
    0 1 2 3 - - 3 2 1 0 - ->*4"
)
.scale("F3:Major")
.sound("gm_electric_guitar_muted")
