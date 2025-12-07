import { resumeData } from "../data/resume.js";

function ResumeFront() {
  return (
    <div>
      <header>
        <h1>{resumeData.meta.name}</h1>
        <h2>{`${resumeData.meta.location} | (604) 698-8224 | ${resumeData.meta.links.email} | ${resumeData.meta.links.linkedin} | ${resumeData.meta.links.github}`}</h2>
      </header>
      <main>
        <section>
          <h3>SUMMARY</h3>
          <p>{resumeData.summary}</p>
        </section>
        <section>
          <h3>PROJECTS</h3>
          {resumeData.projects.map((project, index) => (
            <div key={index}>
              <h4>{project.title}</h4>
              <p>{project.stack.join(", ")}</p>
              <ul>
                {project.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
        <section>
          <h3>EXPERIENCE</h3>
        </section>
        <section>
          <h3>EDUCATION</h3>
        </section>
        <section>
          <h3>TECHNICAL SKILLS</h3>
        </section>
        <section>
          <h3>SOFT SKILLS</h3>
        </section>
        <section>
          <h3>HOBBIES</h3>
        </section>
      </main>
    </div>
  );
}

export default ResumeFront;
