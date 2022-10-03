import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

const ROUTERS = {
    Onboarding: 'Onboarding',
    Home: 'Home',
    Gurmukhi: 'Gurmukhi',
    GurmukhiDetails: 'GurmukhiDetails',
    Details: 'Details',
    Vowels: 'Vowels',
    ReportIssue: 'Report',
    Pb1Vocabulary: 'Pb1Vocabulary',
    Pb1VocabularyL2: 'Pb1VocabularyL2',
    Pb1VocabularyL3: 'Pb1VocabularyL3',
    Pb2Vocabulary: 'Pb2Vocabulary',
    Pb2VocabularyL2: 'Pb2VocabularyL2',
    Pb2VocabularyL3: 'Pb2VocabularyL3',
    Pb3Vocabulary: 'Pb3Vocabulary',
    Pb3VocabularyL2: 'Pb3VocabularyL2',
    Pb3VocabularyL3: 'Pb3VocabularyL3',
    Numbers: 'Numbers',
    NumbersDetails: 'NumbersDetails',
    Sketcher:'Sketcher'
};

export { Stack, NavigationContainer, Navigator, Screen, ROUTERS };

export const navigationRef = React.createRef();

export function navigate(name: string, params?: any) {
    // @ts-ignore
    navigationRef?.current?.navigate(name, params);
}
export function navigateModal(name: string, params?: any) {
}