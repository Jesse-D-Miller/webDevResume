function HobbiesSection({ resumeData }) {
  return (
    <section className="hobbies-section">
      <h3>HOBBIES</h3>
      <div>
        {resumeData.hobbies.map((hobby, index) => (
          <p key={index}>{hobby}</p>
        ))}
      </div>
    </section>
  );
}

export default HobbiesSection;
