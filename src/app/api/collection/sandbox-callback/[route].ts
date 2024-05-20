import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract route parameter from the request
  const { route } = req.query;

  // Process callback logic based on the route parameter
  switch (route) {
    case "callback1":
      // Callback logic for route "callback1"
      console.log("Callback 1 processed successfully");

      res.status(200).json({ message: "Callback 1 processed successfully" });
      break;
    case "callback2":
      console.log("Callback 2 processed successfully");

      // Callback logic for route "callback2"
      res.status(200).json({ message: "Callback 2 processed successfully" });
      break;
    default:
      console.log("Callback undefined processed successfully");

      // Handle invalid routes
      res.status(404).json({ error: "Route not found" });
  }
}
