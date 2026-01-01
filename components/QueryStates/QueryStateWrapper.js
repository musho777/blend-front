import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

const QueryStateWrapper = ({ query, children, loadingMessage }) => {
  const { isLoading, isError, error, refetch } = query;

  if (isLoading) {
    return <LoadingState message={loadingMessage} />;
  }

  if (isError) {
    return <ErrorState error={error} retry={refetch} />;
  }

  return children;
};

export default QueryStateWrapper;
