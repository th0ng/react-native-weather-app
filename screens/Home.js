import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import CurrentForecast from '../components/CurrentForecast';
import DailyForecast from '../components/DailyForecast';

const HomeScreen = ({ navigation, weather }) => {
	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
			<CurrentForecast currentWeather={weather} />
			<FutureForecastContainer>
				{weather.daily ? (
					weather.daily.map((day, index) => {
						if (index !== 0) {
							return (
								<TouchableOpacity
									key={day.dt}
									onPress={() => navigation.navigate('Detail', { day })}
								>
									<DailyForecast day={day} index={index} />
								</TouchableOpacity>
							);
						}
					})
				) : (
					<NoWeather>Fetching...</NoWeather>
				)}
			</FutureForecastContainer>
		</ScrollView>
	);
};

const NoWeather = styled.Text`
	text-align: center;
	color: white;
`;

const FutureForecastContainer = styled.View`
	background-color: dodgerblue;
`;

export default HomeScreen;
