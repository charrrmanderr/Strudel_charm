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

setCpm(140/4)

$: stack(
  s("[bd:0 [bd:0,hh]]*2")
    .delay(0.1),
  s("shaker_large!16").gain(rand).delay(0.5).almostNever(ply("2|4")),
  s("[- cp]*2").delay(0.3).lpf(perlin.range(500,1000).slow(2))
  )._punchcard()

// Practice making an arp
$: n("[0 2 4 <6 7 8 9>]*2")
  .scale("A3:minor")
  .clip(1.3)
  .layer(
    x=>x.s("sine:0:0.2").vib(4),
    x=>x.s("saw:0:0.7"),
    x=>x.s("saw").add(note(0.1)).lpenv(0.1),
    // x=>x.s("saw").add(note(-0.1))
  )
  .lpa(0.2).lpenv(100)
  .room("0.75")
  .pan(sine.range(0.35,0.65).slow(2))
  ._scope()
samples('github:bubobubobubobubo/dough-waveforms')
$: note("a2*8").s("wt_dbass").n(run(8))
  .layer(
    x=>x.vib(6),
    x=>x.add(note(-12)).gain(1.1)
  )
  ._scope()
.lpf(perlin.range(100,1000).slow(8))
.lpenv(-3).lpa(.1).room(0.5).fast(2)
