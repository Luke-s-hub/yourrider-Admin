// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false.valueOf,
  api: {
  	version: '1.0',
  	//url: 'http://192.168.43.203:80/api/',
  	//url: 'https://api.yourrider.com/api/',
  	url: 'http://yourriderapi.test/api/',
    imageUrl: 'http://yourriderapi.test/',
    // url: 'https://api.yourrider.com/api/',
    // imageUrl: 'https://api.yourrider.com/images/',
  },
  firebase: {
    apiKey: "AIzaSyDZV-bq-pWtpIOVcEuIHKZYOaNOU_NWDSA",
    authDomain: "yourrider-fe6e5.firebaseapp.com",
    projectId: "yourrider-fe6e5",
    storageBucket: "yourrider-fe6e5.appspot.com",
    messagingSenderId: "227045071694",
    appId: "1:227045071694:web:12b3f39f7f3585c8a25c1f",
    measurementId: "G-E7Z972Z2Y0"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
