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
const viz_params = {height:100, width:2000}

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

const drums1 = stack(
  s("<bd:5 - bd:0 ->*2").bank("RolandTR909").room("0.75").gain("1.5 1"),
  s("<- cp - cp>*2").bank("KorgDDM110").room("0.5").delay("0.5").vowel("e"),
  s("<hh!16>*16").bank("KorgDDM110").room("0.5").lpf(perlin.range(2000,4500).fast(8)).attack(0.02).gain("0.5")
)

const drums2 = stack(
  s("<bd:1 - bd:1 ->*4").bank("RolandTR909").room("0.6").compressor("-15:5:10:.01:.002").gain("1.5"),
  s("<- cp - cp - cp(3,8,5)@2 cp>*4").bank("RolandTR909").delay("0.4").room("0.1").gain("1.5").lpf(4000),
  s("<hh!16>*16").bank("KorgDDM110").room("0.5").lpf(tri.range(3000,4500).fast(2)).attack(0.02).gain("0.5"),
  // s("").bank("RolandTR808")
)

const drums = [drums1, drums2]

const rib_struct = ["<12@2 13@2 14@2 17 [9 - 9 [9 - 9 -]]>",
                    "<<0 18>@2 9 <1 7>>"]   // I like 0, 1, 2, 4, 7, 9(!!), 12, 13, 14, 16, 17, 18)   (5, 6, 15 are nice for breaks)
                    


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
  .legato(slider(0.521, 0.3, 0.8))
  .gain("0.5".mul(lvl))
  .color('aqua')
  ._pitchwheel({'height':300, 'width':300})

const speed = 0
// 0 - slower
// 1 - faster
const padlines = stack(
  pick([note("<e4 f#4 g#4 e4>"), note("<e4 f#4>")], speed),
  note("<a4 b4>*2"),
  note("<c#5 a4>"),
  note("<{e5 a5 ~}%2 <[e5 a5] {e5 a5 c#6 a5}%2>>*8")
)

_PAD: padlines.s("gm_pad_halo").slow(pick([2, 1], speed))
  .attack("0.2")
  .pan(sine.fast(2))
  .color('gray')
  .postgain("0.75".mul(lvl))
  ._scope(viz_params)

_VOX: s("vox/8").fit().add(note(34.15))
  .scrub( // Scrub let's you mash together subsections of a sound
    irand(16) // Select random values on the range 1-16
    .div(16) // Divide by 16 (map values between 0 and 1)
    .seg(8)) // Segment this to only choose 8 values on that range
    .rib(pick(rib_struct, speed), 1) // Choose a segment to loop (seed=15 (15th cycle, loop two cycles))  
  .fast(2)
  .compressor("-20:4:10:.005:.02") // "threshold:ratio:knee:attack:release"  <- vocals should have ratio of 3 or 4 and attack of 5ms
  .sometimesBy(0.1, ply("2|4"))
  .delay("0.2")
  .off(1/16, x=>x.add(note(12)).gain("0.3"))
  .room("0.4")
  .color('white')
  .postgain("0.5".mul(lvl))
  .legato(slider(1, 0.5, 1))
  .spectrum()

BASS: n("<0!8 <[2!3 -2!3 -3!2] [2!2 -2 4!2 -3 5!2]>@8>*8")
  .scale("[A2]:Major")
  .s("z_sawtooth")
  .off(1/16, x=>x.add(note(-12)))
  .jux(press)
  // .layer(
  //   x=>x.s("z_sawtooth"),
  //   x=>x.add(note(-12)).sound("sine")
  // )
  .legato("0.1")
  // .partials([1,1,1,1,0,0,0,0,0])
  .lpf(2000)
  .color('blue')
.gain(lvl)
._punchcard(viz_params)


DRUMS: pick(drums, speed)
  .postgain("0.5".mul(lvl))
  .color('#B53737')
  ._punchcard(viz_params)


all(x=>x.lpf(slider(2000, 1000, 6000)))
