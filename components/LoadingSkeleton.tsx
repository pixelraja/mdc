export default function LoadingSkeleton() {
  return (
    <div className="loading-list" aria-label="Loading">
      {Array.from({ length: 9 }).map((_, index) => (
        <div className="loading-row" key={index}>
          <div className="skeleton" />
          <div className="skeleton short" />
        </div>
      ))}
    </div>
  );
}
