/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React, {useCallback} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   TouchableWithoutFeedback,
   FlatList,
   StatusBar,
   Platform
 } from 'react-native';
 import { Button, ButtonGroup, Image, colors } from 'react-native-elements';
 import { EventRegister } from 'react-native-event-listeners'
 import { useNavigation } from "@react-navigation/native";
 import { ROUTERS } from "utils/navigation";
 import database from "utils/database";
 import LinearGradient from 'react-native-linear-gradient'
 
 var isIos = false;
 let headerMarginTop = 0;
 let gridViewTop = 0;
 let topic = ""
 let titleText = ""
 
 if (Platform.OS == 'ios') {
   isIos = true;
   headerMarginTop = 23;
   gridViewTop = 10;
 }

const Pb2VocabularyL2 = ({ route }) => {
  //console.log('L43 Pb2VocabularyL2(), route.params=', route.params)
  if (route.params) {
    topic = route.params.item.topic  // this is the name of the selected vocabualry topic
    titleText = route.params.titleText 
  }

  let listner: any;
  let vocabularyData: [] = database.getVocabularyData()
  let [allWords, setWords] = React.useState(vocabularyData)
 
  //Filter in vocabulary only for the selected topic
  let topicWords = allWords[topic]
  let vocKeys =  Object.keys(topicWords)
 
  // Setup for the ButtonGroup and list of words to display
  let buttons = []
  let [selectedButtonIdx, setSelectedButtonIdx] = React.useState(0)
  let [listWords, setListWords] = React.useState(topicWords[vocKeys[0]])

  // Setup for the button labels
  for (var vkey in vocKeys){
    buttons.push(vocKeys[vkey])
  }

  const { navigate } = useNavigation();

  const onBackPress = useCallback(() => {
    if (listner) {
      EventRegister.removeEventListener(listner)
    }

    navigate(ROUTERS.Pb2Vocabulary);
  }, []);

  const onButtonPress = (item: any) => {
    //Set the relevant word group to dispaly, e.g. Adjectives, Nouns or Verbs
    let selectedWordGroup = vocKeys[selectedButtonIdx];

    //Set the actual word list to display
    let selectedWords = topicWords[vocKeys[selectedButtonIdx]]

    // Send the entire context to the next screen via the navigation route
    navigate(ROUTERS.Pb2VocabularyL3, {titleText, topic, item, selectedWordGroup, selectedWords});
  }

  const showList = (selectedIdx: any) => {
    //console.log('L89 Pb2VocabularyL2(), showList pressed selectedIdx = ', selectedIdx);
    setListWords(topicWords[vocKeys[selectedIdx]])
    setSelectedButtonIdx(selectedIdx)
  }

  const ItemSeprator = () => <View style={{
    height: 1,
    width: "100%",
    backgroundColor: "silver",
  }} />

  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}

      <View style={{ flexDirection: 'row', backgroundColor: "#009DC2", paddingTop: 30 }}>
        <Button onPress={onBackPress} titleStyle={styles.buttonSkipText} type = 'clear' title="<"/>
        <Text style={{ fontSize: 22, marginTop: headerMarginTop, marginLeft: 48, textAlign: 'center' }}>{titleText}</Text>
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
          
          <Text style={styles.topic}>{topic}</Text>
          <Text/>{/* spacer */}
          
          <ButtonGroup
            selectedIndex={selectedButtonIdx}
            buttons={buttons}
            containerStyle={{ height: 40 }}
            selectedButtonStyle={styles.selectedButton}
            onPress={showList}
            />
            <Text/>{/* spacer */}
            
            <FlatList
              //contentContainerStyle={{flexDirection : "row", flexWrap : "wrap"}} 
              data={listWords}
              keyExtractor={(item => item.id.toString())}
              numColumns = {1}
              ItemSeparatorComponent={ItemSeprator}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={() => onButtonPress(item)}>
                <View style={styles.listItem}>
                  <Text style={styles.wordTextPunjabi}>{item.punjabi}</Text>
                  <Text style={styles.wordTextEnglish}>{item.english}</Text>
                </View>
                </TouchableWithoutFeedback>
                )}
            />

        </LinearGradient>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    alignItems: 'center',
    padding: 2,
    flexDirection: 'row',
  },
  buttonSkipText: {
    paddingTop: 16,
    paddingLeft: 10,
    color: 'black',
    fontWeight: '400',
    fontSize: 32,
  },
  wordTextPunjabi: {
    width: 150,
    fontSize: 17,
    color: 'black',
    textAlign: 'left',
    paddingTop: 8,
    paddingLeft: 16,
  },
  wordTextEnglish: {
    width: 240,
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
    paddingTop: 9,
  },
  listView: {
    width: 100,
    marginTop: 0,
    flex: 1,
    justifyContent: 'space-between',
  },
  listItem: {
    flex: 0.5,
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 4,
  },
  selectedButton:{
    backgroundColor: 'skyblue',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
  },
  sectionHeader: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    alignItems: 'center',
    color: 'gold',
    padding: 0,
    marginLeft: 20,
  },
  topic:{
    fontSize: 20,
    textAlign: 'center'
  },
  colWrap:{
    flexWrap: "wrap"
  },
});

export default Pb2VocabularyL2;