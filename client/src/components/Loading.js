export default function Loading() {
  return (
    <div className="vh-100">
      <div className="text-center loading">
        <div className="spinner-border text-dark" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}
