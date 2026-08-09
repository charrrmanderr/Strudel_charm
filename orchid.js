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
const cpm = 175/4
setCpm(cpm)
const key = "Eb:major"
const lvl = "0.5"
const viz_params = {height:100, width:1250}

DRUMS: stack(
  s("<bd [- bd] [- bd] ->*4"),
  s("<- sd>*4").bank("RolandTR909"),
  s("<- - - [mt lt]>*4"),
  s("<bd:1 [- bd:1] - ->*4").bank("RolandTR808"),
  s("<- hh>*8").bank("RolandTR808"),
  s("sh*8")
).gain(0.5)

_PAD: stack(
  note("<2 4 2 - - - - 0>*4"),
  note("<6 7 - - - - - ->*4")
).scale(key).legato(0.5).delay("1").transpose(-12)

BASSPAD: stack(
  note("<4 [- 5@10 6]@6 [7 -]\
         4 [- 5@10 -]@6 [- -]>*4"),
  note("<6 [- 7@10 11]@6 [7 -]\
         6 [- 7@10 12]@6 [7 -]>*4"),
  note("<8 [- 9@10 6]@6 [7 -]\
         8 [- 9@10 6]@6 [- -]>*4"),
).scale(key)
.s("supersaw, gm_epiano1")
.lpf(1000).lpenv(-1).vib("10:0.2").phaser(2).room("0.5")

CHORDS: note("<[1,5] [- [0,4]] - - - - - -\
          [-3,2] [- [-2,3]] - - - - - -\
          [-5,0] [- [-5,2]] - - - - - -\
          [0,2] [- [0,3]] - - - - - ->*4").scale(key).transpose(12).release(0.75)

BASS1: note("<2 [- 3@10 4]@6 [5 -]\
         2 [- 3@10 -]@6 [- -]>*4")
  .scale(key)
  .transpose(-24)
  .s("supersaw, gm_epiano1")
  .lpf(1000).lpenv(-1).vib("10:0.2").phaser(2).room("0.5").gain(2)

BASS2: note("<2 [- 3@10 4]@6 [5 -]\
         2 [- 3@10 -]@6 [- -]>*4")
  .scale(key)
  .transpose(-12)
  .s("supersaw, gm_epiano1")
  .lpf(1000).lpenv(-1).vib("10:0.2").phaser(2).room("0.5").gain(2)

_TEXTURE1: note("<- - [- -3] [0 -3] [0 -3] [0 -3] [0 -3] [1 2]\
          - - [- -3] [0 -3] [0 -3] [0 -3] [-1 0] [-1 -2]\
          - - [- -3] [0 -3] [0 -3] [0 -3] [0 -3] [4 2]\
          - [1 2] - [1 0] [- -3] [0 -3] [0 -3] [-1 0]>*4").scale(key).transpose("12,24").room("0.5").s("piano,saw")

_TEXTURE2: stack(
  note("<[-2,0] - - [-2,0] - - [-2,0] - - [-2,0] - - [-2,1] - - ->*8"),
  note("<- 5 5 - 5 5 - 5 5 - 5 5 - 5 5 -\
         - 5 5 - 5 5 - 5 5 - 5 5 - 3 3 2>*8"),
  note("<- 6 7 - 7 7 - 6 7 - 7 7 7 7 7 -\
         - 6 7 - 7 7 - 7 7 - 7 7 - 5 5 4>*8")
)
.scale(key).transpose(12)
.s("gm_music_box").gain(0.45)
.decay(0.2).sustain(1)
.room("1")

_MELODY: stack(
  note("<- - [- 0] [0 0] [0 0] [0 0] [0 1] -2@2 - [- -3] [-3 -3] [-3 -3] [-3 -3] [-3 -3] 0@2 - - - - [- -3] [-3 -3] [0@7 -2]@4 [-3@7 -2]@4 [-3 -]>*4"),
  note("<- - [- 4] [4 4] [4 4] [4 4] [4 5] 2@2 - [- 1] [1 1] [1 1] [1 1] [1 0] 2@2 - - - - [- 1] [1 1] [2@7 1]@4 [0@7 1]@4 [0 -]>*4")
).scale(key).transpose(12).s("supersaw,gm_choir_aahs")
.room("1").gain(1.5)//.delay("0.2")




all(x=>x.postgain(lvl))


await initHydra()
await import('https://emptyfla.sh/bl4st/bundle-global.js')

flameEngine.setConfig(
	flame()
	.colorful(0.5)
	.mapExposure(2.5)
	.addTransform(
		transform()
		.fisheye()
		.rotateX()
		.build()
	)
  .addTransform(
		transform()
		.hyperbolic()
		.rotateO()
		.build()
	)
  )

flameEngine.start()

s0.init({
	src: flameEngine.canvas
})

src(o0)
  .layer(
  src(s0)
  .luma()
)
  // .modulateScale(osc(2,0.2, 0))
  // .modulateRotate(noise(3), 0.1)
  .out(o0)

// src(o0).blend(
// src(s0)
//   // .color(() => 1 - Math.sin(time)**2,
//   //             () => 1 - Math.cos(time)**2,
//   //             () => 1 - Math.sin(time/2)**2/2)
//   .modulateRotate(osc(2,0.3,2), 2)
//   .luma()
//   )
//   .scale(1.002)
//   // .modulateScale(osc(2,0.2,0))
//   .out(o0)

// src(o0).layer(src(s0).luma()).scale(1.002).out(o0)

// out(o1)

