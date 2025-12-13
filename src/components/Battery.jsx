function Battery({ charge }) {
  return (
    <div className="battery">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className={`battery-segment ${index < charge ? 'charged' : ''}`}
        />
      ))}
    </div>
  );
}

export default Battery;