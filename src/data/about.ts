/* ===========================================================================
   About page content.

   ALL editable copy and image references live here — not in the JSX — so the
   page can be updated without touching layout code.

   TO ADD REAL PHOTOS:
     1. Drop the file into `public/about/` (create the folder).
     2. Set `src` below to the public path, e.g. "/about/volleyball.jpg".
     3. Update `alt` to describe the actual photo.
   Leaving `src` as null renders a labelled placeholder tile instead.
   =========================================================================== */

export type Media = {
  /** Public path, e.g. "/about/piano.jpg". null → nothing renders. */
  src: string | null;
  /** Describe the image for screen readers. Required when src is set. */
  alt: string;
  /** Label used only by dev placeholders / aria fallbacks. */
  placeholderLabel: string;
  /** Optional line shown under the image (and in the lightbox). */
  caption?: string;
  /** Optional photographer or source credit. */
  credit?: string;
  /**
   * CROP CONTROL — where the editorial thumbnail centres, e.g. "center 30%".
   * Tune this per image to keep faces visible. Ignored in `natural` mode.
   */
  objectPosition?: string;
  /** Optional outbound link (e.g. a video). */
  externalLink?: string;
  /**
   * Marks a portrait source so it keeps its natural ratio (height-capped)
   * instead of being cropped into a landscape box.
   */
  portrait?: boolean;
};

export type GalleryItem = Media & {
  title?: string;
  category?: string;
  caption?: string;
};

/* ------------------------------------------------------------ intro ----- */

export const intro = {
  heading: "More about me",
  paragraph:
    "I’m a Computer Science student who enjoys turning ideas into complete, useful experiences. While I enjoy working across both frontend and backend development, I’m equally shaped by the communities, creative work and interests I pursue beyond the screen.",
};

/* ----------------------------------------------------------- hobbies ---- */

export const hobbies = {
  heading: "Beyond the code",
  intro:
    "When I’m away from my screen, you’ll usually find me on a volleyball court, capturing small moments through my camera, or at the piano.",
  volleyball: {
    title: "Volleyball",
    description:
      "I enjoy the energy of team sports—the communication, quick decisions and satisfaction of improving together.",
    /**
     * Shown as a borderless rail, like Photography: each image keeps its own
     * aspect ratio at a shared height, so the portrait shot reads narrow and
     * the landscape one wide. Add more entries here to extend the rail.
     */
    images: [
      {
        src: "/about/volleyball.jpg",
        alt: "A volleyball team gathering in a huddle on court, hands stacked in the centre",
        placeholderLabel: "Volleyball photo",
      },
      {
        src: "/about/volleyball-portrait.jpg",
        alt: "Teammates celebrating together on court after a point",
        placeholderLabel: "Volleyball celebration photo",
      },
      {
        src: "/about/volleyball-team.jpg",
        alt: "The volleyball team posing together in front of the net after training",
        placeholderLabel: "Volleyball team photo",
      },
    ] as Media[],
  },
  piano: {
    title: "Piano",
    description:
      "Piano gives me a quieter creative space to slow down, focus and enjoy the process of improving.",
    media: {
      src: null,
      alt: "",
      placeholderLabel: "Piano photo",
    } as Media,
  },
  photography: {
    title: "Photography",
    description:
      "Photography encourages me to slow down and notice the details, light and moments that might otherwise pass unnoticed.",
  },
};

/* Photography gallery.

   ORDER — the rail follows this array top to bottom. Reorder freely:
     1. Gorge      2. Tram        3. Vocalist
     4. Dance      5. Football    6. Badminton

   Each image keeps its own aspect ratio at a shared display height, so
   portrait and landscape sit side by side without cropping or letterboxing.
   To add one: drop the file in `public/about/`, then append an entry with
   `src` and a descriptive `alt`. */
export const galleryItems: GalleryItem[] = [
  {
    src: "/about/photo-gorge.jpg",
    alt: "Rowing boats on turquoise water beneath a waterfall in a steep, mossy gorge",
    placeholderLabel: "Boats in a river gorge",
  },
  {
    src: "/about/photo-tram.jpg",
    alt: "A vintage tram waiting at a city stop at dusk, with paper lanterns strung overhead",
    placeholderLabel: "Tram at dusk",
  },
  {
    src: "/about/photo-vocalist.jpg",
    alt: "A vocalist singing into a microphone under deep red and blue stage light, with a bassist behind",
    placeholderLabel: "Vocalist on stage",
  },
  {
    src: "/about/photo-dance.jpg",
    alt: "Dancers performing in formation under deep red stage light",
    placeholderLabel: "Dance performance",
  },
  {
    src: "/about/photo-football.jpg",
    alt: "A footballer shielding the ball from an opponent on a floodlit pitch at night",
    placeholderLabel: "Football under floodlights",
  },
  {
    src: "/about/photo-badminton.jpg",
    alt: "A badminton player lunging forward to return a shuttlecock in an indoor hall",
    placeholderLabel: "Badminton rally",
  },
];

/* -------------------------------------------------- campus involvement -- */

export type Involvement = {
  organisation: string;
  /** Role or context line. Editable — leave as-is until confirmed. */
  role: string;
  /** EDITABLE — add the academic years once confirmed, e.g. "AY23/24". */
  dates?: string;
  description: string;
  highlight?: string;
  /** A single photo. Use `images` instead when an entry has several. */
  media?: Media;
  /** Two or more photos — rendered as a borderless rail. */
  images?: Media[];
  /** Optional outbound link, e.g. a video the description refers to. */
  link?: { href: string; label: string };
};

export const involvement = {
  heading: "Earlier campus involvement",
  period: "Years 1–2",
  note: "Some of the communities and experiences that shaped my earlier university years.",
  items: [
    {
      organisation: "Malaysian Night 2024",
      role: "Project Director",
      description:
        "Led the end-to-end planning and delivery of a community-building event for approximately 140 Malaysian students at NUS. Coordinated committees responsible for programme planning, logistics and on-ground execution, while aligning the group leaders supporting participants throughout the event.",
      highlight: "140 attendees",
      images: [
        {
          src: "/about/malaysian-night.jpg",
          alt: "The three Malaysian Night project directors giving the closing speech on stage",
          placeholderLabel: "Event photo",
        },
        {
          src: "/about/malaysian-night-2.jpg",
          alt: "The project directors standing on stage in front of the closing speech slide",
          placeholderLabel: "Event photo",
        },
      ],
    },
    {
      organisation: "Raffles Hall Musical Production",
      role: "Stage Manager",
      description:
        "Worked behind the scenes to coordinate stage activity and support the production.",
      images: [
        {
          src: "/about/rhmp.jpg",
          alt: "The production crew standing together on stage, with the empty auditorium behind them",
          placeholderLabel: "Production photo",
        },
        {
          src: "/about/rhmp-2.jpg",
          alt: "Cast and crew gathered on stage under blue and amber production lighting",
          placeholderLabel: "Production photo",
        },
      ],
    },
    {
      organisation: "Phoenix Studio",
      role: "Videography Team",
      description:
        "Collaborated with the team to film and edit videos documenting Raffles Hall events. One of my proudest projects was the team’s Inter-Hall Games (IHG) coverage, where I contributed to both filming and post-production.",
      link: {
        href: "https://youtu.be/DoHKEtgVMmo",
        label: "Watch the IHG video",
      },
    },
    {
      organisation: "Raffles Hall Volleyball",
      role: "Vice-President",
      // dates: "AY__/__",  ← add the academic years once confirmed.
      description:
        "Found community through volleyball while developing teamwork and communication on the court.",
      // No photo supplied for this entry yet. Add `media: { src, alt,
      // placeholderLabel }` here and it will render below the description.
    },
  ] as Involvement[],
};

/* --------------------------------------------------------------- cta ---- */

export const cta = {
  heading: "Let’s build something meaningful",
  text: "I’m always happy to connect, exchange ideas or learn about opportunities to create useful digital experiences.",
  buttonLabel: "Get in touch",
  /** Existing contact route — do not create a second contact system. */
  to: "/contact",
};
