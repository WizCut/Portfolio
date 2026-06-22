import { MdArrowOutward } from "react-icons/md";
import "./styles/Contact.css";
const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:wizcut007@gmail.com" data-cursor="disable">
                wizcut007@gmail.com
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://www.instagram.com/wiz_cut2003"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
            <a
              href="https://www.reddit.com/user/WhiteFang_2003/"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Reddit <MdArrowOutward />
            </a>
            <a
              href="https://github.com/WizCut"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box"></div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
