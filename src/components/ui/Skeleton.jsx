export default function Skeleton({
  variant = "rectangle",   // rectangle | circle | text
  width = "w-full",
  height = "h-4",
  lines = 1,
  className = "",
}) {
  // Text skeleton (multiple lines)
if (variant === "text") {
  return (
    <span className={className}>
      {Array(lines)
        .fill(0)
        .map((_, i) => (
          <span
            key={i}
            className={`block bg-gray-200 animate-pulse rounded-sm ${width} ${height} ${
              i !== 0 ? "mt-2" : ""
            }`}
          />
        ))}
    </span>
  );
}
  // Circle or rectangle
  const shape =
    variant === "circle" ? "rounded-full" : "rounded-md";

  return (
    <div
      className={`bg-gray-200 animate-pulse ${shape} ${width} ${height} ${className}`}
    />
  );
}
