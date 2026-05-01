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
const viz_params = {height:100, width:1400}


const drum1 = 
  stack(
    s("[bd:0 hh hh -] [cp - hh -] [bd:0 - hh -] [cp - [cp,hh] <- cp>]"
     ).bank("RolandTR909"),
    s("sh").bank("RolandTR808").fast(16).gain(saw.range(0.3,1).fast(4))
  )

DRUMS: drum1.hpf(slider(10).pow(2))
  .gain(1.5)
  .postgain(lvl)


const bass1 = n("<0 - 0 - -2 - -2 - -4 - -4 - -1 - -1 [-1 0]>*4")
  .scale("C3:Minor")
  .s("supersaw")
  .legato(0.75)

BASS: bass1.layer(
    x=>x,
    x=>x.add(note(-12))
  )
  .lpf(slider(1001.09300).pow(2))
  .gain(2)
  .postgain(lvl)


const pattern1 = n("- 2 1 - 2 1 - 2 1 - 2 1 -4 -2 0")
  // .scale("C4:Minor")
  .s("tri")
const pattern1_harm = n("- 4 3 - 4 3 - 4 3 - 4 3 -2 3 <5 6 8 5>")
  // .scale("C4:Minor")
  .s("tri")

PATTERN: stack(pattern1.lpf(slider(1,1,100).pow(2)), 
               pattern1_harm.lpf(slider(1,1,100).pow(2)))
  .scale("<C4:Minor Bb3:Mixolydian>/2")
  .fm(sine.range(1,4).slow(4))
  .gain(1.5)
  .postgain(lvl)
  


const chords = n("0,2,4").struct("x(3,8,0)@2 [- x] [- x]")
  .scale("C5:Minor@2 <C5:Minor Ab4:Major> Bb4:Major")
  .s("gm_electric_guitar_jazz")
  .release(0.2)
  .legato(1.6)
  
CHORDS: chords
  .lpf(slider(1,1,30).pow(2))
  .gain(1.5)
  .postgain(lvl)


const blink = stack(
  n("0").seg(16).scale("C6:Minor").legato(0.2).attack(0.01).pan(sine.range(1,0)),
  n("0").seg(16).scale("C6:Minor").legato(0.2).attack(0.01)
    .add(note(tri.range(-2,2)))
    .gain(perlin.range(0,1))
    .pan(sine.range(1,0))
)

BLINK: blink
  .lpf(slider(1,1,100).pow(2))
  .gain(1.2)
  .postgain(lvl)

const G6_slow = 
  s("audio").slice(32 * 14, 
                  "<1.5 2.5 3.5 0.5 1.5 2.5 3.5 2.5 3.5 - - 2.5 3.5 - - 0.5>*4")
  .add(note(38))
  .add(note("<0 0 0 [0,5] [0,5] [0,5] [0,7] 0 -1.75 0 0 5 [7,10] 0 0 0>*4"))
  .delay("<0.3@3 1>")
  .add(note("<0 0 0 7>/4"))

const G6_fast = 
  s("audio").slice(32 * 14, 
                  "<1.5 2.5 3.5 0.5 1.5 2.5 3.5 2.5 3.5 - - 2.5 3.5 - - 0.5>*4")
  .add(note(38))
  .add(note("<0 0 0 [0,5] [0,5] [0,5] [0,7] 0 -1.75 0 0 0 -1.75 0 0 0>*4")).fast(2)
  .delay("0.3")
  .add(note("<0 7>/4"))

_VOX: pick([G6_slow, G6_fast], "<0@3 1>/4")

_VOX: arrange(
  [8, G6_slow],
  [8, G6_fast]
)
  .lpf(slider(100,1,100).pow(2))
  .gain(2)
  .postgain(lvl)

_BLIZ: s("audio").slice(32 * 14, 
                  "<5.5 6.5 7.5 8.5 - - - - - - - - - - - ->*4")
                    // "<7.5 8.5 - - - - - - - - - - - 6.5>*4")
  .add(note(38))
  .delay("<0.3@3 1>")
  .add(note("<0 0 0 7>/4"))

_VOX2: s("audio").slice(32 * 14, 
                  "<- - - 10 11 12 13 17.5 18.5 19.5 20.5 21.5 22.5 23.5 24.5 25.5>*4")
  .add(note(38))
  .legato(0.75)
  .delay("0.5")
  .add(note("<0 0 0 7>/4"))

_VOX: s("audio").slice(32 * 14, 
                  "<- - - 28.2 30 31 32 29 34 35 36 37 38 39 40.5 40.5>*4")
  .add(note(38))
  // .legato(0.75)
  .delay("0.5")
  // .add(note("<0 0 0 7>/4"))

NANA: s("audio").slice(32 * 14, 
                  "<40 40 40.5 40.5 [-]@4 39.5 39.5 40.5 40.5 [-]@4>*4")
  .add(note(38))
  .legato(0.75)
  .delay("0.5")
  .jux(off(1, x=>x.add(note("<7 12>/2"))))
  .phaser(2)
  .lpf(slider(1,1,100).pow(2))

