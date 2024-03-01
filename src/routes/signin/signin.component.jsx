import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import SignUpForm from '../../components/sign-up-form/sign-up-form';
import Button from '../../components/button/button.container';



import { auth,
     signInWithGooglePopup,
     signInWithGoogleRedirect,
     createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const SignIn = () => {
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getRedirectResult(auth);
                if(response){
                    const userDocRef = await createUserDocumentFromAuth(response.user);
                }
            } catch (error) {
                console.error("Error fetching user", error);
            }
        }

        fetchUser();
    }, []);

    const logGoggleUser = async () => {
        try {
            const {user} = await signInWithGooglePopup();
            const userDocRef = await createUserDocumentFromAuth(user);
        } catch (error) {
            console.error("Error logging in user", error);
        }
     };


    return (
        <div>
            <h1>Sign In</h1>
            <Button class="button-container google-sign-in" onClick={logGoggleUser} label="Sign in width Google" />
            <Button onClick={signInWithGoogleRedirect} label="Sign In with Googleredirect" />
            <SignUpForm />
        </div>
    )
}

export default SignIn;
