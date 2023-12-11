// DetailScreen.js
import React from 'react';
import { ScrollView, Text } from 'react-native';

const DetailScreen = ({ route }) => {
	const { day } = route.params;

	return (
		<ScrollView>
			{/* Render details for the selected day */}
			<Text>{JSON.stringify(day, null, 2)}</Text>
		</ScrollView>
	);
};

export default DetailScreen;
