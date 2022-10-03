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
  StatusBar,
  Platform
} from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import { ROUTERS } from "utils/navigation";
import database from "utils/database"

let firstLetter = {'id': 0, 'row':1};
const Home = () => {
  // check if the data exist in the local storage. if not then save the data to the database
  database.fetchLettersData(Platform.OS)
  database.fetchSoundModifiersData(Platform.OS)
  database.fetchVocabularyData(Platform.OS)
  database.fetchNumbersData(Platform.OS)

  const { navigate } = useNavigation();

  const gotoGurmukhi = useCallback(() => {
    navigate(ROUTERS.Gurmukhi, firstLetter);
  }, []);

  const gotoVowels = useCallback(() => {
    navigate(ROUTERS.Vowels);
  }, [])

  const gotoPb1Vocabualry = useCallback(() => {
    navigate(ROUTERS.Pb1Vocabulary);
  }, []);

  const gotoPb2Vocabualry = useCallback(() => {
    navigate(ROUTERS.Pb2Vocabulary);
  }, []);

  const gotoPb3Vocabualry = useCallback(() => {
    navigate(ROUTERS.Pb3Vocabulary);
  }, []);

  const gotoNumbers = useCallback(() => {
    navigate(ROUTERS.Numbers);
  }, []);

  const gotoSketcher = useCallback(() => {
    navigate(ROUTERS.Sketcher);
  }, []);

  const item =
  {
    title: 'Welcome to UC ਪੰਜਾਬੀ',
    text0: 'A mobile companion for the \n1st year of Punjabi.',
    text1: 'Gurmukhi Alphabet',
    text2: 'Vowels',
    text3: 'Numbers',
    text4: 'Punjabi 1 Vocabulary',
    text5: 'Punjabi 2 Vocabulary',
    text6: 'Punjabi 3 Vocabulary',
    text7: 'UNIVERSITY OF CALIFORNIA',
    text9: 'Experiment',
    backgroundColor: '#2f85a4',
  }
  return (
    <>
      <StatusBar backgroundColor={'transparent'} translucent={true} />

      <View style={{
        flex: 1,
        backgroundColor: item.backgroundColor,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 40
      }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.text0}</Text>
        <Text/>
        <Button titleStyle={[styles.buttonText]} containerStyle={styles.buttonOutline} title={item.text1} type="outline" onPress={gotoGurmukhi} />
        <Button titleStyle={[styles.buttonText]} containerStyle={styles.buttonOutline} title={item.text2} type="outline" onPress={gotoVowels} />
        <Button titleStyle={[styles.buttonText]} containerStyle={styles.buttonOutline} title={item.text3} type="outline" onPress={gotoNumbers} />
        <Button titleStyle={[styles.buttonText]} containerStyle={styles.buttonOutline} title={item.text4} type="outline" onPress={gotoPb1Vocabualry} />
        <Button titleStyle={[styles.buttonText]} containerStyle={styles.buttonOutline} title={item.text5} type="outline" onPress={gotoPb2Vocabualry} />
        <Button titleStyle={[styles.buttonText]} containerStyle={styles.buttonOutline} title={item.text6} type="outline" onPress={gotoPb3Vocabualry} />
        <Text style={styles.brand}>{item.text7}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonSkipText: {
    paddingTop: 16,
    paddingLeft: 10,
    color: 'black',
    fontWeight: '400',
    fontSize: 32,
  },
  buttonText: {
    paddingTop: 8,
    width: 280,
    height: 36,
    color: 'black',
    fontWeight: '500',
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
    paddingTop: 40,
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  brand: {
    paddingTop: 60,
    paddingBottom: 30,
    fontSize: 24,
    fontWeight: '600',
    color: 'rgba(251, 205, 32, 0.8)',
    textAlign: 'center',
  }
});

export default Home;