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
const cpm = 160/4
setCpm(cpm)
const key = "D:minor"
const lvl = "0.5"
const viz_params = {height:100, width:2000}

const stack10 = stack(
  s("<bd bd - - bd bd - ->*8"),
  s("<- - sd - - - sd [sd sd]>*8").gain(0.75),
  s("<- - - [mt lt] - lt - [lt lt]>*8"),
)
const stack11 = stack(
  s("<bd bd - - bd [- bd] - [- bd]>*8"),
  s("<- - sd - - - sd [sd -]>*8").gain(0.75),
  s("<- - - [mt lt] - lt - [lt lt lt lt]>*8"),
)
const fill1 = s("<[bd]*8 [bd]*10>*2").phaser("1")

const drums1 = arrange([3, stack10],
                       [1, stack11],
                       [3, stack10],
                       [1, fill1])

DRUMS: drums1.cut(0.1).lpf(2000)


const bass = n("0@4 1@2 4@2").seg(8)
  .scale(key)
  .legato(0.6)
  .layer(
    x=>x.add(note(-12)).s("supersaw"),
    x=>x.add(note(-24)).s("supersaw")
  )
  .off(1/16, x=>x.add(note(12)).gain(0.45))

BASS: bass
  .postgain(1)

TOP: n("<7 6 - 3 - 2 - 1 4 - 10 11 - 9 - 8 >*16").scale(key).s("sine").room("1")

all(x=>x.scope())
