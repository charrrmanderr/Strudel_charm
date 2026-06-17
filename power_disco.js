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
const cpm = 100/4
setCpm(cpm)
const key = "G:major"
const lvl = "0.5"
const viz_params = {height:100, width:1250}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DRUMS

const stack1 = stack(
  s("<bd - - ->*4").bank("RolandTR909").room("1"),
  s("<- - - [- rim]>*4").bank("RolandTR909").room("1").lpf(1500),
  s("sh*8").gain(tri.range(1,0)).room("1"),
  s("<- - [- lt - lt] [- lt lt lt]>*4").bank("RolandTR606").room("0.5").lpf(1000)
)

const stack2 = stack(
  s("<[bd:1*6 [- bd:1]] [- bd:1] [- bd:0*2] ->*4").bank("RolandTR909").room("0.5"),
  s("<- cp - <cp [cp - - cp]>>*4").room("0.3").delay("<0 0 0 0 1 1 1 [1 0]>*2"),
  s("sh").seg(16).legato(2).room("0.4").phaser(0.5)
  )

const stack3 = stack(
  s("bd:1 - - -").bank("RolandTR909").room("1"),
  s("<- bd - - bd bd - - <- bd> bd - - bd bd - ->*16").bank("RolandTR707").distort(1),
  s("<- <cp cp cp [cp cp]>>*8").lpf(40000),
  s("<[- - hh - hh hh hh hh] [hh hh hh hh] [- hh hh hh] [- hh hh hh]>*4").bank("<RolandTR606 RolandTR808>"),
  s("rim").struct("<- - - [x x] - - - - - - - [x <- x>] - <x -> - <<[x x] -> -> - - - - - - - - - - - - - - - ->*16")
    .lpf(4000)
)

const drum_arr = arrange(
  [64, arrange(
        [8, stack1],
        [8, stack2])],
  // [32, arrange(
  //       [8, stack2],
  //       [8, stack3])]
).label("<i l o v e m u s i c>*8")


DRUM: drum_arr.pan(0.55)._punchcard({ ...viz_params, labels: 1 })


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BACKGROUND TEXTURES
const bottle_chords = note("\
          <0 1 -2 1>, \
          <2 4>/2, \
          <4 6 8 6 9 6>")
  .scale(key)
  .s("gm_blown_bottle:2")

const bagpipe_drone = note("<0>/2")
  .scale("E3:Minor")
  .s("gm_bagpipe")
  .gain(0.5)



PAD: bottle_chords._spectrum(viz_params)

DRONE: bagpipe_drone.pan(0.6)._scope(viz_params)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BASSLINES
const acoustic_bass = n("<<0 1> - - <-3!3 4>>*4")
  .scale("E3:Minor")
  .s("gm_fx_rain:3")
  .gain(2)
  .room("1")
  .release(1)
const synth_bass = n("<0!16 1!7 -1!4 -2!4 -3>*16")
  .scale("[E2,E3]:Minor")
  .s("supersaw")
  .legato(0.3)
  .gain(2)

const dark_bass = n("<\
        0 - 0 0 4 0 0 0 - 1 - 1  -  2  0  0 \
        2 2 2 2 1 1 1 1 1 1 1 1 0 0 -2 -3>*16")
  .scale("[E3,E2,E1]:<Minor@3 phrygian>*2")
  .s("supersaw")
  .delay(0.4)
  .velocity("<1 0.8>*16").pan("<0.5 <0.3 0.7>*16>")
  .lpf(2000)
  .legato(1.2)
  .room("1")
  .gain(1.8)

const dark_bass2 = n("<\
        0 - 0 0 4 0 0 0 - 1 - 1  -  2  0  0 \
        2 - 2 2 6 2 2 1 - 1 4 1 4 0 -2 7>*16")
  .scale("[E2,E1]:<Minor@3 phrygian>*2")
  .s("supersaw")
  .delay(0.4)
  .legato(0.8)
  .velocity("<1 0.8>*16").pan("<0.5 <0.3 0.7>*16>")
  .room("0.7")
  .lpf(10000)
  // .lpq(3)
  .gain(2.5)


_BASS: "<0 1 0 0 0 1 [1 0] 1>/8".pick([dark_bass, dark_bass2])
BASS: arrange(
  [64, "<0 1 0 0 0 1 [1 0] 1>/8".pick([acoustic_bass, synth_bass])],
  [32, "<0 1 0 0 0 1 [1 0] 1>/8".pick([dark_bass, dark_bass2])],
  )._scope(viz_params)._spiral()

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TEXTURES
const twinkle_chord_arp = n("<[0 2 4 7 9 11 14 18] - - - [16 14 11 9 6 4 2 1] - - ->*4")
  .scale("E5:Minor")
  .release(2)
  .s("sine")
  .vib("2:0.3")
  .gain(0.25)
TWIN: arrange(
  [2, "-"],
  [6, twinkle_chord_arp.sometimesBy(0.85, ply(0))],
  [6, twinkle_chord_arp],
  [2, twinkle_chord_arp.sometimesBy(0.5, ply(0))]
)._spectrum(viz_params)
// "<0 1>/2".pick(["-", twinkle_chord_arp.sometimesBy(0.85, ply(0))])._spectrum(viz_params)

const punch_chords = n("<[0,2,4,7] - - - - - [0,2,4,7] - - - - - [0,2,4,7] - - - [-1,2,4,6] - - - - - [-1,2,4,6] - - - - - [1,3,6,8] - - ->*16")
  .scale("E3:Minor")
  .s("supersaw")
  .release(0.5)


const punch_chords_var = punch_chords
  .release(0.4)
  .legato(0.2)
  .off(1/16, x=>x)
  .off(1/8, x=>x)
  .gain(1.1)

const punch_chords_var1 = punch_chords_var
  .layer(
    x=>x.s("supersaw").gain(0.5),
    x=>x.s("gm_electric_guitar_muted").crush(4).room("1").gain(0.75)
  )
  .ply("<2 1 0 1>*4")

const punch_chords_var2 = 
  punch_chords_var
  .layer(
    x=>x.s("supersaw").gain(0.5),
    x=>x.s("gm_electric_guitar_muted").crush(4).room("1").gain(0.75)
  )
  .sometimesBy(0.5, ply("<[2 1] 1 0 1>*4"))
  .gain(1.1)

_PUNCH: punch_chords_var._punchcard(viz_params)
PUNCH_ARR: arrange(
  [8, "-"],
  [4, punch_chords], 
  [4, punch_chords_var],
  [8, "-"],
  [8, punch_chords_var1],
  [8, punch_chords_var2],
  [8, "-"],
  [4, punch_chords_var],
  [4, punch_chords],
  [8, punch_chords_var1],
  [8, "-"],
  [4, punch_chords], 
  [4, punch_chords_var],
  [8, "-"],
  [8, punch_chords_var1]
).pan(0.4)._punchcard(viz_params)

const upper = n("<\
     4*4@4 - - 4*4@4 - - 6*4@4 6*4@4 - - 6*4@4 - - 6*4@4\
     7*4@4 - - 7*4@4 - - 7*4@4 6*4@4 - - 6*4@4 - - 8*4@4>*16")
const lower = n("<\
     2*4@4 - - 2*4@4 - - [2 3 2 3]@4 [2 3 3 3]@4 - - 3*4@4 - - 3*4@4\
     [3 4 4 4]@4 - - 4*4@4 - - [4 3 3 3]@4 3*4@4 - - 3*4@4 - - 4*4@4>*16")
const velocity = "<\
     [0 1 1 0]@4 - - [0 1 1 0]@4 - - [0 1 1 0]@4 [0 1 1 0]@4 - - [0 1 1 0]@4 - - [0 1 1 0]@4\
     [0 1 1 0]@4 - - [0 1 1 0]@4 - - [0 1 1 0]@4 [0 1 1 0]@4 - - [0 1 1 0]@4 - - [0 1 1 0]@4>*16".pick([1, 0.7])


const power_stack = stack(upper, lower)
  .scale("E3:Minor")
  .s("saw")
  .release(0.4)
  .legato(0.2)
  .velocity(velocity)
  .gain(1.1)
  .room("1")
  //.lpf(slider(1,1,100).pow(2))
POWER_STACK: arrange(
  [16, "-"],
  [32, power_stack],
  [8, "-"],
  [8, power_stack],
  [8, "-"],
  [8, power_stack],
  [8, "-"],
  [8, power_stack],
)
  // .transpose("0,12")
  ._pianoroll(viz_params)

const ctrl_ptrn = "<2 1 1 2 1 1 2 1 1 2 1 1 3 1 1 ->*16"
const mini_alt = 
  n(ctrl_ptrn)
  .gain(ctrl_ptrn.pow(0.5).mul(0.8))
  .scale("E5:Minor")
  .s("tri")
  .add(note("<0 [0,12]>/4"))
  // MORE EFFECTS: COMMENT IN BELOW
  // .legato(ctrl_ptrn.div(3))
  // .sometimesBy(0.2, x=>x.ply("2"))
_MINI: mini_alt._punchcard(viz_params)







const bubble = n("<3 - 2 4 - 2 - <- 3> - <- 2> - <- 4> - <- 2> - ->*16").scale("E5:Minor")
  .s("tri")
  .layer(x=>x//,
         // x=>x.off(1/2, add(note(-12)))
        )
  .crush(5)
  .room("0.5")
  .attack(0.2)
  .vib("2:0.1")
  .lpf(1000)
  .lpq(2)
  .release(0.5)
  .delay("0.25")
_BUBBLE: bubble._punchcard(viz_params)


const voice1 = n("<4 - - 6 3 - [- - [9] [8]] [- [6] - -]>*4")
const voice2 = n("<2 - - 3 1 - [- - [9] [8]] [- [6] - -]>*4")
const voice3 = n("<4 - - 6 3 - [- - 11 10] [- [8,9] - -]>*4")
const voices = stack(
    voice1,
    voice2,
    voice3
  )
  .scale("E5:Minor")
  // .gain(0.8)
  // .s("tri")
  .s("gm_epiano1:2")
  .delay(0.8)
  .room("2")
_VOICES: voices._punchcard(viz_params)

const ctvox1 = n("<0 - - 1 2 - [- - - -] [4 -]>*4")
const ctvox2 = n("<4 - - 6 3 - [- - - -] [6 -]>*4").velocity(0.3)
const contravox = stack(
    ctvox1,
    ctvox2
  )
  .gain(0.5)
  .scale("E3,E4:Minor")
  // .s("gm_epiano1:10")
  .s("supersaw")
  .lpf(20000)
  .release(0.4)
  .room("1")
  // .gain(0.85)
_CONTRAVOX: contravox._punchcard(viz_params)
_ALLVOX: arrange(
  [4, "-"],
  [4, voices],
  [8, stack(voices, contravox)],
  [4, "-"],
  [4, voices],
  [8, stack(voices, contravox)],
  [8, "-"]
)._punchcard(viz_params)


const bg_twin = n("<- - - - - - [- - 11 10] [9 8 7 -]>*4")
  .scale("E5:Minor")
  .s("gm_epiano1:8")
  .delay(2)
  .room("2")
  .gain(0.5)
_BG_TWIN: bg_twin._pitchwheel()


_$: n("<[0,-5]!2 -!2 [1,-5] - [2,-2] [1,-3]>*4")
  .ply("4")
  .scale("E3,E4:<Minor Phrygian>*2")
  .s("supersaw")
  .delay("0.35")
  .legato(0.4)
  .gain(2)
  

const doot = n("<3 - <- -1> 4 3 - - <- -1 [- 2]>>*4")
  .scale("E5:Minor")
  .gain(1.5)
  .ply("2")
  .off(1/16, x=>x.add(note(12)).lpf(1000).gain(0.5))
  .s("piano")
  .delay("1")
  .room("1")
_DOOT: "<0 1 0>/8".pick(["-", doot])._punchcard(viz_params)
  

const chvx = n("<[0,2,3]@2 - [1,4,6] [-1,1,2]@2 - [0,2,4]>*4")
  .scale("E4:Minor")
  .s("gm_pad_warm:<0 1>/4")
  .release(0.5)
  .phaser("<2 3 1>*2")
  .gain("2")
const chopchvx1 = n("<[0,2,3]@(3,8,0) - [1,4,6] [-1,1,2]@(3,8,0) - [0,2,4]>*4")
  .scale("E4:Minor")
  .s("supersaw")
  .legato(0.5)
  .off(1/16, x=>x)
  .phaser("<2 3 1>*2")
  .gain("2")
const chopchvx2 = n("<- - - [3 2 3 4] [3 - - 3] - - ->*4").velocity(1.5)
  .scale("E4:Minor")
  .s("supersaw")
  .legato(0.5)
  .off(1/16, x=>x)
  .phaser("<2 3 1>*2")
  .gain("2")

_CHVX: arrange(
  [8, chvx._scope(viz_params)],
  [4, stack(
    chvx._scope(viz_params), 
    chopchvx1._scope(viz_params))],
  [4, stack(
    chvx._scope(viz_params), 
    chopchvx1._scope(viz_params), 
    chopchvx2._scope(viz_params))],
  [8, "-"]
)



// const font_family_pattern = arrange(
//   [64, "monospace"],
//   [8, "galactico"],
//   [8, "monospace"],
//   [8, "galactico"],
//   [8, "monospace"]
// )

all(x=>x.postgain(lvl).fontFamily("x3270").theme("greenText"))


await initHydra({ detectMove: true })
let rainShift = -10000;

shape(16, 0.08, 0.0)
  .color(1, 1, 1)
  
  // 1. Create the grid first
  .repeat(20, 5)
  
  // 2. Modulate the grid to scatter the coordinates of the drops randomly
  .modulate(noise(20, 1), 0.005) 
  
  .scrollX(() => {
    rainShift += mouse.x * -0.000002 + mouse.y * 0.000005; 
    return rainShift;
  })  
  
  .scrollY(() => time * -0.6)
  .blend(o0, 0.8)              
  .out(o0)


