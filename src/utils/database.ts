import AsyncStorage from '@react-native-community/async-storage';
import { lettersData } from "utils/letters";
import { soundModifiersData } from "utils/soundModifiers";
import { vocabularyData } from "utils/vocabulary"
import { numbersData } from "utils/numbers";

export default class database {
  static lettersObject: any = [];
  static soundModifiersObject: any = [];
  static vocabularyObject: any = [];
  static numbersObject: any = [];

  static async fetchLettersData(platform: any) {
    console.log('L14 database.ts fetchLettersData(): os name=' + platform)

    try {
      const value = await AsyncStorage.getItem('letters');
      let lettersJson = lettersData
      if (value !== null) {
        // Data found in cache
        // console.log('L21 database.ts fetchLettersData(): letters data = ', value);
        database.lettersObject = JSON.parse(value)
      } else {
        // No data found in cache, let's read it from file
        // console.log('L25 database.ts fetchLettersData(): no letters data cached')
        // if(platform === 'ios'){
        AsyncStorage.setItem('letters', JSON.stringify(lettersData))
        /* }else{
           AsyncStorage.setItem('letters',JSON.stringify(lettersAndroidData))
           lettersJson = lettersAndroidData
         }*/

        database.lettersObject = lettersJson
      }
    } catch (error) {
      // Error retrieving data
      console.log('L37 database.ts fetchLettersData(): letters data retrieval error ', error)
    }
  }

  static async fetchSoundModifiersData(platform: any) {
    try {
      const value = await AsyncStorage.getItem('soundModifiers');
      let soundModifiersJson = soundModifiersData

      if (value !== null) {
        // Data found in cache
        // console.log('L48 database.ts fetchLettersData(): vowels data = ', value);        
        database.soundModifiersObject = JSON.parse(value)
      } else {
        // No data found in cache, let's read it from file
        // console.log('L51 database.ts fetchLettersData(): no vowels data cached') 
        // if (platform === 'ios') {
          AsyncStorage.setItem('soundModifiers', JSON.stringify(soundModifiersData))
        //}
        /*
        else {
          AsyncStorage.setItem('soundModifiers', JSON.stringify(lettersAndroidData))
          lettersJson = lettersAndroidData
        }
        */
        database.soundModifiersObject = soundModifiersJson
      }
    } catch (error) {
      // Error retrieving data
      console.log('L66 database.ts fetchLettersData(): vowels data retrieval error ', error)
    }
  }

  static async fetchVocabularyData(platform: any) {
    try {
      const value = await AsyncStorage.getItem('vocabulary');
      let vocabularyJson = vocabularyData

      if (value !== null) {
        // Data found in cache
        // console.log('L77 database.ts fetchLettersData(): vocabulary data = ', value);
        database.vocabularyObject = JSON.parse(value)
      } else {
        // No data found in cache, let's read it from file
        // console.log('L81 database.ts fetchLettersData(): no vocabulary data cached')
        //if (platform === 'ios') {
          AsyncStorage.setItem('vocabulary', JSON.stringify(vocabularyData))
        //}
        database.vocabularyObject = vocabularyJson
      }
    } catch (error) {
      // Error retrieving data
      console.log('L89 database.ts fetchLettersData(): vocabulary data retrieval error ', error)
    }
  }

  static async fetchNumbersData(platform: any) {
    try {
      const value = await AsyncStorage.getItem('numbers');
      let numbersJson = numbersData

      if (value !== null) {
        // Data found in cache
        // console.log('L100 database.ts fetchLettersData(): numbers data = ', value);
        database.numbersObject = JSON.parse(value)
      } else {
        // No data found in cache, let's read it from file
        // console.log('L104 database.ts fetchLettersData(): no numbers data cached')
        //if (platform === 'ios') {
          AsyncStorage.setItem('vnumbers', JSON.stringify(numbersData))
        //}
        database.numbersObject = numbersJson
      }
    } catch (error) {
      // Error retrieving data
      console.log('L37 database.ts fetchLettersData(): numbers data retrieval error ', error)
    }
  }

  static getSoundModifiersData() {
    return database.soundModifiersObject
  }

  static setSoundModifiersData(soundModifiersData: []) {
    AsyncStorage.setItem('soundModifiers', JSON.stringify(soundModifiersData))
  }

  static getLettersData() {
    return database.lettersObject
  }
  static setLetterData(lettersData: []) {
    AsyncStorage.setItem('letters', JSON.stringify(lettersData))
  }

  static getVocabularyData() {
    return database.vocabularyObject
  }
  static setVocabularyData(vocabularyData: []) {
    AsyncStorage.setItem('vocabulary', JSON.stringify(vocabularyData))
  }

  static getNumbersData() {
    return database.numbersObject
  }
  static setNumbersData(numbersData: []) {
    AsyncStorage.setItem('numbers', JSON.stringify(numbersData))
  }

  static async removeLettersDatabase() {
    try {
      await AsyncStorage.removeItem('letters');
      return true;
    }
    catch (exception) {
      return false;
    }
  }
}