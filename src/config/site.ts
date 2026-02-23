export const siteConfig = {
  name: "Whisle",
  description:
    "Whisle is a music discovery and streaming platform that allows users to explore, listen, and share their favorite tunes. With a sleek and intuitive interface, Whisle offers personalized playlists, curated recommendations, and seamless integration with popular music services. Whether you're a casual listener or a music enthusiast, Whisle provides an immersive experience to discover new artists, genres, and tracks that resonate with your unique taste.",
  url:
    process.env.NODE_ENV === "production"
      ? "https://whisle.vercel.app"
      : "http://127.0.0.1:3000",
};
