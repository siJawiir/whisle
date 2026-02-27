export interface SpotifyBase {
  id: string;
  name: string;
}

export type DiscoverDataType =
  | SpotifyArtist
  | SpotifyTrack
  | SpotifyAlbum
  | SpotifyPlaylist;

export interface SpotifyImage {
  url: string;
  height?: number;
  width?: number;
}

export interface SpotifyExternalUrls {
  spotify: string;
}

export interface SpotifyFollowers {
  href: string | null;
  total: number;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  images: SpotifyImage[];
  type: "artist";
  external_urls: {
    spotify: string;
  };
  href: string;
  uri: string;
  genres?: string[];
  popularity?: number;
  followers?: {
    href: string | null;
    total: number;
  };
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  album_type: string;
  images: SpotifyImage[];
  release_date: string;
  total_tracks: number;
  artists: SpotifyArtist[];
  external_urls: SpotifyExternalUrls;
  type: "album";
  uri?: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  duration_ms: number;
  external_urls: SpotifyExternalUrls;
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  type: "track";
  uri?: string;
  explicit: boolean;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description?: string;
  images: SpotifyImage[];
  owner: {
    id: string;
    display_name: string;
  };
  external_urls: SpotifyExternalUrls;
  type: "playlist";
  uri?: string;
}

export type UniversalCardData =
  | SpotifyPlaylist
  | SpotifyAlbum
  | SpotifyArtist
  | SpotifyTrack;

export interface SpotifyPaginatedResponse<T> {
  items: T[];
  total: number;
  limit: number;
  next: string | null;
  previous: string | null;
}

export interface SpotifyDevice {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
  supports_volume?: boolean;
}

export interface SpotifyNowPlayingResponse {
  timestamp: number;
  device: SpotifyDevice;
  progress_ms: number;
  is_playing: boolean;
  currently_playing_type: "track" | "episode" | "ad" | "unknown";
  item: SpotifyTrack | null;
  shuffle_state: boolean;
  repeat_state: "off" | "track" | "context";
  smart_shuffle: boolean;
  context: {
    external_urls: SpotifyExternalUrls;
    href: string;
    type: string;
    uri: string;
  } | null;
}

export interface NowPlayingState {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
  progressMs: number;
  durationMs: number;
  deviceId: string;
  deviceName: string;
  volumePercent: number;
  shuffleState: boolean;
  repeatState: string;
}

export interface SpotifySearchResponse {
  tracks?: SpotifyPaginatedResponse<SpotifyTrack>;
  artists?: SpotifyPaginatedResponse<SpotifyArtist>;
  albums?: SpotifyPaginatedResponse<SpotifyAlbum>;
  playlists?: SpotifyPaginatedResponse<SpotifyPlaylist>;
}

export interface SavedAlbumItem {
  added_at: string;
  album: SpotifyAlbum;
}

export interface FollowedArtistsResponse {
  artists: SpotifyPaginatedResponse<SpotifyArtist>;
}

export interface SpotifyUserProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: SpotifyImage[];
  product: "premium" | "free" | "open";
  type: "user";
  uri: string;
}
