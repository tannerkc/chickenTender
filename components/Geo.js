import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';

import { geolocated } from "react-geolocated";
import Geocoder from 'react-native-geocoding';


class Geo extends React.Component {
    render() {
        return !this.props.isGeolocationAvailable ? (
            <Text>Your browser does not support Geolocation</Text>
        ) : !this.props.isGeolocationEnabled ? (
            <Text>Geolocation is not enabled</Text>
        ) : this.props.coords ? (
            <Text>{this.props.coords.latitude}, {this.props.coords.longitude}</Text>
        ) : (
            <Text>Getting the location data&hellip; </Text>
        );

    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Geo);
