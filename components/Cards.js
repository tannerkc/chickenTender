import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';
 
import SwipeCards from "react-native-swipe-cards-deck";

import * as Location from 'expo-location';
import axios from 'axios';
import Error from './Error';
import Loading from './Loading';
import Auth from './Auth';
// import SignInScreen from './components/SignIn';


const Card = (props) => {
   
    return (
        <View style={styles.card}>
            <Image style={styles.thumbnail} source={{uri: props.image}} />
            <Text style={styles.text}>{props.name}</Text>
        </View>
    )
}

const NoMoreCards = () => {
   
    return (
        <View style={styles.noMoreCards}>
            <Text>No more cards</Text>
        </View>
    )
}



const Cards = () =>{

    const [cards, setCards] = useState([]);
    const [cardStatus, setCardStatus] = useState(false);
    const [location, setLocation] = useState(null);
    const [nearbyRestaurants, setNearby] = useState([]);
    const [loading, setLoading] = useState(true);
    const [geo, setGeo] = useState('Getting Location...');
    const [errorMsg, setError] = useState(null);

    // const [loggedIn, setLoggedIn] = useState(false)
    global.loggedIn = false

    const commonCards = [
      {name: 'McDonalds', image: 'https://logo.clearbit.com/mcdonalds.com.au?size=400'},
      {name: 'Taco Bell', image: 'https://logo.clearbit.com/tacobell.com?size=400'},
      {name: 'Starbucks', image: 'https://logo.clearbit.com/starbucks.com?size=400'},
      {name: 'Chipotle', image: 'https://logo.clearbit.com/chipotle.com?size=400'},
      {name: 'KFC', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png'},
      {name: 'Panda Express', image: '//logo.clearbit.com/pandaexpress.com?size=400'},
      {name: 'Subway', image: 'https://logo.clearbit.com/subway.com?size=400'},
      {name: 'Chick-fil-A', image: 'https://logo.clearbit.com/chick-fil-a.com?size=400'},
      {name: 'Five Guys', image: 'https://logo.clearbit.com/fiveguys.com?size=400'},
      {name: 'Panera Bread', image: 'https://logo.clearbit.com/panerabread.com?size=400'},
      {name: 'Jimmy Johns', image: 'https:/logo.clearbit.com/jimmyjohns.com?size=400'},
      {name: 'Domino\'s', image: 'https://logo.clearbit.com/Dominos.com?size=400'},
    ]


    useEffect(() => {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        if (errorMsg) {
          console.log(errorMsg)
        } else if (location) {

          let coord = location.coords.latitude +', '+ location.coords.longitude
          setGeo(coord);

          const url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants&location="+coord+"&maxprice=2&radius=15000&type=restaurant&opennow=true"

          const key = "&key=XXXX"
          const photosUrl = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="

          axios({
              mode: 'cors',
              method: "GET",
              url: url+key,
            })
              .then(response => {
                  console.log(response.data.results)
                  let cardsPre = []

                  let nearbyRestaurants = response.data.results;

                  let whitelist = ['restaurant', 'food']
        
                  let i = 0
                  for(i; i < nearbyRestaurants.length; i++){
                    if(whitelist.includes(nearbyRestaurants[i].types[0])){
                      console.log(nearbyRestaurants[i].name)
                      console.log(nearbyRestaurants[i].photos[0].photo_reference)
                      let foodName = nearbyRestaurants[i].name;
                      let ref = nearbyRestaurants[i].photos[0].photo_reference
                      let photo = photosUrl+ref+key
                      // let ref = nearbyRestaurants[i].name.split('').filter(e => e.trim().length).join('');
                      // let photo = `//logo.clearbit.com/${ref}.com?size=400`
                      cardsPre.push({name: foodName, image: photo})
                    }
                    
                  }

                  // setCards(cardsPre);
                  console.log(cardsPre);

                  cardsPre = cardsPre.concat(commonCards)

                  setCards(cardsPre)
                  setLoading(false) 
                
                
              })
              .catch(error => {
                console.log(error);
                setCards(commonCards)
                setCardStatus(true)
                setError('Only common locations available right now, the server is too full of requests to get more specific results.')
              });
              
        }
      })();
    }, []);


    const handleYup = (card) => {
        console.log("yup")
        return true;
    }
     
    const handleNope = (card) => {
        console.log("nope")
        return true;
    }
     
    const cardRemoved = (index) => {
        console.log(index);
     
        if (index == cards.length-1) {
          console.log(`There are only ${cards.length - index - 1} cards left.`);
     
          // if (!cardStatus) {
          //   console.log(`Adding ${commonCards.length} more cards`)
     
          //   setCards(cards.concat(commonCards))
          //   setCardStatus(true)
          // }
     
        }
     
      }

    return (
    //   !global.loggedIn?
    //     <Auth />
    //   :

      loading?
      <SafeAreaView style={styles.container}>
        <Loading />
      </SafeAreaView>
      :
      
      <SafeAreaView style={styles.container}>
        <SwipeCards
          cards={cards}
          loop={false}

          renderCard={(cardData) => <Card {...cardData} />}
          keyExtractor={(cardData) => String(cardData.name)}
          renderNoMoreCards={() => <NoMoreCards />}
          showYup={true}
          showNope={true}

          handleYup={handleYup}
          handleNope={handleNope}
          cardRemoved={cardRemoved.bind(this)}
        />

        <Error style={styles.error} error={errorMsg} />

      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
    },
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

export default Cards;
