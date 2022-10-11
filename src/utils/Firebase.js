const firebase = require ('firebase');
require('firebase/firestore');

export class Firebase{

    constructor(){

        this._config = {
            apiKey: "AIzaSyAFj1nE7IwJXAYIx0Br62eBEW3eg6oqC-o",
            authDomain: "projeto-zap-ad552.firebaseapp.com",
            projectId: "projeto-zap-ad552",
            storageBucket: "projeto-zap-ad552.appspot.com",
            messagingSenderId: "330232996396",
            appId: "1:330232996396:web:25e82cfeaba0b176982789",
            measurementId: "G-VTVWZ2R79D"
          };

        this.init();

    }

    init(){

        if(!this._initialized){

            firebase.initializeApp(this._config);

            firebase.firestore().settings({

                timestampsInSnapshots: true

            }); 

            this._initialized = true;

        }   

    }

    static db(){

        return firebase.firestore();

    }

    static hd(){

        return firebase.storage();

    }
}