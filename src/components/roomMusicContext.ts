import { createContext, useContext } from "react";

export type RoomMusicValue = {
  /** True while the background music is playing. */
  playing: boolean;
  /** Toggles sound on/off — governs BOTH music and interface clicks. */
  toggle: () => void;
  /**
   * Plays the short interface click, if sound is enabled. Safe to call
   * anywhere: it never throws, never blocks, and does nothing when muted.
   */
  playClick: () => void;
};

/** Kept out of the provider file so Fast Refresh keeps working there. */
export const RoomMusicContext = createContext<RoomMusicValue | null>(null);

export function useRoomMusic() {
  const ctx = useContext(RoomMusicContext);
  if (!ctx) throw new Error("useRoomMusic must be used inside RoomMusicProvider");
  return ctx;
}

/**
 * Convenience wrapper: returns an onClick handler that plays the interface
 * click and then runs whatever the component wanted to do.
 *
 * Navigation is never delayed — the sound is fired and forgotten.
 */
export function useClickSound() {
  const { playClick } = useRoomMusic();
  return playClick;
}
