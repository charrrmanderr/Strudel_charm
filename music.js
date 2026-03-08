setCpm(180/4)
samples({
  vox: 'vox_chorus.wav',
}, 'https://raw.githubusercontent.com/kai-xi/music4machines/main/samples/');

const lvl = 0.65

const fastbass = 
   note("< 0  0  0  0 2  [2@2 - -4 - [-4 -]]@3 \
          -1 -1 -1 -1 3  [3@2 - -5 - [-5 -]]@3 \
          -2 -2 -2 -2 [5 -2]  [[- 4] [- 3] [- 2]]@3 \
          -1 -1 -1 -1 [4 -1] [-1 3 -1 2 -1 [1 -1]]@3>*4")

const slowbass = 
   note("< 0 -  0 - 2  [2@2 - -4 - [-4 -]]@3 \
          -1 - -1 - 3  [3@2 - -5 - [-5 -]]@3 \
          -2 - -2 - 5  [[- 4] [- 3] [- 2]]@3 \
          -1 - -1 - 4  [-1 3 - 2 - [1 -]]@3>*4")

const bass_struct = [fastbass, slowbass]


$: n("<0 -4 -4 0 -4 <0 -2 -1 -3 -4> 2 -4>*8")
  .scale("G4:Minor")
  // .s("gm_lead_7_fifths:3")
  .s("tri")
  .gain(1.5)
  .legato(0.5)
  .add(note("[0,12]"))
  .room(0.5).delay("0.2")
  .lpf(slider(1,1,100).pow(2))
  .postgain(lvl)


// Add in some notes to the pedal :] give it 4, 5, 6, 7, 8, 9, 11, 14, they're all nice :p
const harm_simple = n("<0!16 1!16 2!16 -1!16>*2")
  .legato("0.2")
  .fast(4)
const harm_glitch = n("<0!8 1!8 2!8 -1!8>")
  .legato("0.2")
  .fast(4)
  .ply("<<<1 2> 1 2>*4 <2 2 2>>")
  .sometimesBy(0.7, ply("2"))

const gainlever = slider(1,0,1).mul("2")
PEDAL: n("[0]*16").scale("Bb4:Major").s("tri").gain(gainlever).postgain(lvl)
_PEDAL2: n("[1]*16").scale("Bb4:Major").s("tri")
HARM: arrange(
  [16, harm_simple],
  [16, harm_glitch])
  .scale('Bb4:Major')
  .s('tri')
  .gain(gainlever)
  .postgain(lvl)


_KICKDRUM: s("bd:1 - - [- <- bd:0>]").bank("RolandTR909")
KICKDRUM: s("bd:0").bank("RolandTR909").fast(2).postgain(lvl)
HIHAT: s("hh*8").bank("RolandTR808").ply("<[1|2] 1 2>*8").phaser("2").gain("2").lpf("7500").gain(0.75).postgain(lvl)
$: s("<- oh - ->").ply("8").delay("0.2").gain(0.5).postgain(lvl)

BASS: pick(bass_struct, "<0 0 0 1>/8")
  .scale("[G1]:Minor")
  .s("supersaw")
  .layer(
    x=>x.lpf(slider(100,1,100).pow(2)),
    x=>x.add(note(12)).lpf(slider(100,1,100).pow(2))
  )
  .gain(2)
  .postgain(lvl)

$: note("< 0  0  0  0 2  [2@2 - -4 - [-4 -]]@3 \
          -1 -1 -1 -1 3  [3@2 - -5 - [-5 -]]@3 \
          -2 -2 -2 -2 [5 -2]  [[- 4] [- 3] [- 2]]@3 \
          -1 -1 -1 -1 [4 -1] [-1 3 -1 2 -1 [1 -1]]@3>*4").scale("G4:Minor").s("gm_pad_poly").gain(1)
  .off(-1/16, x=>x.add(note(-12)))
  .off(1/8, x=>x.add(note(12)))
  .off(1/16, x=>x.add(note(24))).gain("<0.5 1 1 1>*8")
  .gain(0.5)
  .sometimes(ply("2"))
  .lpf(slider(10088,100).pow(2))
  .postgain(lvl)


////// VOX
const this_is = "< 0@5 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 0 \
                   0@16 \
                   33 34 35 36 37 38 39 40 41 42 43 44 45 0@3 \
                   0@11>*16"

const music = "< 0@16 \
                  0@8 14 15 16 17 18 19 20 21>*16"
const music_short = "< 0@8 14 15 16 17 18 19 20 21>*16"

const what_ill_see_in_dreams = "<48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63>*16"

const vocal_arr = arrange(
  [8, stack(
            s("vox").slice(32 * 4, this_is),
            s("vox").slice(32 * 4, pick([music, music_short], "<0 1>/2"))
              .slow("<1 2>/2")
              .add(note("<0@3 [0,7]>/2"))
              .pan(sine.range(0.2,0.8).fast(2))
          )
    ],
  [8, s("vox").slice(32 * 4, what_ill_see_in_dreams).add(note("<0 [0,[7 4 5 3]]>"))],
)

VOX_MEGA: vocal_arr
  .add(note(36))
  .compressor("-20:4:10:.005:.02") // "threshold:ratio:knee:attack:release"  <- vocals should have ratio of 3 or 4 and attack of 5ms
  .gain(3)
  .delay("<0 0.3>*4")
  .lpf(slider(100,1,100).pow(2))
  .postgain(lvl)

_VOX_SIMPLE: s("vox").slice(32 * 4, music)
  .slow(2)
  .gain(3)
  .add(note(36))
  .compressor("-20:4:10:.005:.02")
  .lpf(slider(40.303,1,100).pow(2))
  .postgain(lvl)

HI: n("0,2,4,7,14,16")
  .s("gm_pad_halo")
  .scale("<G3:Minor Bb3:Major Eb3:Major F3:Major\
           G3:Minor Bb3:Major Bb3:Major F3:Major>")
  .attack(0.3).sustain(0.5).decay(1).release(0.2)
  .vib("4:0.2")
  .lpf(slider(52.084,1,100).pow(2))
  .gain("2")
  .postgain(lvl)

CHIP: n(run("<4 8>/16"))
  .jux(rev)
  .s("gm_vibraphone")
  .chord("<Bb Gm Bb F>/4")
  .dict('ireal')
  .gain(3)
  .voicing()
  .lpf(slider(100,1,100).pow(2))
  .dec(.1).room(.2)
  .segment("<4 [2 8]>")
  .penv("<0 <2 -2>>").patt(.02).fast(2)
  .postgain(lvl)

const chops = arrange(
  [8, s("vox/16")
        .fit()
        .add(note(43))
        .scrub( // Scrub let's you mash together subsections of a sound
          irand(16) // Select random values on the range 1-16
          .div(16) // Divide by 16 (map values between 0 and 1)
          .seg(8)) // Segment this to only choose 8 values on that range
        .rib("<0 1 2 3 4 5 6 7 8>", 1) // Choose a segment to loop (seed=15 (15th cycle, loop two cycles))
        .sometimes(ply("2 | 4"))  // Almost never (10% of time) ply (repeat num beats)
    ],
  [8, s("vox").slice(32 * 4, "<64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79\
                            80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95\
                            96 97 98 99 100 101 102 103 104 105 106 107 108 109 110 111 \
                            112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127>*16")
        .add(note(36))]
)


_$: chops
  .compressor("-20:4:10:.005:.02") // "threshold:ratio:knee:attack:release"  <- vocals should have ratio of 3 or 4 and attack of 5ms
  .gain("4")
  .lpf(slider(22.879,1,100).pow(2))
  .postgain(lvl)
