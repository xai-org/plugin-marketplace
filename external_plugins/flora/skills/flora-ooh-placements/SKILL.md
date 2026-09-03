---
name: flora-ooh-placements
description: Put a finished ad creative into the world as out-of-home placements — poster on a gable wall, transit platform panel, backlit bus shelter, construction hoarding. Use when someone asks to mock up an ad, see a poster in situ or in the wild, wants out-of-home or OOH placements, or asks how a campaign key visual would look on the street. The artwork is reproduced exactly and never regenerated. Do not use to create the artwork itself, and do not use to resize a creative for social.
---

# Out-of-home placements

Not an image generator. **A placement engine.** The creative already exists and is
finished. The only job is putting it into the world convincingly, four ways, without
altering it.

**Input:** one finished artwork (a URL or a file on disk), optionally a one-line brief.
**Output:** four placement images, their URLs, and the total cost.

## The law

> **The artwork is reproduced. The world is generated.**
> Any change to the creative — colour, crop, wording, letterforms, logo — is a fail.

What makes a mockup fail is never the photograph. It is the artwork drifting:
recoloured, recropped, re-lettered, a word dropped.

## Steps

1. **Resolve the workspace** with `flora_list_workspaces`. Ask which to bill if there
   is more than one.

2. **Get the artwork into FLORA.** If it is already a URL, pass it as `source` to
   `flora_create_asset`. If it is a local file, use the signed-URL path — create,
   `curl` the bytes up, `flora_complete_asset` — as the `flora` skill describes.
   Never base64-encode a file.

3. **Make or pick a project** — `flora_list_projects`, or `flora_create_project` for
   new work.

4. **State the cost and confirm.** Four generations on GPT Image 2, roughly $0.28
   each. Say the total and wait for a yes.

5. **Fire all four placements** with `flora_generate`, one call per site, in the same
   pass with no gap between them. Each call takes the placement prompt,
   `model: "i2i-gpt-image-2-i2i"`, and
   `params: { image_url: "<artwork url>", resolution: "4k" }`.

   **The artwork goes in `params.image_url` — a single string.** `image_urls` (plural,
   an array) is accepted without complaint, silently ignored, and still billed: you get
   a text-to-image render of your prompt with the creative nowhere in it.

6. **Poll** each `run_id` with `flora_get_run` until `completed` or `failed`.

7. **Report** each placement's URL and the total charged. If one is visibly wrong,
   say so in a sentence — do not re-roll it without asking.

## Model

**GPT Image 2 image-to-image (`i2i-gpt-image-2-i2i`) at `resolution: "4k"`, for every
placement.** Lowercase `4k`. Pass both in `params` alongside `image_url`. It holds the fine detail of the creative, which is usually
the artwork's identity, and it observes street environments well. 4k costs no more time
than 2k.

**Never Krea** — it reinterprets what you wire it, which is the one thing that must
never happen to the creative.

## The four sites

Fixed, because they are genuinely different media buys. Swap one only if the brief
names a specific environment.

| tag | what it is |
|---|---|
| `gable` | flat end wall of a building, arts district |
| `transit` | curved underground platform panel, artificial light |
| `shelter` | backlit 6-sheet bus shelter at street level |
| `hoarding` | construction hoarding at pavement level |

**Get variety from site and scale, never from camera angle.** The same wall from three
angles is one placement photographed three times.

## Prompt architecture

One invariant block, four scene lines. Only the scene changes.

```
Place the supplied artwork into a real photograph of the world as an out-of-home
advertisement.

THE ARTWORK IS REPRODUCED EXACTLY. Its composition, colours and type come through
unchanged. Do not recolour, recrop, redraw or re-letter it, do not add or remove a
word, do not add a logo. It reads clearly at a glance.

THE ARTWORK SITS ON THE SURFACE CORRECTLY. It takes the perspective of the surface
it is printed on, takes that scene's daylight and shadow, and picks up the surface
texture underneath. Printed material in a real place, never a flat rectangle pasted
onto a photo.

The photograph around it is real, candid and unstyled — ordinary weather, ordinary
light, ordinary passers-by. Full-frame camera, natural depth of field, no HDR, no
gloss, no lens flare, no CGI sheen.

THE WHOLE ARTWORK IS VISIBLE. Every edge of it sits inside the photograph — nothing
is cropped by the frame, cut off by a pole, hidden behind a tree or run off the top
of the wall.

No extra text anywhere beyond the artwork itself and signage that genuinely belongs
to that street.

THE CAMERA IS SQUARE ON TO THE ARTWORK. The lens is perpendicular to the printed
surface, so the ad sits in frame as a TRUE RECTANGLE, flat and undistorted, read
straight. Only slight keystone is acceptable.
- NO three-quarter view. NO oblique or angled view of the surface.
- The artwork NEVER wraps a corner and NEVER bends across two planes.
- No fisheye, no wide-angle bowing, no perspective warp through the type.

AND THE SURFACE ITSELF RUNS FLAT ACROSS THE FRAME. The wall, hoarding or panel does
not recede to a vanishing point and its far end is not visible. Both the artwork AND
the thing it is printed on face the camera.

THE HOUSE GRADE — the whole photograph is graded this way, and this matters as much
as the composition.

Shot on film and printed slightly flat. The tonal range is COMPRESSED: shadows deep
and neutral but never crushed, and the highlights ROLL OFF EARLY — nothing reaches
paper white, not the sky, not a lit sign. Low contrast, gentle S-curve, no punch.

A GREEN-CYAN CAST runs through the midtones and especially the highlights — skies,
pale walls, concrete and daylight lean eucalyptus and sea-green rather than blue or
warm. Reds and skin pulled back and desaturated. No orange-and-teal, no warm/cool
split. The cool green IS the light.

Colour moderately rich, never vivid. Fine film grain. Slight halation on the
brightest edges. No HDR, no clarity, no glow, no saturation boost.

THE PLACEMENT — <scene>
```

## Direction, per placement

Every scene line carries three things beyond the location:

```
SHOT     focal length, camera height, angle    e.g. 85mm compressed from down the road
LIGHT    time of day and what it does          e.g. overcast, wet road holding reflection
MOMENT   one human beat                        e.g. one person stopped on the far kerb
```

Without these the model defaults to eye-level, midday, nobody — and every placement
looks the same.

**Keep the human beat off the artwork's plane.** The invariant block bans the artwork
being hidden, but the MOMENT direction asks for a person near the ad, and the two pull
against each other. Say where the person is *relative to the ad* — in the near
foreground and cropped, at the far end of the shelter, stopped on the opposite kerb —
never just that they are in shot. "Walking past mid-frame" puts them across the panel.

## Rules

- **Square on, always.** Three-quarter and corner-wrap views bend the artwork across
  two planes; the type distorts and stops reading. This is the single biggest driver
  of placement quality.
- **One shot.** Four generations, no draft pass, no variant sprawl. Fire all four,
  then wait.
- **You cannot see the results.** Report URLs and let the user judge them.
- **Never re-roll without asking** — each retry bills again.
