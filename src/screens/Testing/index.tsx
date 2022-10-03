/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {Fragment, useCallback,useEffect, useRef, Component } from 'react';
import {
  AppRegistry,
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform
} from 'react-native';

import {useNavigation} from "@react-navigation/native";
import {ROUTERS} from "utils/navigation";

//import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
//import  RNSketchCanvas   from '@terrylinla/react-native-sketch-canvas';

import {ImageEditor} from '@wwimmo/react-native-sketch-canvas';
import RNImageEditor from '@wwimmo/react-native-sketch-canvas';

let CanvasText:
{
  text: 'ੳੳ',
  font: 'fonts/Akaash.ttf',
  fontSize: 80,
  fontColor: 'black',
  overlay: 'TextOnSketch',
  anchor: { x: 0, y: 1 },
  position: { x: 100, y: 200 },
  coordinate: 'Absolute',
  alignment: 'Center',
  lineHeightMultiple: 1.2
}

let lsi:
{
  filename: 'lo01.png',  // e.g. 'image.png' or '/storage/sdcard0/Pictures/image.png'
  directory: 'UCPunjabi.MAIN_BUNDLE', // e.g. SketchCanvas.MAIN_BUNDLE or '/storage/sdcard0/Pictures/'
  mode: 'AspectFill'
}

let po:
{
  drawer: 'user1',
  size: { // the size of drawer's canvas
    width: 480,
    height: 640
  },
  path: {
    id: 8979841, // path id
    color: '#FF000000', // ARGB or RGB
    width: 5,
    data: [
      "296.11,281.34",  // x,y
      "293.52,284.64",
      "290.75,289.73"
    ]
  }
}

export default class Sketcher extends Component {
  //console.log('L75, class component entered');

  render()   
  {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <SketchCanvas
            style={{ flex: 1 }}
            strokeColor={'red'}
            strokeWidth={7}
            localSourceImage= {{lsi}}
          />
        </View>

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <RNSketchCanvas
            containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
            canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
            defaultStrokeIndex={0}
            defaultStrokeWidth={5}
            localSourceImage = {{lsi}}
            closeComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Close</Text></View>}
            undoComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Undo</Text></View>}
            clearComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Clear</Text></View>}
            eraseComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Eraser</Text></View>}
            strokeComponent={color => (
              <View style={[{ backgroundColor: color }, styles.strokeColorButton]} />
            )}
            strokeSelectedComponent={(color, index, changed) => {
              return (
                <View style={[{ backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]} />
              )
            }}
            strokeWidthComponent={(w) => {
              return (<View style={styles.strokeWidthButton}>
                <View  style={{
                  backgroundColor: 'white', marginHorizontal: 2.5,
                  width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                }} />
              </View>
            )}}
            saveComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Save</Text></View>}
            savePreference={() => {
              console.log('L120, savePreference() called');
              return {
                folder: 'RNSketchCanvas',
                filename: String(Math.ceil(Math.random() * 100000000)),
                transparent: false,
                imageType: 'png'
              }
            }}
          />
        </View>


      </View>
      
    );
  }
}

/*
const Sketcher = () => {
    const {navigate} = useNavigation();

    const onBackPress = useCallback(()=>{
      navigate(ROUTERS.Home);
  },[]);
  const item =
    {
      title: 'Welcome to UC Punjabi',
      text1: 'Gurmukhi Script',
      text2: 'Word Formation',
      text3: 'Modules',
      text4: 'Numbers',
      text5: 'Settings',
      backgroundColor: '#2f85a4',
    }
  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}


    </>
  );
};
*/


const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF', paddingTop: 60, paddingBottom: 40,
  },
  strokeColorButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#39579A'
  },
  functionButton: {
    marginHorizontal: 2.5, marginVertical: 8, height: 30, width: 60,
    backgroundColor: '#39579A', justifyContent: 'center', alignItems: 'center', borderRadius: 5,
  }
});


/*
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    width:100,
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
    width:300,
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
  },
  buttonIconText: {
    width:90,
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
  },
  buttonOutline:{
    borderColor: 'black',
    borderWidth:1
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
*/

//export default Sketcher;




/*
const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF',
  },
});
*/

AppRegistry.registerComponent('Sketcher', () => Sketcher);
