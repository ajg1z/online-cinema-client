export interface IVideoPlayerProps {
  videoSrc: string;
  slug: string;
  poster: string;
}

export interface IVideoElement extends HTMLVideoElement {
  msRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  webkitRequestFullscreen?: () => void;
}
