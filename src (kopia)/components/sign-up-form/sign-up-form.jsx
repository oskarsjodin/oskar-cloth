import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput  from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-up-form.styles.scss';

const defaultformFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: ""
}
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultformFields);
  const {displayName, email, password, confirmPassword} = formFields;

  const resetFormFields = () => {
    setFormFields(defaultformFields);
  }
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormFields({...formFields, [name]: value});
  }
  const handlesubmit = async (event) => {
    event.preventDefault();
    if(password !== confirmPassword){
      alert("Password don't match");
      return;
    }
    try {
      const {user} = await createAuthUserWithEmailAndPassword(email,password);

      await createUserDocumentFromAuth(user, {displayName});



      resetFormFields();
    } catch (error) {
      console.log(error);
      if(error.code === "auth/email-already-in-use"){
        alert("Email already in use");
      }else {
       console.error("Error creating user", error);
      }
    }
  }

  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      <form onSubmit={handlesubmit}>
        <FormInput label="Display name" type="text" required name="displayName" onChange={handleChange} value={displayName} />
        <FormInput label="Email" type="email" required name="email" onChange={handleChange} value={email} />
        <FormInput label="Password" type="password" required name="password" onChange={handleChange} value={password} />
        <FormInput label="Confirm Password" type="password" required name="confirmPassword" onChange={handleChange} value={confirmPassword} />
        <Button label="Sign Up"  />
      </form>
    </div>
    )

}

export default SignUpForm;
