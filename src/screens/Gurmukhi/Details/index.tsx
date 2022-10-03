/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useCallback, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
  Dimensions
} from 'react-native';
import { Button, Card } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';
import { EventRegister } from 'react-native-event-listeners'
import database from "utils/database";
import { useNavigation } from "@react-navigation/native";
import { ROUTERS } from "utils/navigation";
import { Player } from '@react-native-community/audio-toolkit';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get("window");
const itemDim = width/6
var isIos = false;
let topBarBackButton = 0;
if (Platform.OS == 'ios') {
  isIos = true;
  topBarBackButton = 20;
}

let currentLetter = {'id': 0, 'row':0};

const GurmukhiDetails = ({route}) => {
  //console.log('L46 GurmukhiDetails() : route =', route)
  let itemParams: any;

  if (route.params) {
    itemParams = route.params
  }
  else{
    console.log('L54 GurmukhiDetails() : null route.params')
  }

  // create a callback hook for the card item with the current route.params 
  let [cardItem, setCardItem] = React.useState(itemParams)
  
  // read all letters data from local cache 
  let lettersData: [] = database.getLettersData()
  let tempArray = lettersData[route.params.row-1]
  let [letters, setLetters] = React.useState(tempArray)
  let isAudioActive = true

  const { navigate } = useNavigation();

  const onBackPress = (item: any) => {
    //console.log('L73 GurmukhiDetails() : item =', item)
    currentLetter.id = item.id
    currentLetter.row = item.row
    navigate(ROUTERS.Gurmukhi, currentLetter);
  }

  useEffect(() => {
    return () => {
      setCardItem({}); // This worked for me?
    };
  }, []);
  
  const onLetterPress = (item: any) => {
    //console.log('L82: onLetterPress item=', item)
    if (item.status) {
      setCardItem(item)
      isAudioActive = true
    }
  }

  const onAudioPlay = (item: any) => {
    let tempItems: any = letters.slice()    //tempItems = current row 
    let index = item.id   //use item.id as index for managing letter states 
    isAudioActive = false

    // Reset index if it is the last row or the last letter on a row
    if (item.row == 9) {
      // We are at the last row with a single letter, we need to stay on it
      index = 0
    }
    else if (((index + 1) % 5) == 0) {
      // We are at the end of a row. We need to load the next row and reset index to 0
      tempItems = lettersData[item.row]
      index = 0
      currentLetter.id = 0
      currentLetter.row = item.row+1
    }
    else{
      // We have more letters to activate on the current row
      index++
      currentLetter.id = item.id+1
      currentLetter.row = item.row
    }

    try {
      // play audio for the given letter
      let player = new Player(item.audioId + ".mp3");
      player.play().on('ended', () => {
        //console.log('audio played');
      })

      if (item.row == 8 && item.id == 4) {
        // We are ready to load the last row with a single letter, we need to add dummy items for correct display
        let tempRow = tempItems[0]
        tempItems[0] = tempRow
        tempItems[1] = {"audioId": "", "id": 0, "letter": " ", "name": "letter41", "row": 9, "status": false}
        tempItems[2] = {"audioId": "", "id": 1, "letter": " ", "name": "letter41", "row": 9, "status": false}
        tempItems[3] = {"audioId": "", "id": 3, "letter": " ", "name": "letter41", "row": 9, "status": false}
        tempItems[4] = {"audioId": "", "id": 4, "letter": " ", "name": "letter41", "row": 9, "status": false}
      }
  
      EventRegister.emit('myCustomEvent', index)
      // Activate the next letter and refresh the row 
      tempItems[index].status = true
      setLetters(tempItems)

    } catch (e) {
      console.log(`unable to play audio`, e)
    }
  }

  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <View style={{ flexDirection: 'row', backgroundColor: "#009DC2", paddingTop: topBarBackButton }}>
        <Button onPress={onBackPress} titleStyle={styles.buttonSkipText} type = 'clear' title="<"/>
        <Text style={{ flex: 1, fontSize: 16, lineHeight: 30, color: '#1D2359', textAlign: 'right' }}></Text>
      </View>

      <View style={{
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 50,
        alignSelf: 'stretch'
      }}>

        <LinearGradient
          colors={['#009DC2', '#FFFFFF', '#FFFFFF']}
          style={styles.linearGradient}>

          <Text style={styles.title}>Row {cardItem.row}</Text>

          <Card containerStyle={styles.cardContainer}>            
            <Image source = {cardItem.uri} style ={styles.imageStyle}/>
          </Card>
          <Text/><Text/>

          <Button titleStyle={[styles.buttonText]} containerStyle={styles.buttonOutline} 
            title="Play sound" type="outline" onPress={() => onAudioPlay(cardItem)} />

          <FlatGrid
            itemDimension={itemDim}
            data={letters}
            style={styles.gridView}
            renderItem={({ item }) => (
              <View style={[styles.itemContainer]}>
                <TouchableOpacity onPress={() => onLetterPress(item)} >
                {
                  item.status ?
                    <Text style={styles.letterTextActive}>{item.letter}</Text>
                    : <Text style={styles.letterTextInactive}>{item.letter}</Text>
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
    marginTop: 10,
    flex: 1,
  },
  imageStyle:{
    width: 160, 
    height:160,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 80,
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    borderRadius: 10, 
    height: 260, 
    width: 260, 
    marginRight: 1, 
    marginLeft: 1, 
    alignSelf: 'center', 
    alignItems: 'center', 
    justifyContent: 'center'
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
  letterTextActive: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  letterTextInactive: {
    fontSize: 40,
    color: 'grey',
    textAlign: 'center',
  },
  cardText: {
    fontSize: 120,
    color: 'black',
    textAlign: 'center',
  },
  title: {
    fontSize: 36,
    color: 'black',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 30
  },
  actionText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  blurry: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

export default GurmukhiDetails;