import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';

import Geolocation from 'react-native-geolocation-service';


componentDidMount() {
    // Instead of navigator.geolocation, just use Geolocation.
    if (hasLocationPermission) {
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }
    // Geocoder.from({
    //   latitude : {this.props.coords.latitude},
    //   longitude : {this.props.coords.longitude}
    // });
}
