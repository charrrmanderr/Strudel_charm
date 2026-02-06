setcpm(130/4)

// DRUMS
$: sound("[bd,bd:0] [- hh] [bd,bd:0] hh \
           [bd,bd:0] [- hh] [[bd,bd:0] hh] [hh hh]")
$: sound("[- cp]*2")
$: sound("- - <- [- rd]> -")
  .delay(0.4)

// PATTERN
$: n(`<
0 [- 0] 0 4
1 [- 1] 1 4
2 [- 2] 2 6
4 [- 4] [3 4] [3 2]
>*4`)
  .scale('E:minor')
  .sound('gm_synth_strings_1')
    ._punchcard()
  .lpf("<800 500 800 2000>")
  .gain("<1 0.95>*4")
  .delay("<0@3 0.5>")

// PAD
$: note("<[e4,g4,b4] [e4@3 b3] [d4 e4] [e4]>,[g5,b5]")
  .sound("sine")
  .vowel("<a e i o>")
  .attack(0)
  .room(2)

// TREBBLE
$: note("f#5*16").sound("gm_electric_guitar_muted")
  ._punchcard()
  .off(3/16, x=>x.add("<4 5>*8").vowel("<a e i o>*8"))
  .gain(rand)
  .lpf(saw.range(500, 2000))
$: note("g5*16").sound("gm_electric_guitar_muted")
  ._punchcard()
  .gain(sine)
  .lpf(saw.range(500, 2000))

// BASE
$: note(`<7 7 7 7
          8 8 8 8
          5 5 5 5 
          [<3 6>]!4>*4`)
  .scale("E1:minor")
  .sound("sawtooth")
  ._punchcard()
  .adsr("1:0:0:0")
  .room(2)
  .gain(2)
