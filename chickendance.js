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
setCpm(150/4)
const lvl = "0.5"
const viz_params = {height:100, width:1400}


register('ethereal_sound', (pat) => pat.layer(
    // x=>x.s("saw").lpf(3000),
    x=>x.s("sine").legato(0.75).attack("0.05"),
    x=>x.s("piano").legato("1.5")
  ))
register('substant_sound', (pat) => pat.s("gm_epiano2:10"))

const melody = note("<f3 b3 c4 f3 b3 c4 f3 b3 g3 b3 c4 g3 b3 c4 g3 b3 a3 b3 c4 a3 b3 c4 a3 c4 b3 c4 g4 b3 c4 g4 b3 c4>*8")
  .add(note(12))
  .off(1/32, x=>x.add(note(12)).room("1"))
  .crush(6)
  // .s("gm_epiano2:10")//.gain(2) 

const melody_arr = arrange(
  [8, melody.ethereal_sound()],
  [16, melody.substant_sound()]
)
const melody_gain = arrange([7, "1"], [1, "0"], [16, "2"])

MELODY: melody_arr.gain(melody_gain)
  ._scope(viz_params)



_$TAB: note("<- - [c4,e4] - - [c4,e4] - [c4,e4] - - [c4,d4] - - [c4,d4] - [c4,d4] - - [b3,g4] - - [b3,g4] - [b3,c4] - - [c4,g4] - - [c4,g4] - [c4,c4]>*8")
  .s("gm_epiano1:<1 9 10>").gain(2)
  .room("1")
  .delay("0.5")
  .vib("2:0.2")

_$COOP: note("<- - e4@6 - - d4@6 - - g4@6 - - d4@6>*8").s("gm_pad_metallic:1").room("1").penv("12").pattack("<0.5 0.2>").velocity(1.2)
_$COOP2: note("<- - a4@6 - - g4@6 - - b4@6 - - c5@6>*8").s("gm_pad_metallic:1").room("1").penv("12").pattack("<0.1>").velocity(1.2)

const drums1 = stack(
  s("bd*2"),
  s("<- cp>*4"),
  s("<- - - [hh hh] [hh hh] hh hh hh>*8").bank("RolandTR909"),
  s("<- - - [rim rim] [- rim] [- <- bd:0>] rim ->*8").bank("RolandTR909").velocity(0.5),
  s("<- - - [mt mt] [ht mt] mt ht lt>*8"),
  s("<sh sh sh [sh!2]>*8")
  )

const drums2 = stack(
  s("<[bd:1 bd:1] [- bd:1] - -\
      [bd:1 [- bd:1]] [- bd:1] - ->*4").bank("RolandTR909").room("0.85"),
  s("<- hh>*8").velocity(1.5).bank("RolandTR909"),
  s("<- [cp - - cp] [- cp] <- [- cp]>>*4"),
  s("<sh sh sh sh>*16").pan(sine.range(0.3, 0.7))
  )

const fill1 = stack(
  s("- [- [bd bd]] [[bd bd] bd] [bd bd]"),
  s("- [- [ht ht]] [[ht mt] mt] [lt [lt lt]]"),
  // s("- - [cp*2] [cp*4]").velocity(saw.range(0,1))
)

const drums_arr = arrange(
  [7, "-"],
  [1, fill1],
  [12, drums1],
  [4, drums2]
)

DRUMS: drums_arr



const bass1 = n("<3 4 5 -1>")
  .struct("<x - - [x x] [- x] x - x \
           - - - [x x] [- x] x - x \
           x - - [x -] x [- x] - [x x] \
           - - - [x x] x [- x] - [x x] >*8").scale("[c2,c3]:Major")
  .legato(0.6)
  .velocity(1.5)
  .gain(3)
  .room("1")

const bass2 = n("<0 1 -1 [2@3 1]>")
  .struct("<x - - [x x] [- x] x - x \
           - - - [x x] [- x] x - x \
           x - - [x x] [- x] x - x \
           - - - [x -] [x] [- x] - [x x] >*8").scale("[c2,c3]:Major")
  .legato(0.6)
  .velocity(1.5)
  .gain(3)
  .room("1")

BASS: arrange([8, "-"], [12, bass1], [4, bass2])


HARM: n("<0 1 2 4>")
  .struct("<x - - [x x] [- x] x - x \
           - - - [x x] [- x] x - x \
           x - - [x -] x [- x] - [x x] \
           - - - [x x] x [- x] - [x x] >*8").scale("c5:Major")
  .legato(0.5)
  .gain(2)
  .room("1")

_COUNTER: n("<- - 0 - - 0 - -3>*8")
  .scale("c5:major")
  .layer(
    x=>x.add(note(-12)),
    x=>x,
    // x=>x.add(note("<7 9 11 <12 <7 4>>>@3 5"))
  )
  .s("supersaw,piano")
  // .velocity(1.25)
  .room("0.5")
  .delay("0.2")

_LEAD: stack(
  note("<0 - 1 [- 0 1] 2 - - <[4 4 4] ->>*2"),
  note("<2 - 4 [- 2 4] 5 - - <[7 7 7] ->>*2")
  )
  .scale("C4:Major")
  .s("gm_overdriven_guitar:3")
  .off(1/16, x=>x.add(note(12)).gain(0.3).delay("1"))
  .room("1")
  .legato("2 1")
  .penv("<10 [2 0] 7 4>").patt("<0.3 0.1 0.4 0.1>")
  .velocity(2)

// I WANT TO SAY THAT I MISS YOU, I WANT TO SAY THAT I
// I WANT TO SAY THAT I NEED IT,  I WANT TO SAY I WANT IT
_VOX: n("<- - - [- 0] 1 [- 1] 1 [0 1] 2 0 - [- <0 4>] 1 [- 1] 1 [0 <1 0>]>*4")
  .scale("C4:Major")
  // .s("saw,tri")
  .s("gm_lead_3_calliope:0,supersaw")
  .layer(
    x=>x.gain(1.6),
    x=>x.add(note(12)).room("1").delay("0.5")
  )
  .velocity(1.5)

// ADD a gm_percussive_organ part -- should be punchy rhythmic chords or melody
_RHYTHM: n("<- - [0,1,4] [- [0,1,4]] [- [0,1,4]] [0,2,4] - [[0,2,4] [0,2,4]]>*8").scale("[C5,C4]:Major").s("gm_percussive_organ, gm_epiano2:4").room("0.3").legato(1.2)//.gain(2)
// ADD a gm_choir_aahs part -- should be high
const pad_patt = n("<4@4 - - - <- 5 1 - - 5 0 5>>*8")
  .scale("C4:Major")
  .s("gm_choir_aahs")
  .legato("2")

const pad_transpose = arrange([8, "12"],[16, "0"])
const pad_gain = arrange([8, "2"], [16, "3"])

PAD: pad_patt.transpose(pad_transpose).gain(pad_gain)


// all(x=>x.postgain(lvl))

await initHydra()

let spiral1 = (
  osc(20,-0.1,0).luma(0.5).kaleid(60).scale(1, 1, 1)
)

let spiral2 = (
  osc(20,()=>Math.sin(time/10)/10,0).luma(0.9).kaleid(60).scale(1, 1, 1).scrollX(0.5)
)

src(o0).blend(
  spiral1.add(spiral2).colorama(()=>Math.sin(time/30)*5)
).modulate(noise(3)).out(o0)

src(o0).add(shape(4).scale(1,0.81,1.64)).invert().out(o1)

s2.initVideo('https://media.giphy.com/media/ybnrXkdf8jAxIkMuwr/giphy.mp4')
src(s2).scale(0.5, 0.5, 1).mask(shape(4).scale(1,0.81,1.64)).out(o2)

src(o1).add(src(o2)).out(o3)

render(o3)
