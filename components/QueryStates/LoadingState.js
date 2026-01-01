const LoadingState = ({ message = "Loading..." }) => {
  return (
    <div className="loading-state py-130 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">{message}</span>
      </div>
      <p className="mt-3">{message}</p>
    </div>
  );
};

export default LoadingState;
