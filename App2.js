import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
 
import SwipeCards from "react-native-swipe-cards-deck";
import Geo from './components/Geo';
import GeoExpo from './components/GeoExpo';
import YelpSearch from './components/YelpSearch';

import * as Location from 'expo-location';
import axios from 'axios';

import db from 'firebase';
class Card extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <View style={styles.card}>
        <Image style={styles.thumbnail} source={{uri: this.props.image}} />
        <Text style={styles.text}>{this.props.name}</Text>
        <GeoExpo />
      </View>
    )
  }
}
 
class NoMoreCards extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    )
  }
}

 
// const cards = [
//   {name: '1', image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif'},
//   {name: '2', image: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'},
//   {name: '3', image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif'},
//   {name: '4', image: 'https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif'},
//   {name: '5', image: 'https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif'},
//   {name: '6', image: 'https://media.giphy.com/media/7r4g8V2UkBUcw/giphy.gif'},
//   {name: '7', image: 'https://media.giphy.com/media/K6Q7ZCdLy8pCE/giphy.gif'},
//   {name: '8', image: 'https://media.giphy.com/media/hEwST9KM0UGti/giphy.gif'},
//   {name: '9', image: 'https://media.giphy.com/media/3oEduJbDtIuA2VrtS0/giphy.gif'},
// ]
 
const cards2 = [
  {name: 'McDonalds', image: '//logo.clearbit.com/mcdonalds.com.au?size=400'},
  {name: 'Taco Bell', image: '//logo.clearbit.com/tacobell.com?size=400'},
  {name: 'Starbucks', image: '//logo.clearbit.com/starbucks.com?size=400'},
]


 
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: cards2,
      outOfCards: false,
      location: null,
      geo: null,
      errorMsg: null,
      cardsPre: [],
      nearbyRestaurants: []
    }
  }

  // componentDidMount(){
  //   db.collection('users').doc('nYkTHm0iE6twpdz4MPUg').collection('nearby').doc('ZuZnkY1OZM9Fx84WCkIF').onSnapshot((snapshot).then(function(snapshot){
  //     console.log(snapshot)
  //   }))
  // }

  setCards (cards) {
    console.log(cards)
    this.setState({
      cards: this.state.cards.concat(cards)
    })
  }

 
  handleYup (card) {
    console.log("yup")
    return true;
  }
 
  handleNope (card) {
    console.log("nope")
    return true;
  }
 
  cardRemoved (index) {
    console.log(index);
 
    let CARD_REFRESH_LIMIT = 3
 
    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);
 
      if (!this.state.outOfCards) {
        console.log(`Adding ${cards2.length} more cards`)
 
        this.setState({
          cards: this.state.cards.concat(cards2),
          outOfCards: true
        })
      }
 
    }
 
  }
 
  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
        loop={false}
 
        renderCard={(cardData) => <Card {...cardData} />}
        keyExtractor={(cardData) => String(cardData.name)}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}
 
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved.bind(this)}
      />
    )
  }
}
 
const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
  },
  thumbnail: {
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    color: 'grey',
    paddingTop: 10,
    paddingBottom: 10
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})