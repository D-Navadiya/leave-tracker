# General set up to run the app (Android)

## Prerequisites

- **Yarn** OR **NPM**
- **Node** >= **10**
- **JDK** >= **8**
- **Android Studio** having **Android 10 (Q) SDK**
- **react-native-cli**

---

## Running the app

### All the below commands should be ran at the root folder

1. yarn install OR npm install

   - To install the required node packages/modules

2. Start an emulator OR connect a physical device (allow USB debugging)

   - Can run **adb devices** to check if the device is connected.

3. yarn start | npm start | npx react-native start

   - To start the metro server

4. yarn run android | npm run android | npx react-native run-android

   - To build and install the app on to the testing device

---

# Naming conventions

- It is important to manage the naming of the files and folders throughout
  the project for the sake of it's scalability and flexibility

1. Naming conventions

- **Folder Names** : lowercase, separating words with dashes '-' (e.g. custom-drawer-content)

- **File Names** : PascalCase (e.g. CustomDrawerContent.jsx | except index.js, stays the same)
- **Variable Names** : almost always camelCase (e.g. const registerUserData = {}), of course except the React Elements as they have to be PascalCase always.
- **Style Names** : similar to BEM-web, we tweak it as CEM.
  CEM (Component_element\_\_modifier)

  Component: component name(in PascalCase)

  element: prefixed with underscore '\_' and followed by element name (in camelCase)

  modifier: prefixed with double underscore '\_\_' and followed by modifier name(in camelCase)
