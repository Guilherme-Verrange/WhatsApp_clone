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

        if(!window._initializedFirebase){

            firebase.initializeApp(this._config);

            firebase.firestore().settings({

                timestampsInSnapshots: true

            }); 

            window._initializedFirebase = true;

        }   

    }
    
    static db(){

        return firebase.firestore();

    }

    static hd(){

        return firebase.storage();

    }

    initAuth(){
         
        return new Promise((s, f)=>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
            .then(result =>{

                let token = result.credential.accessToken;
                let user = result.user;

                s({
                    user, 
                    token
                });

            })
            .catch(err => {

                f(err);

            });



        })

    }
}