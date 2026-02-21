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
const cpm = 140/4
setCpm(cpm)
const key = "F:minor"
const lvl = "0.5"
const viz_params = {height:100, width:2000}

samples({
  camera_flash: '360_camera_flash.wav',
  vox: '360_vocals.wav'
}, 'https://raw.githubusercontent.com/kai-xi/360/main/samples/');


// METRONOME
_$: s("bd:0*4,[- cp]*2").bank("RolandTR909").room("0.5").gain("1 0.5 0.5 0.5")
  .postgain(lvl)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
register('acidenv', (x, pat) => pat.lpf(100)
        .lpenv(x * 9).lps(.2).lpd(.12)
)


const chords = ["{4 2 0 - 4 - }%6",
                "{3 1 -1 - 3 -}%6",
                "{2 0 -2 - 2 -}%6",
                ]
const atmos = n("<[4 2 0 4 - 4 - 4]!2 \
           [3 1 -1 3 - 3 - 3]!2 \
           [2 0 -2 2 - 2 - 2]!3 \
           [2 0 -2 2 - 1 - 2] \
           [2 0 -3 2 - 2 - 2]!2 \
           [1 -1 -4 1 - 1 - 1]!2 \
           [0 -1 -2 0 - 0 - 0]!3 \
           [2 0 -2 2 - 1 - 2]>*2")

const bass_atmos = n("<[0!4 - 0 - 0]!2 \
           [1!4 - 1 - 1]!2 \
           [-2!4 - -2 - -2]!2 \
           [-4!4 - -4 - -4] \
           [-4!4 - 2 1 2] \
           [0!4 - 0 - 0]!2 \
           [-4!4 - -4 - -4]!2 \
           [-2!4 - -2 - -2]!3 \
           [-2!3 - -2 -1 0 1]>*2")
const bass_double = n("<[2!4 - 2 - 2]!2 \
           [3!4 - 3 - 3]!2 \
           [0!4 - 0 - 0]!2 \
           [-2!4 - -2 - -2] \
           [4 3 2 1] \
           [2!4 - 2 - 2]!2 \
           [3!4 - 3 - 3]!2 \
           [2!4 - 2 - 2]!3 \
           [0!3 - 0 1 2 1]>*2")

const atmos_presence = slider(0, 0, 1)
_ATMOS: atmos.scale(key).add(note(12))
  .s("tri")
  .layer(
    x=>x,
    x=>x.add(note(0.2))
  )
  .cut(3)
  .lpf("10000".mul(atmos_presence))
  .postgain("2".mul(lvl))
  ._scope(viz_params)
  

const bass_presence = slider(0, 0, 1)
const subbass = slider(0, 0, 1)
const subbass_acid = 5
const bass_dub = slider(10, 10, 100)
_BASS: bass_atmos.scale(key).add(note(-12)).s("supersaw")
  .layer(
    x=>x.gain("1"),
    x=>x.off(1/16, x=>x.add(note(-12))).gain(subbass)
        .lpf("100".mul(subbass.pow(2))).lpenv(subbass_acid).lps(.2).lpd(.12)
        .gain("2".mul(subbass.pow(0.5)))
  )
  .lpf("10000".mul(bass_presence.pow(2)))
  .postgain(lvl)
  
_BASSDUB: bass_double.scale(key).add(note(0)).s("supersaw").lpf(bass_dub.pow(2).mul(bass_presence))
  .gain("1.5")
  .postgain(lvl)

DRUMS: stack(
  s("kick:2*4").gain(1.5),
  s("hi_hat_open:<0@3 1 0@3 3>*2").struct("<x [x@3 x@4] x x>*8").lpf(6000).gain(0.75),
  s("shaker:3*4").struct("<-@3 [- x]>*2"),
  s(pick(["clap:1", "clap:2", "clap:3", "clap:5"], "<0@3 1 2@3 3>*2")).struct("<- x>*8"),
  // s("<woos:<1 7> woos:5 [woos:5 woos:5] woos:6>").delay("0.1")
).postgain(lvl)
._scope(viz_params)

const vox_chop1 = s("vox").slice(32 * 4 -0.75, "< 30 - - 15 16 17 18 19 \
                                            20 21 22 23 24 25 26 29 >*4")
const vox_chop2 = s("vox").slice(32 * 4, "<28 29 30 31>*4")
const vox_chop3 = s("vox").slice(32 * 4, "<36 37 38 39 - - - 35>*4")

_$: s("vox").slice(32 * 4 - 0.75, "<- - - 15 16 17 18 19 16 17*2 18*2 19 16 17 18*2 19>*4").add(note(32)).layer(x=>x, x=>x.add(note("<5 4@3>")))
_$: vox_chop1.add(note(32)).ply("<1 1 2 <1 1 4 1>>*4").layer(x=>x, x=>x.add(note("<[4 5] 4>")))
_$: vox_chop2.add(note(32)).layer(x=>x, x=>x.add(note("<7@7 10>*4"))).pan("0.8")
_$: vox_chop3.add(note(32)).layer(x=>x, x=>x.add(note("<2@3 3>"))).pan("0.2")

_$: s("<- cp>*4").bank("RolandTR909").room("0.5").postgain("2".mul(lvl))

all(x=>x.lpf(slider(100, 100, 10000)))
all(x=>x.cut(7))

all(x=>x.spectrum())
