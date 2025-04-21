const {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
} = require("@google/generative-ai");
// const fs = require("node:fs");
// const mime = require("mime-types");

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
	model: "gemini-2.0-flash",
});

const generationConfig = {
	temperature: 1,
	topP: 0.95,
	topK: 40,
	maxOutputTokens: 8192,
	responseModalities: [],
	responseMimeType: "application/json",
};
const desiredOutputFormat = `{
  "tripDetails": {
    "location": "...",
    "locationImageUrl": "..."
    "startDate": "...",
    "endDate": "...",
    "budget": "...",
    "travelers": "..."
  },
  "flights": {
    "arrival": {
      "airline": "...",
      "flightNumber": "...",
      "departureAirport": "...",
      "arrivalAirport": "...",
      "departureTime": "...",
      "arrivalTime": "...",
      "estimatedPrice": ...,
      "bookingUrl": "..."
    },
    "departure": {
      "airline": "...",
      "flightNumber": "...",
      "departureAirport": "...",
      "arrivalAirport": "...",
      "departureTime": "...",
      "arrivalTime": "...",
      "estimatedPrice": ...,
      "bookingUrl": "..."
    }
  },
  "hotels": [
    {
      "hotelName": "...",
      "hotelAddress": "...",
      "pricePerNight": "...",
      "imageUrl": "...",
      "geoCoordinates": {
        "latitude": ...,
        "longitude": ...
      },
      "rating": ...,
      "description": "...",
        }
      ]
    },
    {
      "hotelName": "...",
      "hotelAddress": "...",
      "pricePerNight": ...,
      "imageUrl": "...",
      "geoCoordinates": {
        "latitude": ...,
        "longitude": ...
      },
      "rating": ...,
      "description": "...",
    },
    {
      "hotelName": "...",
      "hotelAddress": "...",
      "pricePerNight": ...,
      "imageUrl": "...",
      "geoCoordinates": {
        "latitude": ...,
        "longitude": ...
      },
      "rating": ...,
      "description": "...",
    }
  ],
  "itinerary": {
    "Day 1": {
      "plan":{
      {
        "timeToTravel": "...",
        "placeName": "...",
        "estimatedCost": "...",
        "notes": "..."
      },
       {
        "timeToTravel": "...",
        "placeName": "...",
        "estimatedCost": "...",
        "notes": "..."
      },
       {
        "timeToTravel": "...",
        "placeName": "...",
        "estimatedCost": "...",
        "notes": "..."
      },
      {
        "timeToTravel": "...",
        "placeName": "...",
        "estimatedCost": "...",
        "notes": "..."
      },
      }
    },
    "Day 2": {
      "plan":{
      {
        "timeToTravel": "...",
        "placeName": "...",
        "estimatedCost": "...",
        "notes": "..."
      },
       {
        "timeToTravel": "...",
        "placeName": "...",
        "estimatedCost": "...",
        "notes": "..."
      },
       {
        "timeToTravel": "...",
        "placeName": "...",
        "estimatedCost": "...",
        "notes": "..."
      },
      {
        "timeToTravel": "...",
        "placeName": "...",
        "estimatedCost": "...",
        "notes": "..."
      }
      }
    },
    "Day 3": {
      "plan":{
      {
        "timeToTravel": "...",
        "placeName": "...",
        "estimatedCost": "...",
        "notes": "..."
      },
       {
        "timeToTravel": "...",
        "placeName": "...",
        "estimatedCost": "...",
        "notes": "..."
      },
       {
        "timeToTravel": "...",
        "placeName": "...",
        "estimatedCost": "...",
        "notes": "..."
      },
      {
        "timeToTravel": "...",
        "placeName": "...",
        "estimatedCost": "...",
        "notes": "..."
      }
      }
    },
  },
  "budgetSummary": {
    "flights": ...,
    "hotel": ...,
    "activities": ...,
    "food": ...,
    "transportation": ...,
    "totalEstimatedCost": ...
  }
}`;

export const chatSession = model.startChat({
	generationConfig,
	history: [
		{
			role: "user",
			parts: [
				{
					text: `From now on, please respond to my travel planning requests using the exact JSON format as shown below. Do not deviate from the keys, structure, or data types. Fill in the details based on the location, dates, budget, and other parameters I provide in my subsequent prompts.

\`\`\`json
${desiredOutputFormat}
\`\`\``,
				},
			],
		},
		{
			role: "model",
			parts: [
				{
					text: "Understood. I will respond to your travel planning requests in the specified JSON format, ensuring all keys, structure, and data types are adhered to.",
				},
			],
		},
	],
});
