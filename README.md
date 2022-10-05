# UCPunjabiApp

UCPunjabi is an app created for anyone interested in learning the Punjbai langugage using the Gurmukhi script. It is created specifically for the UC students are in the 1st year of Punjabi language learning. It is expected to act as a mobile companion to the learner.

## Pre-requisites for creating the developer environment on a Macbook

```bash
1. Install Node js : 
    brew install node
2. Install Watchman
    brew install watchman
3. install react native
    npm install -g react-native-cli
4. Download Xcode from https://developer.apple.com/ and install it.
5. Download Android Studio from https://developer.android.com/studio and install it.
   Make sure that Android SDK path is set under Preferences/Appearance & Behavior/System Settings/AndroidSDK 
   for the 3 tabs named SDK Platforms, SDK Tools and SDK Location.
6. Create an Apple developer account and obtain a license if you intend to make the app available via App Store. 
    https://developer.apple.com/ 
```

## Cloning the Project
Run the following below commands on the mac terminal
```git
1. Git clone https://github.com/nsinghGH/UCPunjabiApp
2. cd UCPunjabiApp
3. Create a local branch if you intend to make code changes
   git checkout -b <local branch name>
4. Install Node dependencies using NPM
   npm install
5. Install IoS dependencies using Pod
   cd ios
   pod install
   cd ..
6. npm run ios. '// for running the app on IOS simulator or devicee
7. npm run android  '// for running the app on android emulator or deevice

Follow the usual git commands such as add, commit and push etc. to submit local code change 

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
