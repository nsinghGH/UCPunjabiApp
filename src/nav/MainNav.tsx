import 'react-native-gesture-handler';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import { NavigationContainer, navigationRef, Navigator, ROUTERS, Screen } from 'utils/navigation'
import SplashScreen from 'react-native-splash-screen'
// @ts-ignore

import Home from "screens/Home";
import Gurmukhi from "screens/Gurmukhi";
import GurmukhiDetails from "screens/Gurmukhi/Details"
import Vowels from "screens/Vowels"
import Pb1Vocabulary from 'screens/Pb1Vocabulary';
import Pb1VocabularyL2 from 'screens/Pb1Vocabulary/Pb1VocabularyL2';
import Pb1VocabularyL3 from 'screens/Pb1Vocabulary/Pb1VocabularyL2/Pb1VocabularyL3';
import Pb2Vocabulary from 'screens/Pb2Vocabulary';
import Pb2VocabularyL2 from 'screens/Pb2Vocabulary/Pb2VocabularyL2';
import Pb2VocabularyL3 from 'screens/Pb2Vocabulary/Pb2VocabularyL2/Pb2VocabularyL3';
import Pb3Vocabulary from 'screens/Pb3Vocabulary';
import Pb3VocabularyL2 from 'screens/Pb3Vocabulary/Pb3VocabularyL2';
import Pb3VocabularyL3 from 'screens/Pb3Vocabulary/Pb3VocabularyL2/Pb3VocabularyL3';
import Numbers from 'screens/Numbers';
import NumbersDetails from 'screens/Numbers/NumbersDetails';
import Sketcher from 'screens/Testing'

const optionNavigator: any = {
    headerShown: false,
    gesturesEnabled: false,
};

const MainNavigation = memo(() => {
    useEffect(() => {
        SplashScreen.hide();
    }, []);
    const drawer = useRef();
    const onClose = useCallback(() => {
        // @ts-ignore
        drawer.current?.close();
    }, []);
    const onOpen = useCallback(() => {
        // @ts-ignore
        drawer.current?.open();
    }, []);

    return (

        <NavigationContainer
            // @ts-ignore
            ref={navigationRef}>
            <Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false
                }}
                initialRouteName={ROUTERS.Onboarding}>

                {/* <Screen name={ROUTERS.Onboarding} component={Walkthroughs} options={optionNavigator} /> */}
                <Screen name={ROUTERS.Home} component={Home} options={optionNavigator} />
                <Screen name={ROUTERS.Gurmukhi} component={Gurmukhi} options={optionNavigator} />
                <Screen name={ROUTERS.GurmukhiDetails} component={GurmukhiDetails} options={optionNavigator} />
                <Screen name={ROUTERS.Details} component={GurmukhiDetails} options={optionNavigator} />
                <Screen name={ROUTERS.Vowels} component={Vowels} options={optionNavigator} />
                <Screen name={ROUTERS.Pb1Vocabulary} component={Pb1Vocabulary} options={optionNavigator} />
                <Screen name={ROUTERS.Pb1VocabularyL2} component={Pb1VocabularyL2} options={optionNavigator} />
                <Screen name={ROUTERS.Pb1VocabularyL3} component={Pb1VocabularyL3} options={optionNavigator} />
                <Screen name={ROUTERS.Pb2Vocabulary} component={Pb2Vocabulary} options={optionNavigator} />
                <Screen name={ROUTERS.Pb2VocabularyL2} component={Pb2VocabularyL2} options={optionNavigator} />
                <Screen name={ROUTERS.Pb2VocabularyL3} component={Pb2VocabularyL3} options={optionNavigator} />
                <Screen name={ROUTERS.Pb3Vocabulary} component={Pb3Vocabulary} options={optionNavigator} />
                <Screen name={ROUTERS.Pb3VocabularyL2} component={Pb3VocabularyL2} options={optionNavigator} />
                <Screen name={ROUTERS.Pb3VocabularyL3} component={Pb3VocabularyL3} options={optionNavigator} />
                <Screen name={ROUTERS.Numbers} component={Numbers} options={optionNavigator} />
                <Screen name={ROUTERS.NumbersDetails} component={NumbersDetails} options={optionNavigator} />
                <Screen name={ROUTERS.Sketcher} component={Sketcher} options={optionNavigator} />
            </Navigator>
        </NavigationContainer>
    );
});

export default MainNavigation;
