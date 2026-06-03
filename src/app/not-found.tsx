export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-white">
      <h1 className="text-6xl font-display font-bold text-gradient mb-4">404</h1>
      <p className="text-muted-text text-lg mb-8">Page not found.</p>
      <a href="/" className="btn-primary">
        Go Home
      </a>
    </main>
  );
}
