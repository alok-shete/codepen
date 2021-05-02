export default function Loading() {
  return (
    <div className="cust-spinner-main">
      <div className="cust-spinner-container">
        <div>
          <div
            className="cust-spinner-grow cust-spinner-text-primary"
            role="status"
          >
            <span className="cust-spinner-sr-only"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
