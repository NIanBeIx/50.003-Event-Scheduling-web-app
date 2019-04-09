import * as firebase from "firebase";
import {Injectable} from "@angular/core";

@Injectable()

export class  AuthService{
    signUp(email:string,password:string){
        firebase.auth().createUserWithEmailAndPassword(email,password).catch(
            error=>console.log(error)
        );
    }

    login(email:string,password:string){
        firebase.auth().signInWithEmailAndPassword(email,password).then(
            response=>console.log("Login successfully")
        ).catch(

        );
    }
/*
    push(content:string){
        
        firebase.firestore().collection('signin').doc('2ndlayer').collection('3rdlayer').add({
            title:'user registered',
            value:{first:'hellohello',second:2}
        }
        );
        console.log("successfully pushed");
    }
    */
/*
    get(content:string){
        var getDoc=firebase.firestore().collection('courses').doc(content).collection('cohort1').doc('lecture1').get().then(
            doc=>{
                if(!doc.exists){
                    console.log("document does not exist");
                }else{
                    console.log(doc.data);
                }
            }).catch(
                err=>console.log("error caught in getting method")
            )
        console.log("get data successfully");
    }
    */

    
}