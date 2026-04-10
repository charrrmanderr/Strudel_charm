setCpm(80/4)

const lvl = 0.65

$: n("<<4!4 2!2 1!2> 0 7 0>*8")
  .scale("Db5:Major")
  .s("piano")
  .attack("0.1")
  .vib("4:0.2")
  .gain("2")
  .off(1/64, x=>x.add(note(12)))
  .lpf(slider(100,1,100).pow(2))



$: n("<[0,<3 4>]@2>")
  .scale("[Db2,Db3]:Pentatonic")
  .s("gm_cello")
  .lpf(slider(100,1,100).pow(2))

const effect_slider = sine.range(0,1).slow(16)//slider(0,0,1)
$: n("<7 0 <6!4 4!4> 0 8 3 9 4>*16")
  .scale("Db5:Major")
  .s("gm_pad_halo")
  .pan(0)
  .jux(off(-1/32, x=>x.add(note(-12))))
  .phaser(2)
  // ENGAGE EFFECTS
  .crush("8".sub("4".mul(effect_slider)))
  .delay(effect_slider.pow(0.5))
  .lpf(slider(100,1,100).pow(2))

$: n("[0,1,7]*32")
  .scale("Db3:Pentatonic")
  .s("saw")
  .vowel("<a e i o>*32")
  .gain(2)
  .lpf(slider(100,1,100).pow(2))

$: stack(
  s("<bd ->*4"),
  s("<- cp>*4").delay("0.1")
  ).room(0.5)

all(x=>x.spectrum())


