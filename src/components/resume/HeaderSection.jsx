function HeaderSection({ resumeData }) {
  return (
    <header className="resume-header">
      <h1>{resumeData.meta.name}</h1>
      <p className="contact-info">
        {resumeData.meta.location} | (604) 698-8224 |{" "}
        {resumeData.meta.links.email} |{" "}
        <a
          href={resumeData.meta.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>{" "}
        |{" "}
        <a
          href={resumeData.meta.links.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </p>
    </header>
  );
}

export default HeaderSection;
