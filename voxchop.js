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

samples({
  vox: 'vox_chorus.wav',
}, 'https://raw.githubusercontent.com/kai-xi/music4machines/main/samples/');


// METRONOME
_$: s("bd:0*4").bank("RolandTR909").room("0.5")
  .gain(lvl)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
register('acidenv', (x, pat) => pat.lpf(100)
        .lpenv(x * 9).lps(.2).lpd(.12)
)



const pattern = ["{0 2 ~}%2",
                  "{0 4 ~}%2",
                  "{0 5 ~}%2",
                  "{-1 2 ~}%2",
                  "{-2 2 ~}%2"]

ARP: note(pick("<0!8 <1 3>!5 <2 4>!3>", pattern)).fast(8).s("saw").scale("A4:Major")
  // .add(note("<0 12>*1.5")) // .sometimesBy(0.3, ply("2"))
  .sometimesBy(0.4, off(1/16, x=>x.add(note(12))))
  .delay("0.5")
  .lpf(2000)
  .legato(slider(0.5283,0.8))
  .gain("0.5".mul(lvl))


BASS: n("<0!8 <[2!3 -2!3 -3!2] [2!2 -2 4!3 5!2]>@8>*8")
  .scale("[A2]:Major")
  .s("z_sawtooth")
  .off(1/16, x=>x.add(note(-12)))
  // .layer(
  //   x=>x.s("z_sawtooth"),
  //   x=>x.add(note(-12)).sound("sine")
  // )
  .legato("0.1")
  // .partials([1,1,1,1,0,0,0,0,0])
  .lpf(2000)
.gain(lvl)

DRUMS: stack(
  s("bd:5 - bd:0 -").bank("RolandTR909").room("0.75").gain("1.5 1"),
  s("- cp - cp").bank("KorgDDM110").room("0.5").delay("0.5").vowel("e"),
  s("hh!16").bank("KorgDDM110").room("0.5").lpf(perlin.range(2000,4500).fast(8)).attack(0.02).gain("0.5")
  
)
  .postgain("0.5".mul(lvl))
  ._punchcard()

VOX: s("vox/8").fit().add(note(34))
  .scrub( // Scrub let's you mash together subsections of a sound
    irand(16) // Select random values on the range 1-16
    .div(16) // Divide by 16 (map values between 0 and 1)
    .seg(8)) // Segment this to only choose 8 values on that range
    .rib("<0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15>", 1) // Choose a segment to loop (seed=15 (15th cycle, loop two cycles))
  .fast(2)
  .sometimesBy(0.1, ply("2|4"))
  .delay("0.5")
  .room("0.4")
  .gain("0.5".mul(lvl))//.legato("0.5")
