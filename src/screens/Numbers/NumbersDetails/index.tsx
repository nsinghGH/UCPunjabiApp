/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Fragment, useCallback, useEffect, useRef, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform
} from 'react-native';
import { Button, Image, Card, colors } from 'react-native-elements';
import { EventRegister } from 'react-native-event-listeners'
import { useNavigation } from "@react-navigation/native";
import { ROUTERS } from "utils/navigation";
import { Player } from '@react-native-community/audio-toolkit';
import database from "utils/database";
import LinearGradient from 'react-native-linear-gradient'
import { FlatGrid } from 'react-native-super-grid';
import { IMAGES } from 'utils/imagesRequiers';

var isIos = false;
var isIos = false;
let topBarBackButton = 20;
if (Platform.OS == 'ios') {
  isIos = true;
  topBarBackButton = 20;
}

let headerMarginTop = 0;
let gridViewTop = 0;
if (Platform.OS == 'ios') {
  isIos = true;
  headerMarginTop = 23;
  gridViewTop = 10;
}

let isCardFlipped = false      // global flag to keep track of card state
let player = new Player("")  // single global Player instance; used for avoiding creation of orphaned player

const NumbersDetails = ({ route }) => {
  //console.log('Line 53 NumbersDetails() : route =', route)
  let itemParams: any;
  let useSmallText = false;
  let needAnimation = false;

  if (route.params) {
    itemParams = route.params['gurmukhi']
  } else {
    console.log('there are no route.params');
    return
  }

  if (itemParams == '੦ - ੯') {
    needAnimation = true
  }

  if (itemParams == '>= ੧੦੦') {
    useSmallText = true
  }

  // read letters data from local cache 
  let numbersData: [] = database.getNumbersData()
  numbersData = numbersData[itemParams]
  let firstItem = numbersData[0]
  let [cardItem, setCardItem] = React.useState(firstItem)
  let [numberText, updateCardText] = React.useState(cardItem.punjabi)
  let [number, updateNumber] = React.useState(cardItem.numberGurmukhi)

  const { navigate } = useNavigation();

  const onBackPress = useCallback(() => {
    navigate(ROUTERS.Numbers);
  }, []);

  const onNumberPress = (item) => {
    //console.log('L88, NumbersDetails onLetterPress item.id=', item)
    
    setCardItem(item)
    
    if (isCardFlipped) {
      updateCardText(item.english)
      updateNumber(item.numberArabic)
    }
    else {
      updateCardText(item.punjabi)
      updateNumber(item.numberGurmukhi)
    }
    
  }

  // the next line was 'const onAudioPlay = useCallback(() =>' before
  const onAudioPlay = (item: any) => {
    // console.log('L101, NumbersDetails:  audio play called', item);

    try {
      // play audio for the given letter
      player = new Player(item.audioId + ".mp3");
      player.play().on('ended', () => {
        //console.log('L107, NumbersDetails:  audio played');
      })
    } catch (e) {
      console.log(`L110, NumbersDetails:  unable to play audio`, e)
    }
  }

  // Callback for flipping the word card
  const flipCard = (item: any) => {
    //console.log('L120, NumbersDetails:  flipCard item=', item);

    player.destroy()                // stop audio in case it is looping

    if (isCardFlipped) {
      isCardFlipped = false
      updateCardText(item.punjabi)
      updateNumber(item.numberGurmukhi)
    }
    else {
      isCardFlipped = true
      updateCardText(item.english)
      updateNumber(item.numberArabic)
    }
  }

  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}

      <View style={{ flexDirection: 'row', backgroundColor: "#009DC2", paddingTop: topBarBackButton }}>
        <Button onPress={onBackPress} titleStyle={styles.buttonSkipText} type = 'clear' title="<"/>
        <Text style={{flex: 1, fontSize: 40, marginLeft: 100, paddingTop:10 }}>{itemParams}</Text>
      </View >

      <View style={{
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 40
      }}>

        <LinearGradient
          colors={['#009DC2', '#FFFFFF', '#FFFFFF']}
          style={styles.linearGradient} >
          {/* spacers */}
          <Text/><Text/>

          <Card containerStyle={{ borderRadius: 10, height: 300, width: 300, marginRight: 1, marginLeft: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{flexDirection: 'row', marginTop: -10, justifyContent: 'space-around', width: 340}} >
              {/* spacers */}
              <Text /><Text />
              <Button type="clear" onPress={() => flipCard(cardItem)}
                icon={<Image source={IMAGES['FlipCard']} style={styles.topButtonsStyle} />}
              />
            </View>
            <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'center', width: 340, height:140}}>
              {
                useSmallText ?
                  <Text style={styles.cardTextSmall}>{number}</Text>
                  : isCardFlipped ?
                    <Text style={styles.cardText}>{number}</Text>
                    : needAnimation ?
                      <Image source = {cardItem.uri} style ={styles.imageStyle}/>
                      : <Text style={styles.cardText}>{number}</Text>
              }
            </View>
            <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-around', width: 340, height:50}}>
              <Text style={styles.cardTextSmaller}>{numberText}</Text>
            </View>
          </Card>
          <Text/><Text/>
          <Button titleStyle={[styles.buttonText]} containerStyle={styles.buttonOutline} 
            title="Play sound" type="outline" onPress={() => onAudioPlay(cardItem)} />
          {/* spacer */}
          <Text />

          <FlatGrid
            itemDimension={92}
            data={numbersData}
            style={styles.gridView}
            renderItem={({ item }) => (
              <View style={[styles.itemContainer]}>
                <TouchableOpacity onPress={() => onNumberPress(item)} >
                  {
                    useSmallText ?
                      <Text style={styles.gridTextSmall} >{item.numberGurmukhi}</Text>
                      : <Text style={styles.gridText} >{item.numberGurmukhi}</Text>
                  }
                </TouchableOpacity>
              </View>
            )}
          />
        </LinearGradient>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: 0,
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 0,
    height: 50,
    alignItems: 'center'
  },
  button: {
    borderColor: '#A8A8A8',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    width: 200,
    padding: 4,
    margin: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    width: 100,
    alignSelf: 'flex-end',
  },
  buttonContainerStart: {
    flexDirection: 'row',
    width: 100,
    alignSelf: 'flex-start',
  },
  buttonSkipText: {
    paddingTop: 16,
    paddingLeft: 10,
    color: 'black',
    fontWeight: '400',
    fontSize: 32,
  },
  buttonText: {
    width: 100,
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
  },
  buttonOutline: {
    borderColor: '#009DC2',
    borderWidth: 1,
    borderRadius: 4,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  imageStyle:{
    width: 130, 
    height:136,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 40,
    color: 'black',
    textAlign: 'center',
    marginTop: -20
  },
  cardText: {
    fontSize: 80,
    color: 'black',
    textAlign: 'center',
  },
  cardTextSmall: {
    fontSize: 46,
    color: 'black',
    textAlign: 'center',
  },
  cardTextSmaller: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    paddingTop: 10,
  },
  gridText: {
    fontSize: 32,
    color: 'black',
    textAlign: 'center',
  },
  gridTextSmall: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  topButtonsStyle: {
    height: 32,
    width: 32,
    resizeMode: 'stretch',
  },
});

export default NumbersDetails;