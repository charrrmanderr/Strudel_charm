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
samples('github:switchangel/breaks')  //NOTE: breaks are two cycles, so need to divide by 2
samples('github:switchangel/pad')
samples('github:tidalcycles/uzu-drumkit')

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CONTROL PARAMETERs
setCpm(140/4)
const lvl = 0.5
const viz_params = {height:200, width:1400}

// METRONOME
_$: s("bd:1*4").room("0.5")
  .gain(lvl)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
register('acidenv', (x, pat) => pat.lpf(100)
        .lpenv(x * 9).lps(.2).lpd(.12)
)


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DRUM PATTERNS
const break_drums = s("breaks/2")
  .fit()
  .scrub( // Scrub let's you mash together subsections of a sound
    irand(16) // Select random values on the range 1-16
    .div(16) // Divide by 16 (map values between 0 and 1)
    .seg(8)) // Segment this to only choose 8 values on that range
    .rib("<15 20>", 1) // Choose a segment to loop (seed=15 (15th cycle, loop two cycles))
    .almostNever(ply("2 | 4"))  // Almost never (10% of time) ply (repeat num beats)

const bd1 = s("bd:1*4").room("0.5")
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$: drums1
.gain(lvl)
// ._scope()

$: stack(
  arpwave.acidenv(slider(1, 0, 1)),
  arpwave_gallop.acidenv(slider(0, 0, 1))
)
.delay(0.2)
.gain(lvl)
// ._punchcard(viz_params)

$: bass
.gain(lvl)
// ._spiral()
