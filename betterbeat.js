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

setCpm(130/4)

// DRUMS
const kick = s("bd*4")
const snare = s("sd(3,8,2)*2")
const hats = stack(
  s("[hh ~]*4").room("1").sustain("2").ply("<1@3 2>*2"),
  s("[~ oh]*4").decay("0.25").room("0.5"))
const clap = s("[~ cp]*2").delay(1)

const drum_stack = stack(
  kick,
  snare,
  hats,
  clap
).bank("RolandTR909")

const deep_slide = slider(0.249, 0, 1)

// $: s("<cr>*2").ply("<1 1 <1 2> <2 4>>*2").gain(deep_slide.mul(2))

$: drum_stack.gain("0.45").delay("0.2")
  .layer(
    x=>x.decay(deep_slide).gain(slider(0.5,0,0.5)),
    x=>x.speed(2).scrub(
      irand(16)
       .div(16)
       .seg(8)
    ).rib("4 4 4 4 4 4 4 <4 2>", 1)
    .delay("0.3").sustain("2")
    .sometimesBy(0.07, ply("2"))
    .gain("0.45".sub(deep_slide.div(1.5)))
  )
  ._punchcard()

// MAIN
const arp_mood = slider(0, 0, 4)

$: n("<0 0 0 [- 2] \
     1 1 1 [4 2]>*4")
  .scale("C4:Minor")
  .layer(
    x=>x.s("supersaw"),
    x=>x.s("sine")
  )
  .layer(
    x=>x.ply("1 2 1 1 1 2 1 1").pan("0.1"),
    x=>x.ply("1 2 1 2 1 1 1 1").jux(rev).pan("0.9")
  )
  .decay("0.3")
  .delay(arp_mood)
  .cut(arp_mood)
  .gain("0.25".add(arp_mood.mul(-0.03)))
  ._punchcard()

// BASSLINE
$: n("<0 0 0 [0 9]\
       <[4 4 4] [4(3,8,4)]>@3 [4 7]>*4")
  .scale("C2:Minor")
  .layer(x=>x.s("supersaw").vib("0.2"),
         x=>x.add(note(0.1).s("supersaw")))
  .sound("supersaw")
  .decay("0.4")
  .sustain("0.9")
  .attack("0.1")
  .legato("0.8")
  .gain("<0.3 1 0.3 1>*8")
  ._scope()


// TREBBLE
$: note("[- 4] [- 3] [4 -] <3 7> <2 3> <0 2>")
  .scale("C5:Minor")
  .layer(
    x=>x.sound("gm_synth_brass_1:8").gain(slider(0.339, 0, 1)),
    x=>x.sound("gm_electric_guitar_clean:7").gain(slider(0.592,0,1))
  )
  .vib(sine)
  .pan(sine.range(0.3, 0.7))
  ._punchcard()
// .hush()

$: n("<[0,4,8,9,10,<14 [15|16|[17,18]]>]>/8")
  .scale("C4:Minor")
  .s("gm_lead_7_fifths").gain(sine.range(0.2,0.5)).vowel("a")._scope()
