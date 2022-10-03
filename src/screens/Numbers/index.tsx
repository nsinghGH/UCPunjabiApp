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
import { Button, Image, colors } from 'react-native-elements';
import { EventRegister } from 'react-native-event-listeners'
import { useNavigation } from "@react-navigation/native";
import { ROUTERS } from "utils/navigation";
import CustomIcon from 'utils/CustomIcon'
import AndroidCustomIcon from 'utils/androidCustomIcon';
import database from "utils/database";
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient'
import { FlatGrid } from 'react-native-super-grid';

var isIos = false;
let headerMarginTop = 0;
let gridViewTop = 0;

if (Platform.OS == 'ios') {
  isIos = true;
  headerMarginTop = 23;
  gridViewTop = 10;
}

const Numbers = () => {
  let listner: any;
  //let numbersData: [] = database.getNumbersData()
  //let [numbers, setNumbers] = React.useState(numbersData)
  let numRanges = [
    { gurmukhi: '੦ - ੯', arabic: '(0 - 9)', buttonLabel: '੦ - ੯   (0 - 9)' }, 
    { gurmukhi: '੧੦ - ੧੯', arabic: '(10 - 19)', buttonLabel: '੧੦ - ੧੯   (10 - 19)'},
    { gurmukhi: '੨੦ - ੨੯', arabic: '(20 - 29)', buttonLabel: '੨੦ - ੨੯   (20 - 29)' }, 
    { gurmukhi: '੩੦ - ੩੯', arabic: '(30 - 39)', buttonLabel: '੩੦ - ੩੯   (30 - 39)' }, 
    { gurmukhi: '੪੦ - ੪੯', arabic: '(40 - 49)', buttonLabel: '੪੦ - ੪੯   (40 - 49)' }, 
    { gurmukhi: '੫੦ - ੫੯', arabic: '(50 - 59)', buttonLabel: '੫੦ - ੫੯   (50 - 59)' }, 
    { gurmukhi: '੬੦ - ੬੯', arabic: '(60 - 69)', buttonLabel: '੬੦ - ੬੯   (60 - 69)' }, 
    { gurmukhi: '੭੦ - ੭੯', arabic: '(70 - 79)', buttonLabel: '੭੦ - ੭੯   (70 - 79)' }, 
    { gurmukhi: '੮੦ - ੮੯', arabic: '(80 - 89)', buttonLabel: '੮੦ - ੮੯   (80 - 89)' }, 
    { gurmukhi: '੯੦ - ੯੯', arabic: '(90 - 99)', buttonLabel: '੯੦ - ੯੯   (90 - 99)' }, 
    { gurmukhi: '>= ੧੦੦', arabic: '( >=100 )', buttonLabel: '>= ੧੦੦   ( >=100 )' }
  ]

  //console.log("L49 Numbers(), numbers = ", numbers)
  const { navigate } = useNavigation();

  const onBackPress = useCallback(() => {
    if (listner) {
      EventRegister.removeEventListener(listner)
    }

    navigate(ROUTERS.Home);
  }, []);

  const onButtonPress = (item: any) => {
    navigate(ROUTERS.NumbersDetails, item);
  }

  return (

    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <View style={{ flexDirection: 'row', backgroundColor: "#009DC2", paddingTop: 30 }}>
        <Button onPress={onBackPress} titleStyle={styles.buttonSkipText} type = 'clear' title="<"/>
        <Text style={{ fontSize: 30, marginTop: headerMarginTop, marginLeft: 90, textAlign: 'center' }}>Numbers</Text>
      </View >

      <View style={{
        flex: 1,
        backgroundColor: "#2f85a4",
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 0
      }}>

        <LinearGradient
          colors={['#009DC2', '#FFFFFF', '#FFFFFF']}
          style={styles.linearGradient} >

          <FlatGrid
            itemDimension={200}
            data={numRanges}
            style={styles.gridView}
            renderItem={({ item }) => (
              <View style={[styles.itemContainer]}>
                <Button titleStyle={[styles.buttonText]} containerStyle={styles.buttonOutline}
                  title = {item['buttonLabel']}
                  onPress={() => onButtonPress(item)}
                  type="outline"
                />
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
    padding: 2,
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
    width: 240,
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
  },
  buttonOutline: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
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
  title: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },
});

export default Numbers;