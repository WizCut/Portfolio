import "./styles/Work.css";
import WorkVideo from "./WorkVideo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  category: string;
  tools: string;
  video: string;
  aspectRatio: "portrait" | "landscape";
  link?: string;
}

const projects: Project[] = [
  {
    title: "AD",
    category: "Brand Advertisement",
    tools: "Premiere Pro, After Effects",
    video: "/videos/ad-hook.mp4",
    aspectRatio: "portrait",
  },
  {
    title: "Food Reel",
    category: "Short Form",
    tools: "Premiere Pro, After Effects",
    video: "/videos/buk.mp4",
    aspectRatio: "portrait",
  },
  {
    title: "Event Reel",
    category: "Organisation Advertisement",
    tools: "Premiere Pro, DaVinci Resolve",
    video: "/videos/osterley-reel.mp4",
    aspectRatio: "landscape",
  },
  {
    title: "Sports VSL",
    category: "Brand Advertisement",
    tools: "Premiere Pro, After Effects",
    video: "/videos/sports-vsl.mp4",
    aspectRatio: "landscape",
  },
  {
    title: "Food YouTube Video",
    category: "Long Form",
    tools: "Premiere Pro, DaVinci Resolve",
    video: "/videos/tower-bridge.mp4",
    aspectRatio: "landscape",
  },
  {
    title: "Travel Reel",
    category: "Short Form",
    tools: "Premiere Pro, After Effects",
    video: "/videos/travel-reel.mp4",
    aspectRatio: "portrait",
  },
  {
    title: "Travel VLog",
    category: "Long Form",
    tools: "Premiere Pro, After Effects",
    video: "/videos/travel-vlog.mp4",
    aspectRatio: "portrait",
  },
];

const Work = () => {
  useEffect(() => {
    const workFlex = document.querySelector(".work-flex") as HTMLElement;

    const getScrollAmount = () => {
      if (!workFlex) return 0;
      // offsetWidth is the full width of work-flex (all cards + padding-right).
      const totalWidth = workFlex.offsetWidth;
      const viewportWidth = window.innerWidth;

      // work-flex has a negative margin-left (e.g. -80px), which shifts it left.
      // We parse it so the scroll amount correctly accounts for that offset.
      const marginLeft = Math.abs(
        parseInt(getComputedStyle(workFlex).marginLeft, 10) || 0
      );

      // Scroll until the last card's right edge aligns with the viewport right edge.
      // The negative margin-left means content already starts further left, so we
      // subtract it (we need less total rightward scroll).
      return -(totalWidth - viewportWidth - marginLeft);
    };

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${Math.abs(getScrollAmount())}`,
        scrub: 1,
        pin: true,
        id: "work",
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: getScrollAmount,
      ease: "none",
    });

    // Clean up
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
              </div>
              <WorkVideo
                video={project.video}
                aspectRatio={project.aspectRatio}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
