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
import { Button, Image } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';
import { EventRegister } from 'react-native-event-listeners'
import { useNavigation } from "@react-navigation/native";
import { ROUTERS } from "utils/navigation";
import database from "utils/database";
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const itemDim = width/6   // This is used in FlatGrid itemDimension to display letters per row

var isIos = false;
let headerMarginTop = 0;
let gridViewTop = 0;

if (Platform.OS == 'ios') {
  isIos = true;
  headerMarginTop = 12;
  gridViewTop = 10;
}

const Gurmukhi = ({route}) => {
  let listner: any;
  let lettersData: [] = database.getLettersData()
  let lettersDataFlatArray: [] = []

  //console.log('L50 Gurmukhi(), route.params = ', route.params);
  let nextLetterId = route.params.id
  let nextLetterRow = route.params.row

  // flatten nested letters array
  for(let i = 0; i < lettersData.length; i++) {
    let row: [] = lettersData[i]
    //console.log('L55 Gurmukhi(), row = ', row.length);
    for(let j = 0; j < row.length; j++){
      lettersDataFlatArray.push(row[j])
    }
  }

  //console.log('60 Gurmukhi(), lettersDataFlatArray = \n', lettersDataFlatArray);
  let [letters, setLetters] = React.useState(lettersDataFlatArray)

  const { navigate } = useNavigation();

  const onBackPress = useCallback(() => {
    if (listner) {
      EventRegister.removeEventListener(listner)
    }

    navigate(ROUTERS.Home);
  }, []);

  const onLetterPress = (item: any) => {
    listner = EventRegister.addEventListener('myCustomEvent', (data: number) => {
      //console.log(data);
      let tempItems: any = letters.slice()
      setLetters(tempItems)
      database.setLetterData(tempItems)
    })

    if (item.status) {
      // Touched letter is active, switch to the details screen
      navigate(ROUTERS.GurmukhiDetails, item);
    }
  }

  return (
    <>
      <View style={{ flexDirection: 'row', backgroundColor: "#009DC2", paddingTop: 30 }}>
        <Button onPress={onBackPress} titleStyle={styles.buttonSkipText} type = 'clear' title="<"/>
        <Text style={{ fontSize: 30, marginTop: headerMarginTop, marginLeft: 96, color: '#1D2359', textAlign: 'center' }}>Gurmukhi</Text>
      </View >
      <View style={{
        flex: 0,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 0
      }}>

        <LinearGradient
          colors={['#009DC2', '#FFFFFF', '#FFFFFF']}
          style={styles.linearGradient}>

          <FlatGrid
            itemDimension={itemDim}
            data={letters}
            style={styles.gridView}
            renderItem={({ item }) => (
              <View style={[styles.itemContainer]}>
                <TouchableOpacity onPress={() => onLetterPress(item)}>
                {
                  item['status'] ?
                    item.id == nextLetterId && item.row == nextLetterRow ?
                      <Text style={styles.letterTextActiveWithFocus}>{item.letter}</Text>
                      : <Text style={styles.letterTextActive}>{item.letter}</Text>
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
    marginTop: gridViewTop,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 4,
    padding: 2,
    height: 54,
  },
  linearGradient: {
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
    width: 300,
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
  },
  buttonOutline: {
    borderColor: 'black',
    borderWidth: 1
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
    fontSize: 32,
    color: 'black',
    textAlign: 'center',
  },  
  letterTextActiveWithFocus: {
    fontSize: 32,
    color: 'black',
    textAlign: 'center',
    borderColor: 'gold',
    borderWidth: 3,
    borderRadius: 4,
    marginBottom:-6
  },
  letterTextInactive: {
    fontSize: 32,
    color: 'grey',
    textAlign: 'center',
  },
  hint: {
    fontSize: 18,
    color: 'black',
    marginTop: 12,
    textAlign: 'center',
    width: 380
  },
});

export default Gurmukhi;
