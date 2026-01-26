import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 text-center">
      {/* Error Code */}
      <h1 className="text-8xl md:text-9xl font-bold text-primary font-heading">
        404
      </h1>

      {/* Divider */}
      <div className="h-1 w-16 rounded bg-primary my-5 md:my-7"></div>

      {/* Title */}
      <p className="text-2xl md:text-3xl font-semibold text-text">
        Page Not Found
      </p>

      {/* Description */}
      <p className="mt-4 text-sm md:text-base text-text-muted max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      {/* Action */}
      <div className="mt-8">
        <Link
          to="/"
          className="
            inline-flex items-center justify-center
            px-7 py-2.5 rounded-lg
            font-medium text-text-inverse
            bg-linear-to-br from-primary to-primary-dark
            hover:-translate-y-0.5
            hover:shadow-[0_10px_20px_var(--color-primary)/30]
            transition-all active:scale-95
          "
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
