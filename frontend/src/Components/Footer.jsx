import { useEffect } from "react"
import "./Footer.css"
import feather from "feather-icons"

const Footer = () => {
  useEffect(() => {
    feather.replace() // Replaces the <i data-feather> elements with SVG icons
  }, [])
  return (
    <footer className="footer" id="about">
      <div className="footer__parralax">
        <div className="footer__parralax-trees"></div>
        <div className="footer__parralax-moto"></div>
        <div className="footer__parralax-secondplan"></div>
        <div className="footer__parralax-premierplan"></div>
        <div className="footer__parralax-voiture"></div>
      </div>
      <div className="container">
        <div className="footer__columns">
          <div className="footer__col">
            <h3 className="footer__col-title">
              <i data-feather="shopping-bag"></i> <span>About me:</span>
            </h3>
            <nav className="footer__nav">
              <ul className="footer__nav-list">
                <li className="footer__nav-item">
                  <h7 className="footer__nav-link">Web Enthusiast & Innovator</h7>
                </li>
                <li className="footer__nav-item">
                  <h7 className="footer__nav-link">Engineering Student</h7>
                </li>
                <li className="footer__nav-item">
                  <h7 className="footer__nav-link">Tech-Driven Creator</h7>
                </li>
                <li className="footer__nav-item">
                  <h7 className="footer__nav-link">Project Enthusiast</h7>
                </li>
                <li className="footer__nav-item">
                  <h7 className="footer__nav-link">Continuous Learner</h7>
                </li>
              </ul>
            </nav>
          </div>
          <div className="footer__col">
            <h3 className="footer__col-title">
              <i data-feather="share-2"></i> <span>Tag me on:</span>
            </h3>
            <nav className="footer__nav">
              <ul className="footer__nav-list">
                <li className="footer__nav-item">
                  <a href="https://www.youtube.com/@superbro1476" className="footer__nav-link">
                    <i data-feather="youtube"></i>
                    <span>Youtube</span>
                  </a>
                </li>
                {/* <li className="footer__nav-item">
              <a href="./Social.jsx" className="footer__nav-link">
                <i data-feather="instagram"></i><span>Instagram</span>
                
              </a>
            </li> */}
                <li className="footer__nav-item">
                  <a href="https://www.linkedin.com/in/rushikesh-sapkal007/" className="footer__nav-link">
                    <i data-feather="linkedin"></i>
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li className="footer__nav-item">
                  <a href="https://x.com/Rushikesh_S_69" className="footer__nav-link">
                    <i data-feather="twitter"></i>
                    <span>Twitter</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="footer__col">
            <h3 className="footer__col-title">
              <i data-feather="send"></i> <span>Contact</span>
            </h3>
            <nav className="footer__nav">
              <ul className="footer__nav-list">
                <li className="footer__nav-item">
                  <a href="https://g.co/kgs/2Xdf2zd" className="footer__nav-link">
                    rushikeshsapkal930@gmail.com
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="footer__copyrights">
          <p>
            Want to know more about me?{" "}
            <a href="https://rushikesh-sapkal-portfolio.vercel.app" target="_blank" rel="noreferrer">
              Check me out!
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

