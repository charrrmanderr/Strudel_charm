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
setCpm(110/4)
const lvl = "0.3"
const viz_params = {height:200, width:1400}

// METRONOME
// $: s("bd:1*4").bank("RolandTR909").room("0.5")
//   .gain(lvl)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
register('acidenv', (x, pat) => pat.lpf(100)
        .lpenv(x * 9).lps(.2).lpd(.12)
)

register('bass_effects', (pulse, pat) => pat
  .attack("0.1")
  .decay("0.1")
  .sustain(pulse)
)

register('saw_partials', (numHarmonics, pat) => pat
  .partials(new Array(numHarmonics).fill(1))
)


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DRUM PATTERNS
const bd1 = s("bd:1 - - [- - bd:1 bd:0] [bd:1 bd:0!3]").room("0.3").bank("RolandTR909").sustain("[1 0.5 0.5 0.5]*4")
const hh1 = s("<- hh>*8").room("0.5").bank("RolandTR808")
const cp1 = s("- cp - cp").room("1").bank("RolandTR808")
const sh1 = s("white!16").decay(0.07)
  .sometimesBy(0.2, ply("2"))
  .vowel("<i o> <a e>")
  .attack(0)
  .gain("3")

const simple_stack = stack(s("bd:1*4").bank("RolandTR808"), hh1, cp1).gain(lvl)

const drums1 = stack(
  bd1,
  hh1,
  cp1,
  sh1
)

const melody = n("<0!16 1!8 2!4 3!4>*16")
  .scale("F3:Phrygian")
  .legato("0.35")
  .room("0.3")
  .delay("0.5")
  .phaser("2")
  .s("gm_electric_guitar_muted")

const bass_pulse = 1  // reduce for less pulse
const bass_effects = attack("0.1")
const bass1 =
  n("<<0 1> - - 4*4>*4")
  .scale("F1:Phrygian")
  .bass_effects(bass_pulse)
  .layer(
    x=>x.pan(sine.fast("4")).gain(0.5),
    x=>x.jux(press).gain("0.4 0 0 0")
  )
  .sound("square")

const bass2 =
  n("<<0 1>@2 - 4*2>*4")
  .scale("F1:Phrygian")
  .legato("1 0 0 0.3")
  .bass_effects(bass_pulse)
  .sound("saw")
  .saw_partials("<3 4 5 6 8 10 12 [15 16] 17 19 [20 22] [23 24]>")

const fall = 
  n("<- 10 7 6 \
    7 10 7 6 \
    7 10 6 7 - 6 - 7>*16")
  .scale("f4:Phrygian")
  .sound("gm_pad_halo")
  // .sound('piano').add(note(12))
  .sustain("0.2")
  .decay("0.3")
  .room("0.7")
  .lpf(1000)

const rise = 
  n("<3 4 5 6 7 10 11 12 13 14 15 17>")
  .scale("F2:Phrygian")
  .s("tri")
  .attack("0.2")
  .sustain("1")
  .decay("0.3")
  .vib(0.2, fast(8))
  .amp("<2 0>*8")

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


_$: bd1
_$: simple_stack
_$: sh1.gain("2".mul(lvl))
_$: drums1
.gain(lvl)

_$: melody
  .lpf(slider(200,200,3000))
  .crush(16)
  // .off(1/4, x=>x.noise(3).phaser(8).gain(0.3))
  .gain("3".mul(lvl))

_$: bass1.gain(lvl)
.room("1 0")

_$: stack(
    bass1.gain("1".mul(lvl)),
    bass2.gain("0".mul(lvl)).acidenv(10)
  )
  .room("1 0")

$: fall
  // .off(1/32, x=>x.add(note(12)).delay("0.5"))
  // .off(1/16, x=>x.add(note(24)).vib(1).delay("0.8"))
  // .off(1/8, x=>x.add(note(36)).vib(3).delay("1"))
  // .off(1/32, x=>x.add(note(14)).vib(0.5).gain(0.3).delay("0.6"))
  .gain("1.2".mul(lvl))

_$: rise
  // .off(0, x=>x.add(note("<3 3 4 3 3 3 1 1 1 1 1 -5>")).press())

