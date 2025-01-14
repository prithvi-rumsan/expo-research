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

4. Build app from the cloud

   eas build

5. Build app locally for android or ios with the selected profile config which present in the eas.json file build section

   eas build --profile profile-name --platform android --local

## Misc

- eas build command by default ignores files listed in .gitignore.
