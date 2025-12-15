function SummarySection({ resumeData }) {
  return (
    <section className="summary-section">
      <h3>SUMMARY</h3>
      <p>{resumeData.summary}</p>
    </section>
  );
}

export default SummarySection;
