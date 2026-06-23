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
const cpm = 120/4
setCpm(cpm)
const key = "G:major"
const lvl = "0.5"
const viz_params = {height:100, width:1500}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMPORTS
samples({
  vox: 'vox_chorus.wav',
}, 'https://raw.githubusercontent.com/kai-xi/music4machines/main/samples/');


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DRUMS
const stack1 = stack(
  s("<- hh - hh - hh - hh>*4").delay("<0.2 0.6>").room("1").bank("RolandTR505"),
  s("bd:1").room("1"),
  s("<- - sh - sh sh - sh - sh - sh sh - sh sh>*16").delay("0.2").vowel("a o e").gain(20)
)

const stack2 = stack(
  s("< - - hh - hh hh - hh - hh - hh hh - hh hh>*16").room("1").bank("RolandTR808"),
  s("bd:1 [- bd:0] - -").room("1"),
  s("< - cp - cp - [cp - - cp] - cp>*4").delay("0.2").room("0.2"),
  s("sh*16").delay("0.2").gain(perlin.range(0.3, 0.7))
)

const stack3 = stack(
  s("<- hh - hh - hh - hh>*4").delay("<0.2 0.6>").room("1").bank("RolandTR505"),
  s("bd:2 - - - [- bd:0] [bd:1 -] [- bd:2] -").room("1"),
  s("- - cp - - - [cp -] -").delay("0.2").room("0.2"),
  s("<- - sh - sh sh - sh - sh - sh sh - sh sh>*16").delay("0.2").vowel("a o e").gain(20)
)

const fill = stack(
  s("[ht ht] [ht -] [- mt] - - [- -mt] [mt mt] [lt lt]").room("0.5").legato("0.75 1"),
  s("[[bd bd] bd [- bd] -] [bd*4 bd*8]").legato(0.2).distort(1).gain(0.5)
)

_DRUMS: arrange(
  [3, stack1],
  [1, fill],
  [3, stack2],
  [1, fill],
  [3, stack3],
  [1, fill],
  [3, stack3],
  [1, fill]
  )
  ._punchcard(viz_params)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CHORDS

const chord1 = n("0,1,2,4,5,6,<8 9>,<12 12 15 12>")
const chord2 = n("-2,0,2,4,5,<6 7>,<- 9 9 [6,8]>,12")
const chord3 = n("-3,1,4,5,<6 5 6 5>")
const chord4 = n("<-7 -8 -6 -5>,-3,1,4, <- 6 5 [5,6]>")

const A = arrange(
  [4, chord1],
  [4, chord2]
  )
const B = arrange(
  [4, chord3],
  [4, chord4]
  )


_CHORDS1: "<0 0 0 0>".slow(8).pick([A, B])
  .struct("<x -> <- x> x - x [- x] [- x] x")
  .scale(key)
  .s("gm_electric_guitar_muted")
  .room("1")
  .delay("0.5")
  .lpf(slider(100,10,100).pow(2))


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BASS
const bass_patt1 = 
      note("<0 - - - - [- 0] [2 4] [6 -]\
             0 0 - - - [- 0] [2 4] [6 -]\
             0 - - - - [- 0] [2 4] [6 -]\
             0 - 0 0 - [- 0] [2 4] [7 -]\
             -2 - - - - [- 2] [4 5] [6 -]\
             -2 -2 - - - [- 2] [2 4] [7 -]\
             -2 - - -2 - [- 2] [2 4] [6 -]\
             -2 -2 - -2 -2 [- 2] [2 4] [7 -]>*8")
  .s("gm_acoustic_bass")
  .gain(3)
  .room("1")
  .scale(key)
  .add(note(-24))

const bass_patt2 = n("<0 - - - [- 0] [0 -] [- 0] - 0 - - - - [0 -] [- 0] ->*8")
  .scale(key)
  .add(note("<0 -3>/4"))
  // .s("gm_clavinet:1")
  .s("gm_acoustic_bass")
  .add(note("-12,-24"))
  // .gain(1.5)
  .gain(3)
  .lpf(slider(100,10,100).pow(2))

_BASS: "<0 1>/8".pick([bass_patt1, bass_patt2])

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INTRO DECK
const intro_chords = A
  .struct("<x -> <- x> x - x [- x] [- x] x")
  .scale(key)
  .s("gm_electric_guitar_muted")
  .delay("0.5")
  .layer(
    x=>x.attack("0.08").release("0.5").room("1").gain(0.7), 
    x=>x.attack("0.20").release("1.0").add(note(12)).gain(0.3).vib("4:0.3").room("2").delay("1.5")
    )
  .lpf(slider(100,10,100).pow(2))

const main_chords = A
  .struct("<x -> <- x> x - x [- x] [- x] x")
  .scale(key)
  .s("gm_electric_guitar_muted")
  .room("1")
  .delay("0.5")
  .lpf(slider(100,10,100).pow(2))

const intro = arrange(
  [7, intro_chords],
  [1, fill],
  [8, stack(main_chords, stack1, bass_patt1)]
)
$: intro // AS SOON AS INTRO IS DONE, NEED TO SWITCH TO MAIN (ENGAGE ^DRUMS^, ^CHORDS^, ^BASS^ INDEPENDENTLY)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PAD

_$: A.struct("<x>")
  .scale(key)
  .s("gm_electric_guitar_muted")
  .delay("0.5")
  .attack("0.20").release("1.0")
  .add(note(12))
  .gain(0.6)
  .vib("4:0.3")
  .room("2")
  .lpf(slider(34.39,10,100).pow(2))
  ._spectrum(viz_params)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TEXTURE

const constant_motion = 
      n("<[4 0 0 0] [4 0 -1 0] [4 0 -1 4] [0 0 4 -1] [-2 0 4 6] [4 5 0 4] [0 4 0 0] [4 0 4 0]\
          [4 0 0 0] [4 0 -1 0] [4 0 -1 4] [0 0 4 -1] [6 7 4 0] [4 0 7 8] [4 2 0 4] [8 9 4 0]>*4")

_RAND: constant_motion
  .scale(key)
  .add(note(12))
  .layer(
    x=>x.s("square").gain(0.5),
    x=>x.s("piano").add(note(12))
  ).lpf(tri.range(30,55).slow(2).pow(2))
  .room("0.5")
  .delay("0.2")
  .lpf(slider(21.88,10,100).pow(2))
  .postgain(lvl.mul("0.75"))
  ._punchcard(viz_params)




_CHIME: n("- - [1,2,4] - - - [1,2,6,8] -")
  .scale(key)
  .s("gm_epiano2")
  .attack("0.02")
  .release("0.7")
  .vib("4:0.3")
  .room("1")
  .lpf(slider(100,10,100).pow(2))
  .gain(1.1)
  ._pitchwheel()


_NA: n("<[4 4] 4 <4 [- 4]> [- 4] - - - ->*8").scale(key)//.s("tri")
  .add(note("0,4,5,<7 9 7 12>,9"))
  // .gain(2)
  .delay("0.75")
  .s("saw")
  .lpf(slider(24.4,10,100).pow(2))
  ._punchcard(viz_params)
  ._scope(viz_params)


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// VOX

const this_is1 = s("vox").slice(16 * 4, "<16 17 18 19 20 21 22 8\
                            16 17 18 19 20 21 22 8\
                            8 17 18 19 20 21 22 0\
                            7 8 9 10 8 9 9 7>*8")
  .label("<this is m u s i c>*4")
  .add(note("40"))
  .gain(2)
  // .layer(
  //   x=>x,
  //   x=>x.add(note("<0 0 0 0 0 3 3 5\
  //                   5 0 0 0 0 3 3 5\
  //                   5 0 0 0 0 3 3 5\
  //                   5 5 5 5 5 5 5 3>*8"))
  // ).gain("<1 2 1 2 1 2 2 2>*2")

_THIS: this_is1
  // .postgain(2)
  .lpf(slider(100,10,100).pow(2))
  ._punchcard({...viz_params, labels:1})

_MUSIC: s("vox").slice(16 * 4, "<7 8 9 10 8 9 9 7>*8")
  .layer(
    x=>x.add(note("40")),
    x=>x.add(note("<- 45>/2")),
    x=>x.add(note("<- 52>")),
    x=>x.add(note("<28@3 21>*4")),
  )
  .gain(2)
  ._punchcard(viz_params)


all(x=>x)


// await initHydra()

// // load an image into a source object
// s0.initVideo('https://media.giphy.com/media/AS9LIFttYzkc0/giphy.mp4')
// // show the image on the screen
// src(s0).out(o0)

// s1.initCam()
// src(s1).scale(2, 1.3, 2).invert().out(o1)

// src(o1).blend(o0, ()=>1-(Math.sin(time/4))**8).out(o2)

// render(o0)

