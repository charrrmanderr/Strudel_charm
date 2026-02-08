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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DRUM PATTERNS
const bd1 = s("bd:1*4").room("0.5").bank("RolandTR909")
const hh1 = s("[- hh]*2").room("0.5")
const cp1 = s("[- cp]*2").room("0.5").gain(0.1)
const drums1 = stack(
  bd1,
  hh1,
  cp1
)

// ARPS
const chords = n(
  "<{2 ~ -3 0}%12@3 \
    {~ 1 -5 -3}%4 \
    {0 ~ -5 -3}%8@2 {0 ~ -4 -2}%4 \
    {~ -3 -5 -1}%4 \
    {0 ~ -4 -2}%8@2 {0 ~ -3 -1}%4 \
    {~ 1 -3 ~}%4>*4"
)
const chords_gallop = n(
  "<{2 -3 0}%9@3 \
    {1 -5 -3}%3 \
    {0 -5 -3}%6@2 {0 -4 -2}%3 \
    {-3 -5 -1}%3 \
    {0 -4 -2}%6@2 {0 -3 -1}%3 \
    {1 -3 -1}%3>*4"
)
const arpwave = chords
  .scale("B3:minor")
  .sound("supersaw")
  .decay("0.75")
  .pan(sine.range(0.3,0.7))
const arpwave_gallop = chords_gallop
  .scale("B3:minor")
  .sound("supersaw")
  .decay("0.75")
  .pan(sine.range(0.3,0.7))


const bass = n(
  "0*8"
  )
  .scale("B1:minor:pentatonic")
  .sound("saw")
  .decay("0.2")
  .ply("1 1 1 2 1 1 2 1")

const tron_bass1 = n(
  "<{0 0 0 0}%12@3 \
    {- 1 -5 -3}%4 \
    {-1 -1 -1 -1}%8@2 - \
    {~ -3 -5 -1}%4 \
    {3 3 3 3}%8@2 - \
    {~ 1 -3 ~}%4 \
    {0 0 0 0}%12@3 \
    {- 1 -5 -3}%4 \
    {2 2 2 2}%8@2 - \
    {~ -3 -5 -1}%4 \
    {3 3 3 3}%8@2 - \
    {~ 1 -3 ~}%4 \
    >*4"
  ).scale("B1:minor")

const tron_bass2 = n(
  "<{2 ~ -3 0}%12@3 \
    {- 1 -5 -3}%4 \
    {0 - -5 -3}%8@2 {0 ~ -4 -2}%4 \
    {~ -3 -5 -1}%4 \
    {0 ~ -4 -2}%8@2 {0 ~ -3 -1}%4 \
    {~ 1 -3 ~}%4>*4"
  ).scale("B1:minor")

const bass3 = n(
    "<4 -3 [4 4] -3>*4"
  ).scale("B2:Minor")
  .sound("supersaw")
  .legato(0.65)

const trebble = n(
    "<- [[- [3,2(2,8,0)]],1(3,8,3)] - ->/2"
  )
  .scale("B4:minor")
  .s('square')
  .delay("1")
  .ply(2)
  .partials(["1", "1", "0|1?0.1", "0|1?0.1", "[0 0.3 1]", "0|1?0.1", "[0 1]", "1 0.3 0"])
  .phases(randL(2))
  .pan(sine)

const arpwave_b_main = n(
  "<{0 0 0 0}%12@3 \
    {- 1 -5 -3}%4 \
    {-1 -1 -1 -1}%8@2 - \
    {~ -3 -5 -1}%4 \
    {3 3 3 3}%8@2 - \
    {~ 1 -3 ~}%4 \
    {4 4 4 4}%12@3 \
    {- 1 -5 -3}%4 \
    {2 2 2 2}%8@2 - \
    {~ -3 -5 -1}%4 \
    {3 3 3 3}%8@2 - \
    {~ 1 -3 ~}%4 \
    >*4"
  )

const arpwave_b_harm = n(
  "<{-3 -3 -3 -3}%12@3 \
    {- 1 -5 -3}%4 \
    {1 1 1 1}%8@2 - \
    {~ -3 -5 -1}%4 \
    [4!4 3!4 2!4 1!4]@4 \
    {0 0 0 0}%12@3 \
    {- 1 -5 -3}%4 \
    {-1 -1 -1 -1}%8@2 - \
    {~ -3 -5 -1}%4 \
    {0 0 0 0}%8@2 - \
    {~ 1 -3 ~}%4 \
    >*4"
  )

const arpwave_b = stack(
    arpwave_b_main.pan(0.2),
    arpwave_b_harm.pan(0.8)
  )
  .scale("B2:minor")
  .sound("square")
  .decay("0.5")
  .fmi(sine.range(0,4))
  .acidenv(0.5)
  .gain(lvl)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


_$: drums1
.gain(lvl)

_$: trebble.gain(lvl)

// MODE 1
_$: bass.gain("1.5".mul(lvl))

const drop = "0"
$: arpwave.acidenv(0.3)
.delay(0.2) / 1.5
  .gain(lvl)
// .gain(drop.mul(lvl))
._punchcard(viz_params)

_$: arpwave_b
  .fmh("<0 1 2 3 4>*8") // increase fmh for a higher EQ
  .acidenv(0.4)//("<0.4 0.6 0.8 1 1.2 1.4 1.6 1.4 1.2 1 0.8 0.6>")
  .delay("0.3")
  .jux(rev)


_$: tron_bass2
  .s("saw")
  // .penv(10).panchor(0).pdec(0.05)
  .delay(0.2).room(0.25)
  .compressor(-20).vib(0.3)
  .partials(randL(200))
  .phases(randL(200))
  .acidenv(1)
  .gain(lvl)
  // .gain(drop.mul(lvl))

_$: bass3
  .fast("<1 <1 2>>*2")
  // .fast(2)

