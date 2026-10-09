// Renders text with its *starred* word set in the graffiti face.
export default function Tagline({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`display ${className}`}>
      {text.split("*").map((part, i) => (i % 2 ? <span key={i} className="tag">{part}</span> : part))}
    </span>
  );
}
