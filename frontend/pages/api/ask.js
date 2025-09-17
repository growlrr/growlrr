export default function handler(req, res) {
  if (req.method === "POST") {
    return res.status(200).json({ answer: "Coming soon..." });
  }
  res.setHeader("Allow", "POST");
  res.status(405).json({ error: "Method not allowed" });
}
