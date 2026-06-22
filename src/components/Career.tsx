import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Assistant Editor</h4>
                <h5>Video Editing Agency</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Supported the post-production workflow for a video editing agency,
              assisting with cutting footage, organizing media, syncing audio,
              and delivering polished content for clients. Developed a strong
              understanding of storytelling, pacing, and industry-standard editing techniques.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Video Editor</h4>
                <h5>Video Editing Agency</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Worked as a full-time Video Editor, creating engaging content for social media,
              promotional campaigns, and branded projects. Collaborated closely with clients
              and creative teams to transform ideas into visually compelling videos while ensuring
              high-quality and timely delivery.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Editor</h4>
                <h5>Freelancing</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Currently working as a freelance Senior Editor, helping businesses,
              creators, and brands bring their vision to life through cinematic and
              impactful video content. Specializing in smooth transitions, color grading,
              sound design, and crafting edits that capture attention and leave a lasting impression.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
