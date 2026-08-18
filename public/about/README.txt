About-page images.

INSTALLED
  photo-gorge.jpg           gallery #1   (portrait)
  photo-tram.jpg            gallery #2   (portrait)
  photo-vocalist.jpg        gallery #3   (portrait)
  photo-dance.jpg           gallery #4
  photo-football.jpg        gallery #5
  photo-badminton.jpg       gallery #6
      → gallery order is set by the array in src/data/about.ts; reorder there
  volleyball.jpg            volleyball rail #1 (landscape huddle)
  volleyball-portrait.jpg   volleyball rail #2 (portrait celebration)
  volleyball-team.jpg       volleyball rail #3 (team at the net)
  malaysian-night.jpg       Malaysian Night rail #1 (closing speech)
  malaysian-night-2.jpg     Malaysian Night rail #2 (directors on stage)
  rhmp.jpg                  RHMP stage manager card (portrait; rotated from HEIC)

STILL NEEDED
  piano.jpg                 piano hobby photo
      → In src/data/about.ts, find `hobbies.piano.media` and set:
            src: "/about/piano.jpg"
            alt: "<describe what the photo shows>"
        Until then the Piano block renders as text only — no empty container.

NOTES
  - The gallery uses object-fit: contain, so portrait and landscape both show
    in full with a warm mat filling the leftover space. No cropping.
  - Volleyball and Photography use borderless rails: every image keeps its own
    aspect ratio at a shared height, so portrait and landscape both work.
  - Involvement cards use object-fit: contain, so portrait works there too.
  - Some HEIC files store rotated pixels with no EXIF orientation flag; check
    the result after converting and rotate if needed.
  - HEIC must be converted:  sips -s format jpeg -Z 1600 in.HEIC --out out.jpg
  - All images here are resized to ~1400-1600px and have EXIF (incl. GPS)
    stripped. Do the same for anything new.
