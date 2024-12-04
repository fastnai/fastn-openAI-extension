export async function summarizeWebpage(
  url: string,
  apiKey: string,
  model: string
): Promise<string> {
  try {
    const response = await fetch(
      "https://qa.fastn.ai/api/v1/webScrappingWithSummarization",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-fastn-api-key": "3b6e8343-14e5-4099-8a68-a5af9580b748",
          "x-fastn-space-id": "4f3e3214-1991-4ea5-b826-ea2abdccad27",
          "x-fastn-space-tenantid": "",
          stage: "LIVE",
        },
        body: JSON.stringify({
          input: {
            url: url,
            apiKey: apiKey,
            model: model,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    // Assuming the API returns the summary in the response
    // Adjust this based on the actual API response structure
    return data.output || "No summary available";
  } catch (error) {
    console.error("Error summarizing webpage:", error.message);

    // Check if the error is due to an invalid API key
    if (error.message.includes("Incorrect API key")) {
      throw new Error("Invalid API key provided. Please check your API key.");
    }

    // Return a generic error message for other types of errors
    throw new Error("Failed to generate summary. Please try again.");
  }
}
