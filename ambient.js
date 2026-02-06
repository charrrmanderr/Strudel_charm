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

samples('github:switchangel/breaks')

setCpm(140/4)
$: sound("oceandrum").gain(2).lpf(slider(2000, 0, 2000))

$: note(irand(12).seg(8).rib(4, 8))
  .scale("D4:major:pentatonic")
  .sound('sine')
  .gain(0.6)
  ._punchcard()

$: note("0,[2|3|4]?")
  .scale("D5:major:pentatonic")
  .sound("ocarina")
  .color('gray')
  .gain(0.2)
  ._scope()
$: note("<0!3 [-4 [-3 -2]]>").scale("B1:minor:pentatonic").sound("gm_fretless_bass").gain(2)

//       1e+a 2e+a    3e  +  a       4    e      +   a
$: note("<[4]   -    [- [- [7 8]]] [[9 [8 7]] [[6 7] 8]]>"
        .off(1/32, x=>x.add(-4).decay(0.3)))
  .scale('B4:minor')
  .sound("gm_pad_halo","gm_voice_oohs")
  .delay(0.5)
  .phaser(4)
  .room(2)
  .color('#88CDD3')
  ._punchcard()

const shaker = sound("shaker_small!16")
  .gain("[1.1 1]!8"
        .add("[[0.15 0] 0]!4")
        .add("[0.15 0]!2"))
  .almostNever(ply("2 | 4"))

const kick = sound("bd:4!4").gain("1 0.8 0.9 0.7")

const clap = sound("[- cp:1]!2")
  .lpf("2000")
  .delay("0.5 0")

$: stack(
  kick,
  shaker,
  clap
)._scope()._punchcard()
