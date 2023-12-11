import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import config from './config';
import DetailScreen from './screens/Detail';
import HomeScreen from './screens/Home';

const Stack = createStackNavigator();

const App = () => {
	const [lat, setLat] = useState();
	const [long, setLong] = useState();
	const [weather, setWeather] = useState({});

	const getLocationAsync = async () => {
		try {
			let { status } = await Location.requestForegroundPermissionsAsync();

			if (status !== 'granted') {
				throw new Error('Location permission not granted');
			}

			let currentLocation = await Location.getCurrentPositionAsync({});
			setLat(currentLocation.coords.latitude);
			setLong(currentLocation.coords.longitude);
		} catch (error) {
			console.error('Error fetching location:', error);
		}
	};

	//updates the weather when lat long changes
	useEffect(() => {
		const fetchData = async () => {
			await getLocationAsync();
			try {
				fetch(
					`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric&appid=${config.API_KEY}`
				)
					.then((res) => res.json())
					.then((data) => {
						setWeather(data);
					})
					.catch((err) => {
						console.log('error', err);
					});
			} catch (error) {
				console.error('Error fetching weather data:', error);
			}
		};
		fetchData();
	}, [lat, long]);

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home">
					{(props) => <HomeScreen {...props} weather={weather} />}
				</Stack.Screen>
				<Stack.Screen name="Detail" component={DetailScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const Container = styled.View`
	flex: 1;
	padding-all: 10px;
`;

const NoWeather = styled.Text`
	text-align: center;
	color: white;
`;

const FutureForecastContainer = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export default App;
