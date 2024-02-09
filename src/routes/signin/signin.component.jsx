import { signInWithGooglePopup , createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const SignIn = () => {
    const logGoggleUser = async () => {
        const {user} = await signInWithGooglePopup();
        //console.log(response);
        createUserDocumentFromAuth(user);
     };

    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoggleUser}>Sign In with Google</button>
        </div>
    )
}

export default SignIn;
