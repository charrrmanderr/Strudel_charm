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
const cpm = 260/4
setCpm(cpm)
const lvl = "0.5"
const viz_params = {height:100, width:1500}
const key = "E:Minor"

const song_structure = arrange(
  [48, "0"],  // intro
  [16, "2"],  // chorus
  [32, "1"],  // verse
  [32, "2"],  // chorus
  [16, "3"],  // bridge
  [32, "2"]   // chorus
)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMPORTS


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DRUMS
const stack1 = stack(
  s("<bd:1 - [<-@3 bd:0> bd:0] [- bd:1]>*2").bank("RolandTR909").room("0.5"),
  s("<- sd>*2").bank("RolandTR909"),
  s("<- cp - cp - cp@(3,8,0) cp>*2").bank("RolandTR909"),
  s("sh*8").velocity("<1 0.5 0.65 0.5>*4").pan(sine.range(0.3, 0.7))
)

_$: stack(
  s("<bd:1 - [<-@3 bd:0> bd:0] [- bd:1]>*2").bank("RolandTR909").room("0.5"),
  s("<- sd>").bank("RolandTR909"),
  s("<- cp - cp - cp@(3,8,3) cp>").bank("RolandTR909")
)

const hh_stack = stack(
  s("<bd - - bd - - - bd - bd - bd - - bd ->*8").bank("RolandTR707"),
  s("<- hh - - - hh <- hh> <- hh> hh - hh - - hh - hh>*8").bank("RolandTR707").velocity(0.5).legato(0.3),
  s("<- - sd - sd - <sd -> <- sd> - - - - sd - <- sd> ->*8").bank("RolandTR707").room("0.5")
)

const fill = s("<- sh*8 [ht*8 lt*8]@2>")
const fill_arr = arrange([44, "-"], [4, fill])
DRUMS: song_structure.pick([fill_arr, stack1, stack1, hh_stack])

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CHORDS
const rhythm = ("<x [x x@2 x]@2 [- x] - x [- x] [- x] x [x x x x]@2 [- x] - x [- x] [- x]>*4")
// COMMENT IN LINE-BY-LINE
// Comment one line per cycle to line up with arrangement
$: stack(
    n("<0 -1 -2 -1>/2"),
    // n("<2 1 <0 4> 1>/2"),
    // n("<4 3 2 3>/2"),      n("<7 6 7 4>/2"),
    // n("<9 8 9 6>/2"),
    // n("<11 13 11 10>/2"),  n("<14 14 14 <14 15>>/2"),
    // n("<16 17 16 <16 18>>/2")
  ).scale(key)
  .struct(rhythm)
  .s(song_structure.pick(["tri", "tri", "supersaw", "-"]))
  .room("1")
  ._punchcard(viz_params)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BASS
const bass1 = note("<0 -4 -5 -3>/2").scale(key).add(note("0,-12"))
const subbass = note("0").scale(key).add(note("-24"))
BASS1: song_structure.pick(["-", bass1, bass1, "-"]).struct(rhythm).s("gm_synth_bass_1:7").gain(1.5)._scope(viz_params)
BASSSUB: song_structure.pick(["-", "-", subbass, subbass]).struct(rhythm).s("gm_synth_bass_1:7").gain(2).crush(6)._scope(viz_params)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PAD
$: song_structure.pick(["-", "-", "-", 
  stack(
  note("<0 0 0 0 - 0 - 0 - - 0 - - 0 - ->*8"),
  note("<1 1 1 1 - 1 - 1 - - 1 - - 1 - ->*8"),
  note("<4 4 4 4 - 4 - 4 - - 4 - - 4 - ->*8")
  )])
  .s("bytebeat")
  .scale(key)
  .transpose("12")
  .room("1")
  .legato("1.5")
  .lpf(sine.range(3000,4000))
  ._scope(viz_params)


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TEXTURE
const tex1 = note("<0 1 2 3 - ->*8")
const tex2 = note("<0 1 2 3 ->*8")
$: song_structure
  .pick(["-", "<0 1>/2", "-", "<0 1>/2"])
  .pick([tex1, tex2])
  .scale(key)
  .s("saw")
  .legato("<0.75 1 0.6 1>/4")
  .add(note(12))
  // .sometimes(add(note(12)))
  ._punchcard(viz_params)





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// VOX

const melody1 = n("<0@4 - - - <3 4>>*4").scale(key).add(note(24)).layer(
  x=>x.s("supersaw").vib("4:0.75 0"),
  x=>x.s("piano").gain(1.5).room("1").off(1/16, x=>x.add(note(12)))
)

$: song_structure.pick(["-", "-", melody1, "-"])._scope(viz_params)


_$: stack(
  note("<0 -4 -5 -3>/2"),
  note("<4 1 2 1>/2"))
  .s("gm_blown_bottle")
  .scale(key)
  .transpose(12)
  .gain(2)

_$: note("<[4 4] [- 4] [- 4] [- 6] 1 - - -\
          [1 1] [- 1] [- 1] [- 2] 0 - - ->*4")
  .scale(key)
  .transpose(12)
  .s("supersaw")
  .detune(1)
  .room("1")


// all(x=>x)


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// VISUALIZATION 
// await initHydra()

