setGainCurve(x => Math.pow(x, 2))
samples('github:switchangel/breaks')  //NOTE: breaks are two cycles, so need to divide by 2
samples('github:switchangel/pad')
samples('github:tidalcycles/uzu-drumkit')

setCps(170/60/4)
// METRONOME
// $: s("white!8").decay(0.04)

// MAIN BREAK
$: s("breaks/2")
  .fit()
  .scrub( // Scrub let's you mash together subsections of a sound
    irand(16) // Select random values on the range 1-16
    .div(16) // Divide by 16 (map values between 0 and 1)
    .seg(8)) // Segment this to only choose 8 values on that range
    .rib("<15 20>", 1) // Choose a segment to loop (seed=15 (15th cycle, loop two cycles))
    .almostNever(ply("2 | 4"))  // Almost never (10% of time) ply (repeat num beats)
    .gain(1.1)
    ._scope()

// HI-HAT (same as metronome, with an almostNever ply)
$: s("white!16").decay(0.07)
  .sometimesBy(0.1, ply("2"))
  .vowel("a <e i o>")
  .attack(0)
  .gain(1)
  .color('grey')
  ._scope()

// CHOPS (m7, m9 chords sampled & chopped fast)
const chops = [
  "<0.2 0.1>(<5 7>,8,0)".color("<lightblue #0041C2>"),
  // "0.3@2 [0.7!8]".sustain(0.3).phaser(0.1).color('red'),
  rand.seg(8).ribbon("<10 19 [63|106]>", 0.5)
      .sometimesBy(0.65, x=>x.ply("2")).color('orange')
]
$: s("swpad:3").sustain(0.4)
  .scrub(pick(chops, "<0!2 1 [1|0]>/2"))
  .lpf(slider(5000, 200, 5000))
  .note("<c2@3 g2>/2")
  .gain(1.5)
  ._punchcard()

// BASS
$: note("<-1 0!6 1>*8")
  .scale("[Bb2:Minor,Bb1:Minor]")
  // .seg(4)
  .s("supersaw")
  .lpf(600)
  .gain(1.15)
  ._punchcard().gain(1.3)

// ATMOSPHERE & TEXTURE
$: s("swpad") // SICK pad, from serum
  .gain(0.25)


