import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to My <span className="highlight-green">Portfolio</span>
          </h1>
          <p className="hero-subtitle">
            I'm a passionate developer creating amazing digital experiences.
            Explore my projects and read my thoughts on the latest tech trends.
          </p>
          <div className="hero-buttons">
            <Link to="/projects" className="btn btn-primary">
              View Projects
            </Link>
            <Link to="/blog" className="btn btn-outline">
              Read Blog
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-shape"></div>
        </div>
      </section>

      <section className="section about-section">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I specialize in building modern web applications using cutting-edge technologies.
              With a strong foundation in both front-end and back-end development,
              I create seamless user experiences that make a difference.
            </p>
            <p>
              When I'm not coding, you can find me writing about technology,
              exploring new frameworks, and contributing to open-source projects.
            </p>
          </div>
          <div className="skills-container">
            <h3 className="skills-title">My Skills</h3>
            <div className="skills-grid">
              <div className="skill-tag">React</div>
              <div className="skill-tag">Node.js</div>
              <div className="skill-tag">MongoDB</div>
              <div className="skill-tag">Express</div>
              <div className="skill-tag">JavaScript</div>
              <div className="skill-tag">TypeScript</div>
              <div className="skill-tag">REST APIs</div>
              <div className="skill-tag">Git</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Let's Work Together</h2>
          <p className="cta-text">
            Have a project in mind? I'd love to hear from you!
          </p>
          <Link to="/contact" className="btn btn-accent">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
