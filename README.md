# Welcome to the EXPO Research App

## Get started

1. Install dependencies

   npm install

2. Start the App

   npm run start
   and then open the app on the required platform

## EAS Commands

1. Install EAS CLI

   npm install -g eas-cli

2. Login to the EAS CLI

   eas login

3. Check the current user

   eas whoami

4. Create EAS build configuration file

   eas build:configure

5. Build app from the cloud with selected profile

   eas build --profile development

6. Build app through EAS for android or ios with the selected profile config which present in the eas.json file build section

   eas build --profile profile-name --platform android --local

## Misc

- eas build command by default ignores files listed in .gitignore.
- We can directly run features supported by Expo SDK without development client build.
- If the app uses native modules, then we need to create a development build and install that APK in our physical device and then start our expo server.
- The development build provides the native modules while the server provides the JavaScript bundle and other assets needed to run the app
