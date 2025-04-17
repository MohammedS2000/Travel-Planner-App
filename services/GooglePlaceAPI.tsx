export const GetPhotoRef = async (placeName) => {
	const resp = await fetch(
		`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${placeName}&key=AIzaSyCPtTP_qtHtiEE6rST9J3mPOe7m_2WO-ps`, // Replace YOUR_API_KEY
	);
	const result = await resp.json();

	return result;
};
