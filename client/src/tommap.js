// Import required packages and components
import React from 'react';
import fetch from 'isomorphic-fetch';
import { compose, withProps, withHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

const MapWithAMarkerClusterer = compose(
	withProps({
		googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBD5IPabgEj_ZWtPwgbTQsx5mFbZB6AUdE&v=3.exp&libraries=geometry,drawing,places",
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `400px`, 'boxShadow': `0 0 40px #000` }} />,
		mapElement: <div style={{ height: `100%` }} />,
	}),
	withHandlers({
		onMarkerClustererClick: () => (markerClusterer) => {
			const clickedMarkers = markerClusterer.getMarkers()
			console.log(`Current clicked markers length: ${clickedMarkers.length}`)
			console.log(clickedMarkers)
		},
	}),
	withScriptjs,
	withGoogleMap
)(props =>
	<GoogleMap
		defaultZoom={10}
		defaultCenter={{ lat: 32.253460, lng: -110.911789 }}
	>
		<MarkerClusterer
			onClick={props.onMarkerClustererClick}
			averageCenter
			enableRetinaIcons
			gridSize={60}
		>
			{props.markers.map(marker => (
				<Marker
					key={marker.photo_id}
					position={{ lat: marker.latitude, lng: marker.longitude }}
					onClick={props.onToggleOpen}
				/>
			))}
		</MarkerClusterer>
	</GoogleMap>
);

export default class DemoApp extends React.PureComponent {
	componentWillMount() {
		this.setState({ markers: [] })
	}

	componentDidMount() {
		const url = [
			// Length issue
			//`https://gist.githubusercontent.com/farrrr/dfda7dd7fccfec5474d3/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`,
						
			`https://gist.githubusercontent.com`,
			`/farrrr/dfda7dd7fccfec5474d3`,
			`/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
		].join("")

		fetch(url)
			.then(res => res.json())
			.then(data => {
				this.setState({ markers: data.photos });
			});
	}

	render() {
		return (
			<MapWithAMarkerClusterer markers={this.state.markers} />
		)
	}
}
