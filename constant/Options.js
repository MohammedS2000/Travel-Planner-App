export const SelectTravelerList = [
	{
		id: 1,
		title: "Just me",
		desc: "going in a journey alone",
		icon: "✈️",
	},
	{
		id: 2,
		title: "Family",
		desc: "going in a journey with family",
		icon: "🏡",
	},
	{
		id: 3,
		title: "Friends",
		desc: "going in a journey with friends",
		icon: "🫂",
	},
];

export const SelectBudgetList = [
	{
		id: 1,
		title: "Low",
		desc: "Be aware of the cost",
		icon: "💵",
	},
	{
		id: 2,
		title: "Medium",
		desc: "Keep the cost o the average side",
		icon: "💰",
	},
	{
		id: 3,
		title: "High",
		desc: "Dont worry about the cost",
		icon: "🤑",
	},
];

export const AiPrompt =
	"Generate Travel Plan make all the information real and not examples for Location:{location} and a picture url for the location, for {startDate}-{endDate} for {traveler} with a {budget} budget with flight details, flight price in dollars with booking url, Hotels option list with HotelName. HotelAddress, price in dollars per night, hotel image url, geo coordinates, rating, description. places to visit in {location} with placeName, place details, place image url, geo coordinates, ticket pricing or estimated cost, time to travel each of the location for the every day with each day plan, and make all prices in us dollars JSON format";
