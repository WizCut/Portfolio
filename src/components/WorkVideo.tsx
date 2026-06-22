import { useRef, useEffect, useState } from "react";
import { MdArrowOutward, MdVolumeOff, MdVolumeUp, MdFullscreen } from "react-icons/md";

interface Props {
  video: string;
  link?: string;
  aspectRatio?: "portrait" | "landscape";
}

const WorkVideo = (props: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Ensure video plays when it comes into view
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div
      className={`work-video ${props.aspectRatio === "portrait" ? "work-video--portrait" : "work-video--landscape"}`}
    >
      <div className="work-video-in">
        {props.link && (
          <a
            className="work-link"
            href={props.link}
            target="_blank"
            rel="noreferrer"
            title="Visit Link"
          >
            <MdArrowOutward />
          </a>
        )}
        
        <div className="work-video-controls">
          <button className="control-btn" onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
            {isMuted ? <MdVolumeOff /> : <MdVolumeUp />}
          </button>
          <button className="control-btn" onClick={toggleFullscreen} title="Fullscreen">
            <MdFullscreen />
          </button>
        </div>

        <video
          ref={videoRef}
          src={props.video}
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          onClick={toggleMute}
        />
      </div>
    </div>
  );
};

export default WorkVideo;
