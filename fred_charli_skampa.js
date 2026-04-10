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
setCpm(136/4)
const lvl = "1.5"
const viz_params = {height:200, width:1400}

// METRONOME
// $: s("bd:1*4").bank("RolandTR909").room("0.5")
  // .gain(lvl)



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
register('acidenv', (x, pat) => pat.lpf(100)
        .lpenv(x * 9).lps(.2).lpd(.12)
)


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMPORTS
samples({
  camera_flash: '360_camera_flash.wav',
  vox: '360_vocals.wav'
}, 'https://raw.githubusercontent.com/kai-xi/360/main/samples/');



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DRUMS

const bd = s("bd:0").struct("<x [- x] x x [- x] x x x>*4").bank("tr909")
const sd = s("- sd").bank("tr606")
const vowel_pattern = "<a a a <e@3 o>>*8"   // "<[a|e|i|o|u] [a|e|i|o|u] [a|e|i|o|u] [a|e|i|o|u]>*8"
const hh1 = s("<hh hh oh [hh hh]>*8").vowel(vowel_pattern).hpf(800).legato(0.5).vib(3)
// const hh2_ctrl_pattern = arrange(
//   [4, "0"],
//   [4, "0.1"],
//   [8, "1"]
// )
const hh2 = s("hh:6").seg(4).bank("tr808")//.delay(hh2_ctrl_pattern)
const sh = s("sh*16").pan(perlin.fast(8))
const tom = s("<- - - [ht ht] - - - ->*4").add(note("<36 30>/2")).room("0.2")

const intro_stack =
  stack(
    sd.gain(0.6),
    tom.gain(0.5),
    hh2
  )

const shaker_stack = 
  stack(
    bd.duckorbit(2),
    sd.gain(0.6),
    hh2.delay(0.1),
    sh.gain("0.1").orbit(2)
  )

const echo_stack = 
  stack(
      bd,
      sd.gain(0.6),
      hh2.delay(1),
      sh.gain("0.1")
    )

const vowel_stack = 
  stack(
    sd.gain(0.6),
    hh1.gain(2),
    hh2.delay(0.1),
    sh.gain("0.1")
  )


DRUMS: arrange(
  [8, "<0 1>/8".pick([intro_stack, vowel_stack])],
  [8, shaker_stack],
  [8, echo_stack]
  ).postgain(lvl)
  ._scope(viz_params)




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BASS

const bassline = n("<0 [- 0] 1 0 [- 0] 1 5 1>*4")


_BASS2: bassline.s("saw")
  .scale("[Eb3, Eb2]:Phrygian")
  .adsr("0.1:0.5:1:0.4")
  .legato(0.4)
  .room("1")
  .lpf(slider(12.7,10,40).pow(2))

BASS: bassline
  .scale("Eb2:Phrygian")
  .layer(
    x=>x.s("sine"),//.distort(1).lpf(200),
    // x=>x.s("sine").add(note(12)).gain(0.5),
    x=>x.s("sine").add(note(24)).gain(0.15),
    // x=>x.s("sine").add(note(0.05)),
    x=>x.s("sine").add(note(-12)),
    x=>x.s("sine").add(note(-12.1))
  )
  .fm("4")
  .fm(4)
  .fmdecay(.5)
  .fmsustain(0.5)
  .fmrelease(5)
  .distort(1)
  .lpf(400)
  .vib("3:-0.2:0.2")
  .room("0.3:0.3")
  .postgain(lvl)
  ._scope(viz_params)




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// VOCALS
const tune_charli = "39"
CHARLI: s("vox").slice(32 * 4, "<77 78 79 - 80 81 82 83>*4")
  .add(note(tune_charli))
  .legato(1.5)
  // .layer(
  //   x=>x.gain(0.5).legato(0.8),
  //   x=>x.add(note(-12))
  // )
  // .fast(2).ply("<1@3 2>")




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// VISUALS (HYDRA)

await initHydra()
solid(0.1, 0.1, 0.8)
  .add(
    noise(20, 1.5) // (frequency, speed at 0 for "stationary")
      .thresh(0.8, 0.1)
      .scrollY(0, 0.8)
      .modulate(noise(0.7), 0.1)
    )
  .add(
    noise(20, 1.5) // (frequency, speed at 0 for "stationary")
      .thresh(0.8, 0.1)
      .scrollX(0, -0.3)
      .modulate(noise(0.7), 0.1)
    )
  .out()



