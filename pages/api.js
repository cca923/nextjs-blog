// Creating API Routes

export default function handler(req, res) {
  res.status(200).json({ text: "Hello" });
}

// Do Not Fetch an API Route from getStaticProps or getStaticPaths
