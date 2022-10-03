/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React, { useCallback } from 'react';
 import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   StatusBar,
   Platform
 } from 'react-native';
 import { Button } from 'react-native-elements';
 import { EventRegister } from 'react-native-event-listeners'
 import { useNavigation } from "@react-navigation/native";
 import { ROUTERS } from "utils/navigation";
 import CustomIcon from 'utils/CustomIcon'
 import AndroidCustomIcon from 'utils/androidCustomIcon';
 import LinearGradient from 'react-native-linear-gradient'
 import { FlatGrid } from 'react-native-super-grid';
 import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const itemDim = width/3   // This is used in FlatGrid itemDimension to display letters per row

var isIos = false;
let headerMarginTop = 0;
let gridViewTop = 0;

if (Platform.OS == 'ios') {
  isIos = true;
  headerMarginTop = 23;
  gridViewTop = 10;
}

const topicsData =
  [
    {id: 3, topic: 'Market & Food'},
    {id: 4, topic: 'Faith & Celebrations'},
    {id: 5, topic: 'Clothes & Fashion'},
    {id: 6, topic: 'Daily Routines & Hobbies'},
  ]

const titleText = 'Punjabi 2 Vocabulary'
const Pb2Vocabulary = () => {
  let listner: any;

  //console.log('Pb2Vocabulary(), topicsData = ', topicsData)
  const { navigate } = useNavigation();

  const onBackPress = useCallback(() => {
    if (listner) {
      EventRegister.removeEventListener(listner)
    }

    navigate(ROUTERS.Home);
  }, []);

  const onButtonPress = (item: any) => {
    navigate(ROUTERS.Pb2VocabularyL2, {item, titleText});
  }

  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      
      <View style={{ flexDirection: 'row', backgroundColor: "#009DC2", paddingTop: 30 }}>
        <Button onPress={onBackPress} titleStyle={styles.buttonSkipText} type = 'clear' title="<"/>
        <Text style={{ fontSize: 22, marginTop: headerMarginTop, marginLeft: 40, textAlign: 'center' }}>{titleText}</Text>
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
          style={styles.linearGradient}>
          
          <FlatGrid
            itemDimension={300}
            data={topicsData}
            style={styles.gridView}
            spacing={20}
            renderItem={({ item }) => (
              <View style={[styles.itemContainer]}>
                <Button titleStyle={[styles.buttonText]} containerStyle={styles.buttonOutline}
                  title={item.topic}
                  onPress={() => onButtonPress(item)}
                  type="outline"
                />
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </LinearGradient>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: 80,
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
    padding: 18,
    height: 40,
    alignItems: 'center',
    marginTop: 24
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
  buttonSkipText: {
    paddingTop: 16,
    paddingLeft: 10,
    color: 'black',
    fontWeight: '400',
    fontSize: 32,
  },
  buttonText: {
    width: 240,
    height: 40,
    paddingTop:10,
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  buttonOutline: {
    borderColor: '#1D2359',
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

export default Pb2Vocabulary;