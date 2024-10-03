// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { producerNotifyConsumers } from "@angular/core/primitives/signals";

export const environment = {
  production: false, 
  firebaseConfig: {
    apiKey: "AIzaSyADxfQKrzVaEcIA3qNlKKH_n5nRgeMsFHU",
    authDomain: "escuela-40983.firebaseapp.com",
    projectId: "escuela-40983",
    storageBucket: "escuela-40983.appspot.com",
    messagingSenderId: "251684944087",
    appId: "1:251684944087:web:d48b905b08a738a4355892"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
