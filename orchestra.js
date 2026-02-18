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
setCpm(110/4)
const lvl = "0.3"
const viz_params = {height:100, width:1400}

// METRONOME
_$: s("bd:0*4").bank("RolandTR909").room("0.5")
  .gain(lvl)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
register('acidenv', (x, pat) => pat.lpf(100)
        .lpenv(x * 9).lps(.2).lpd(.12)
)


///////////////////////// Get to it :] ///
ORCHESTRA: note("<[a3,c4,g4]@3 [c4,g4,b4]!2 [c4,e4,g4]!2 \
                 [e3,g3,c4] [f3,g3,c4] [c4,f4,g4] [c4,e4,g4] \
                 [f3,g3,c4] [e3,g3,d4]@2>*4").sound("piano, gm_voice_oohs")


const arp_opts = ["{c4 f4 ~}%2",
                  "{c4 g4 ~}%2",
                  "{c4 [g4,b4] ~}%2",
                  "{c4 [f4,c5] ~}%2",
                  "{c4 [g4,d5] ~}%2"]
ARP: note(pick("<0!8 1!8 2!8 3!8 4!8>", arp_opts)).fast(8).s("saw")
  .add(note("<0 12>*1.5")) // .sometimesBy(0.3, ply("2"))
  .vowel("a e o") // .jux(rev)
  .delay("0.5")
  .legato(slider(0.9993,0.3,1))
  .gain("10".mul(lvl)) 

DRUMS: stack(
  s("bd:5 - bd:0 -").bank("RolandTR909").room("0.75").gain("1.5 0.75"),
  s("- cp - cp").bank("KorgDDM110").room("0.5").delay("0.5").vowel("a,o"),
  s("hh!16").bank("KorgDDM110").room("0.5").lpf(perlin.range(2000,4500).fast(4)).attack(0.02).gain("0.5")
  
)
  .postgain("4".mul(lvl))
  ._punchcard()
