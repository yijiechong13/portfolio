Experience-page images.

INSTALLED
  office-portrait.jpg   hero photo    (beside the intro)
  team.jpg              Moments       (intern team at the office sign)

WHERE TO CHANGE THESE
  All image paths, alt text and captions live in:  src/data/experience.ts

    hero.photo              → the hero image (crop via `objectPosition`)
    moments.images[]        → 1-3 photos; the section hides when empty

ADDING MORE MOMENTS PHOTOS
  Drop the file here, then append an entry to moments.images with:
    { src, alt, placeholderLabel, caption?, credit?, ratio? }
  The layout adapts automatically to 1, 2 or 3 images.

NOTES
  - HEIC must be converted:  sips -s format jpeg -Z 1600 in.HEIC --out out.jpg
    Some HEIC files store rotated pixels with no EXIF flag — check the result.
  - EXIF (incl. GPS) is stripped from everything here; do the same for new files.
  - Do NOT add photos showing confidential screens, customer data, internal
    systems, documents, access cards, or people who have not agreed to appear.
