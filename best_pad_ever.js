/*
        ██                                                             
      ██                                                               
    ██        █████  █       █      █      █████     ██     ██    █████   
  ██        ██       █       █     █ █     █   ███   █ ██ ██ █  ██     ██ 
██         █         █       █    █   █    █     █   █   █   █        ██  
██         █         █████████    █████    █   ███   █       █    █████   
  ██       █         █       █   █     █   █████     █       █        ██  
    ██      ██       █       █  █       █  █    █    █       █  ██     ██ 
      ██      █████  █       █  █       █  █     █   █       █    █████   
        ██  
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CONTROL PARAMETERs
setCpm(140/4)
const lvl = "0.5"
const viz_params = {height:200, width:1400}

// METRONOME
// $: s("bd:1*4").bank("RolandTR909").room("0.5")
//   .gain(lvl)

setGainCurve(x => Math.pow(x, 2))
samples('github:switchangel/breaks')  //NOTE: breaks are two cycles, so need to divide by 2
samples('github:switchangel/pad')
samples('github:tidalcycles/uzu-drumkit')

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
register('acidenv', (x, pat) => pat.lpf(100)
        .lpenv(x * 9).lps(.2).lpd(.12)
)



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// DRUMS
const break_beat = s("breaks/4")
  .fit()
  .scrub( // Scrub let's you mash together subsections of a sound
    irand(8) // Select random values on the range 1-16
    .div(8) // Divide by 16 (map values between 0 and 1)
    .seg(8)) // Segment this to only choose 8 values on that range
    .rib("<5 4 2 [3 7]>/2", 1) // Choose a segment to loop (seed=15 (15th cycle, loop two cycles))
    .almostNever(ply("2"))


// LINES
const chord_line = note("<e4 b4 g#4 d4 e4 e4 g4 b4>").sound("triangle")
const my_weird_shit = note(
    "<45 47 48 50>/2"
  ).layer(
  x=>x.sound("square").gain(1),
  x=>x.add(note(7)).sound("square").gain(0.8),
  x=>x.add(note(14)).sound("square").gain(0.6),
  x=>x.add(note(21)).sound("square").gain(0.4)
  )
  .fmi(0.15).fmh(1).partials([1,1,1,1,1,1,1,1])


// MELODIES
const plinky_melody = note(
    "<- - [-@2 e4@3 b4@3]@2 <e4 f#4 g#4> - [-@2 d4@4 e4@2]@2 \
    [e4 -] - [-@2 e4@3 b4@3]@2 e4 - [d4 b3] [d4 e4]>*2")
  .sound("gm_celesta")
  // .sound("gm_pad_halo")
  // .sound('piano').add(note(12))
  // ooooo yahhhh this gives it that nice twinkle :)
  .off(1/32, x=>x.add(note(12)).delay("0.5"))
  .off(1/16, x=>x.add(note(24)).vib(0.5).delay("0.6"))
  .off(1/8, x=>x.add(note(36)).vib(1).delay("0.8"))
  .off(1/4, x=>x.add(note(48)).vib(3).delay("1"))
  .sustain("0.2")
  .decay("0.3")
  // .delay("0.5")
  .room("0.7")
  .lpf(1000)

const melody1 = note(
  "<- - [-@2 e4@3 b4@3]@2 g#4 - [f#4 e4] [f#4 g#4] \
    - - [-@2 e4@3 b4@3]@2 e4 - [d4 b3] [f#4 g#4]>*2")
const harmony = note(
  "<- - - - - - - - \
    - - [-@2 e4@3 b4@3]@2 e4 - [d4 e3] [d4 e4]>*2")
const melody = stack(
    melody1.room("0.5"), 
    harmony.pan(0.7).delay("1.5").room("2")
  ).sound("saw")
  // .room("0.5")
  .partials(new Array(18).fill(1))
  .lpf(1000)


// BASS
const bass = note("<e2!2 b2!2 g2!2 f#2!2>")
  .sound("gm_cello")
  .layer(
    x=>x,
    x=>x.add(note(-12))
  )
  .attack("0.15")
  .ply("<1 [1|2] 1 [1|2|6]>")
  .penv(8).panchor(0).pdec(0.05)
  .room(0.25)
  .partials(randL(200))
  .phases(randL(200))


// TREBBLE
const twinkle_chord = note("<- - - - [<f#4 ->,<g#4 g4>,b4] - - ->*2")
  .sound('gm_music_box').add(note(12))
  .release("1.5")
  .attack("0.1")
  .decay("4")
  .sustain("4")


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DJ STATION

_$: chord_line.gain("1".mul(lvl))

_$: twinkle_chord
  .gain(lvl)

_$: bass
  .gain("1.5".mul(lvl))
  .scope(viz_params)

$: plinky_melody
  .gain("1.6".mul(lvl))

_$: melody
  .gain("1.6".mul(lvl))
  // .gain(lvl)

$: my_weird_shit.gain("0.5".mul(lvl))

_$: break_beat
    .gain("0.85".mul(lvl))
    ._scope(viz_params)
