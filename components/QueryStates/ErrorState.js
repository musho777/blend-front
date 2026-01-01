const ErrorState = ({ error, retry }) => {
  return (
    <div className="error-state py-130 text-center">
      <div className="error-icon mb-3">
        <i className="fas fa-exclamation-triangle text-danger fa-3x"></i>
      </div>
      <h4>Oops! Something went wrong</h4>
      <p className="text-muted mb-4">
        {error?.message || "Failed to load data"}
      </p>
      {retry && (
        <button onClick={retry} className="theme-btn">
          Try Again <i className="far fa-redo" />
        </button>
      )}
    </div>
  );
};

export default ErrorState;
