import { useState } from "react";
import finneganImg from "../assets/finneganImg.jpeg";

const dogTreat = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#000000ff"
  >
    <path d="M380-80q-59 0-99.5-40.5T240-220q0-9 2.5-14t-.5-8q-3-3-8-.5t-14 2.5q-59 0-99.5-40.5T80-380q0-59 40.5-99.5T220-520q23 0 42 6t36 18l166-166q-12-17-18-36t-6-42q0-59 40.5-99.5T580-880q59 0 99.5 40.5T720-740q0 9-2.5 14t.5 8q3 3 8 .5t14-2.5q59 0 99.5 40.5T880-580q0 59-40.5 99.5T740-440q-23 0-42-6t-36-18L496-298q12 17 18 36t6 42q0 59-40.5 99.5T380-80Zm0-80q26 0 43-17t17-43q0-9-2.5-17.5T430-254q-17-24-14-51.5t24-48.5l166-166q21-21 48.5-24t51.5 14q8 5 16.5 7.5T740-520q26 0 43-17t17-43q0-26-17-43t-43-17q-35 0-49-3.5T662-662q-15-15-18.5-29t-3.5-49q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 11 2 18.5t8 15.5q17 24 14 51.5T520-606L354-440q-21 21-48.5 24T254-430q-8-5-16.5-7.5T220-440q-26 0-43 17t-17 43q0 26 17 43t43 17q35 0 49 3.5t29 18.5q15 15 18.5 29t3.5 49q0 26 17 43t43 17Zm100-320Z" />
  </svg>
);

function SecretResume({ secretResumeData }) {
  const [treatStatus, setTreatStatus] = useState("idle");
  const meta = secretResumeData?.meta || {};
  const links = meta.links || {};
  const summary = secretResumeData?.summary || "";
  const skills = secretResumeData?.skills || [];
  const hobbies = secretResumeData?.hobbies || [];
  const education = secretResumeData?.education || [];
  const name = meta.name || "";
  const location = meta.location || "";

  const handleTreatClick = async () => {
    if (treatStatus !== "idle") return;
    setTreatStatus("sending");
    try {
      await fetch("src/utils/dogTreat.js", { method: "POST" });
    } finally {
      setTreatStatus("sent");
    }
  };
  return (
    <div className="secret-resume">
      <div className="secret-header">
        <h1>{name}</h1>
        <p>
          {location} |{" "}
          <button
            type="button"
            className="secret-treat-button"
            onClick={handleTreatClick}
            aria-disabled={treatStatus !== "idle"}
          >
            {treatStatus === "sent"
              ? "Treat sent!"
              : links.treat ||
                "Click here and I'll give Finnegan a treat on your behalf!"}
          </button>{" "}
          | {dogTreat}
        </p>
      </div>

      <div className="secret-summary">
        <h3>Summary</h3>
        <p>{summary}</p>
      </div>

      <div className="secret-left-right">
        <div className="secret-image">
          <img
            src={finneganImg}
            alt="Finnegan the dog"
            loading="lazy"
          />
        </div>

        <div className="secret-right">
          <div className="secret-skills">
            <h3>Skills</h3>
            <ul>
              {skills.map((skill, index) => (
                <li key={skill.id ?? skill.name ?? index}>{skill.name}</li>
              ))}
            </ul>
          </div>

          <div className="secret-hobbies">
            <h3>Hobbies</h3>
            <ul>
              {hobbies.map((hobby, index) => (
                <li key={hobby ?? index}>{hobby}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="secret-education">
        <h3>Education</h3>
        {education.map((item, index) => (
          <div key={item.id ?? item.institution ?? index}>
            <h4>{item.institution}</h4>
            <p>
              {item.degree} - {item.period}
            </p>
            <p>{item.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SecretResume;
