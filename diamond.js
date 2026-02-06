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

setCpm(140/4)
// METRONOME
// $: s("white:16*4").decay("0.1").gain("1 0.8 0.9 0.7".sub("0.3"))
// $: s("bd hh bd hh")

const bd1 = s("<bd:1 - bd:0 ->").bank("RolandTR909").delay("0.5").room("1")
const bd1_1 = s("<- - [- [- bd:0]] [- [- bd:0]]>*2").bank("RolandTR909").room("0.2")
  .ply("1 <1 2>/2")
const hh1 = s("<- [hh,cp] - [hh,cp]>*2").band("RolandTR909").room("0.1")
const drums1 = stack(
  bd1,bd1_1,
  hh1
)

const bd2 = s("bd:1*4").room("0.2")
const cp2 = s("<- cp - cp - cp(3,8,5)@2 cp>*4").room("0.5").add(note(30))
const sh = s("white*16")
  .hpf("<8000 10000>*16")
  .phaser(2)
  .decay(0.04)
  .gain("<0.5 0.6>*2")
const drums2 = stack(
  bd2,
  cp2,
  sh
)

const bd3 = s("<bd - >*4").add(note(12)).delay("0.5")
const sn3 = s("< - sd - sd>*4").add(note(35))
const bo3 = note("<[- 92.5] 92.5 [- 87.5] 87.5 - 92.5(3,8,0)@2 87.5>*4")
  .sound("gm_taiko_drum").gain(2)
const bl3 = n("<0 0 0 0>*4").s("gm_woodblock:3").gain(3)
const drums3 = stack(
  bd3,
  sn3,
  sh,
  bl3
  // bo3
)

const main_melody = n(
   "<[3@7 2@2]@2 - 0 \
     [4@2 - 5 -@2]@3 [0 1] \
     [3@7 2@2]@2 - [0 1] \
     [-1@2 - [-2,0] -@2]@3 [0 1]>*4")
  .scale('G4:Major')
  .s('supersaw')
  .layer(
    x=>x,
    x=>x.sound('sine').add(note("-12"))
  )
  .lpenv("4")
  .room("0.5")
  .roomsize("2").delay("0.1")

const arpeggiator = note(
  "<7 4 4 7 4 4 7 4 4 7 4 4 7 4>*8")
  .scale("G4:Major")
  .s('sine')
  .layer(
    x=>x.pan(0.3),
    x=>x.add(note(12)).pan(0.5)
  )
  .decay("0.1")
  .gain("<1 0.8 0.8 1 0.8 0.8 1 0.8 0.8 1 0.8>*8")
  .delay("0.3")

const pad = note(
  "<[g4,a4,b4,d5]\
     [g4,a4]\
     [g4,a4,b4,d5]\
     [g4,[a4 b4]]>").s('gm_pad_new_age').gain(sine).room("1")

const bass = note(
  "<0 0 0 0 0 0 0 0 0 0 [0|4] [0|4] 0 [[0 0 0]|[5 6 5]]@3>*16")
  .scale("G2:Major")
  .decay("0.1")
  .layer(
    x=>x,
    x=>x.add(note(-12))
  )
  .s("supersaw")

const bass2 = note(
  "<{0  4 <7 8>}%64 \
    {-2 5 <9 7>}%64 \
    {-4 0 <3 7>}%64 \
    {-6 0  5   }%64> / 4")
  .scale("G2:Major")
  .s("supersaw")

$: drums1
._scope()
_$: main_melody.lpf(slider(3470,2000,8000))
$: arpeggiator // add bounce and echo by commenting in the lines below
// .layer(
//     x=>x,
//     x=>x.jux(rev) 
// ).gain(0.5)
$: pad
$: bass
  .legato(slider(1, 0, 1)).gain(slider(0, 0, 1))
  .color("teal")
  ._punchcard()

