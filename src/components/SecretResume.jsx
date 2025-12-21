function SecretResume({ secretResumeData }) {
  return (
    <div className="secret-resume">
      <div className="secret-header">
        <h2>{secretResumeData.meta.name}</h2>
        <p>{secretResumeData.meta.location}</p>
        <p>{secretResumeData.meta.links.treat}</p>
      </div>

      <div className="secret-summary">
        <h3>Summary</h3>
        {secretResumeData.summary[0]}
      </div>

      <div className="secret-body">
        <div className="secret-image">
          <img 
            src="/images/finnegan.jpg" 
            alt="Finnegan the dog" 
            style={{ width: '150px', borderRadius: '10px' }} 
          />
        </div>

        <div className="secret-skills">
          <h3>Skills</h3>
          <ul>
            {secretResumeData.skills.map((skill) => (
              <li key={skill.name}>
                {skill.name} - {skill.level}
              </li>
            ))}
          </ul>
        </div>

        <div className="secret-hobbies">
          <h3>Hobbies</h3>
          <ul>
            {secretResumeData.hobbies.map((hobby) => (
              <li key={hobby}>{hobby}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="secret-education">
        <h3>Education</h3>
        <h4>{secretResumeData.education.institution}</h4>
        <p>
          {secretResumeData.education.degree} -
          {secretResumeData.education.period}
        </p>
        <p>{secretResumeData.education.details}</p>
      </div>
    </div>
  );
}

export default SecretResume;
