"use client";

import { Button } from "@/components/ui/button";
import { getAccessToken } from "../../api/oauth/route";

export default function FetchUserPlans() {
  const customerId = 27811111111;
  async function buttonClickListener() {
    console.log("fetchhing...");
    const accessToken = await getAccessToken();

    try {
      const response = await fetch(`/api/plan/v2`, {
        method: "POST",
        body: JSON.stringify({
          transactionId: "21136326745558",
          consumerId: "GakskeG0fhvjjd8GzQJWjHjUT4gWqy6h",
          customerId: "256776239674",
          accessToken,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("reponse: ", data.message);
      }
    } catch (error) {
      console.error("Error fetching plans: ", error);
    }
  }
  return <Button onClick={buttonClickListener}>Fetch User plans</Button>;
}
