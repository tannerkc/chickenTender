import React, { Component } from 'react';
import { Text, View } from 'react-native';

const request = require('request');

export class Foursquare extends Component {
  render() {

    request(
      {
        url: 'https://api.foursquare.com/v2/venues/explore',
        method: 'GET',
        qs: {
          client_id: 'S5MZWP5TITQXWVDY0R3IDTEA25TE120J30DPFTOHDGU4EROG',
          client_secret: 'UCZOIRDP2CBCX4PSQRY1RAICXYL1PMCH4H2V5SZOKY0IYJA0',
          ll: '40.7243,-74.0018',
          query: 'coffee',
          v: '20180323',
          limit: 1,
        },
      },
      function(err, res, body) {
        if (err) {
          console.error(err);
        } else {
          console.log(body);
        }
      }
    );
    

    return (
      <View>
        <Text> testing foursquare... </Text>
      </View>
    )
  }
}

export default Foursquare
