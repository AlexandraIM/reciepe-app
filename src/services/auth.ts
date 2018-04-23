import fb from 'firebase';

export class AuthService {
    singup(email: string, password: string){
        return fb.auth().createUserWithEmailAndPassword(email,password);
    }

    singin(email: string, password: string){
        return fb.auth().signInWithEmailAndPassword(email,password);
    }

    logout(){
        fb.auth().signOut();
    }

    getActiveUser(){
        return fb.auth().currentUser;
    }
}