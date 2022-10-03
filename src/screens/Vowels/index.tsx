/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';

import { Button, Image, Card } from 'react-native-elements';
import database from "utils/database";
import { useNavigation } from "@react-navigation/native";
import { ROUTERS } from "utils/navigation";
import {Player} from '@react-native-community/audio-toolkit';
import LinearGradient from 'react-native-linear-gradient'
import { FlatGrid } from 'react-native-super-grid';
import{SOUNDMODIFIERS} from 'utils/smImagesRequires';

var isIos = false;
let headerMarginTop = 0;
let gridViewTop = 0;
let topBarBackButton = 20;

if (Platform.OS == 'ios') {
  isIos = true;
  headerMarginTop = 23;
  gridViewTop = 10;
}

const Vowels = () => {
  // read data from local cache 
  let vowelsData: [] = database.getSoundModifiersData()
  let firstItem = vowelsData[0]
  let [cardItem, setCardItem] = React.useState(firstItem)
  const { navigate } = useNavigation();

  const onBackPress = useCallback(() => {
    navigate(ROUTERS.Home);
  }, []);

  const onVowelPress = (item) => {
    //console.log('L55 Vowels: onVowelPress item =', item)
    setCardItem(item)
  }
  const onAudioPlay =(item: any)=>{
    let player = new Player(item.audioId + ".mp3");
    player.play().on('ended', () => {
    //console.log('L69 Vowels: audio played');
    })
  }

  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}

      <View style={{ flexDirection: 'row', backgroundColor: "#009DC2", paddingTop: topBarBackButton }}>
        <Button onPress={onBackPress} titleStyle={styles.buttonSkipText} type = 'clear' title="<"/>
        <Text style={{fontSize: 30, marginTop: headerMarginTop, marginLeft: 100, textAlign: 'center' }}>Vowels</Text>
      </View >
      
      <View style={{ alignItems: 'center'}}>
        <LinearGradient
          colors={['#009DC2', '#FFFFFF', '#FFFFFF']}
          style={styles.linearGradient} >
        
          <View style={{ flex: 0, alignItems: 'center', width: 420}}>
            <Text style={{fontSize: 28, paddingTop: 20}}>{cardItem.pname}</Text>
            
            <Card containerStyle={styles.cardContainer}>
              <Image style={{width: 200, height: 200}} source={SOUNDMODIFIERS[cardItem.name]}/>
            </Card>
            
            <Text style={{fontSize: 18, paddingTop: 20, paddingBottom: 20}}>{cardItem.sound}{cardItem.phrase}</Text>

            <Button titleStyle={[styles.buttonText]} containerStyle={styles.buttonOutline} 
             title="Play sound" type="outline" onPress={() => onAudioPlay(cardItem)} />
          </View>
        
          <FlatGrid
            itemDimension={92}
            data={vowelsData}
            style={styles.gridView}
            renderItem={({ item }) => (
              <View style={[styles.itemContainer]}>
                <TouchableOpacity onPress={() => onVowelPress(item)} >
                  {<Text style={styles.itemText}>({item.symbol}) {item.ename}</Text>}
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
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 0,
    height: 40,
    alignItems: 'center'
  },
  cardContainer: {
    borderRadius: 10, 
    height: 240, 
    width: 240, 
    marginRight: 1, 
    marginLeft: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
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
  },
  buttonOutline: {
    borderColor: '#009DC2',
    borderWidth: 1,
    borderRadius: 4,
  },
  itemText:{
    fontSize: 16,
    borderColor: 'silver',
    borderWidth: 1,
    borderRadius: 4,
    width: 108,
    height: 32,
    textAlign: 'center',
    paddingTop: 2
  },
});

export default Vowels;