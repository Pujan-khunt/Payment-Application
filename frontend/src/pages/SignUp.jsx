import Background from "../components/Background.jsx";
import Dialog from "../components/Dialog.jsx";
import InputField from "../components/InputField.jsx";
import SubmitButton from "../components/SubmitButton.jsx";
import DialogFooter from "../components/DialogFooter.jsx";
import Header from "../components/Header.jsx";
import SubHeader from "../components/SubHeader.jsx";
import FormWrapper from "../components/FormWrapper.jsx";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorComponent from "../components/ErrorComponent.jsx";
import { toast } from "react-toastify";

function SignIn() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios.post("/sign-up", formData);
      const data = response.data;
      if (data.success) {
        console.log(data.data.jwtToken);
        localStorage.setItem("jwtToken", JSON.stringify({ token: data.data.jwtToken }));
        toast.success("Account created successfully. Please sign in.");
        navigate("/sign-in");
      } else {
        setError(data.data.message);
        console.error("Sign up failed:", data.message);
      }
    } catch (error) {
      setError(error.message);
      console.error("Error signing up:", error);
    }
  }

  return (
    <Background>
      <div className="flex justify-center items-center h-full">
        <Dialog>
          <Header headerText="Sign Up" />
          <SubHeader subHeaderText="Enter Your Information To Create Your Account" />
          <FormWrapper onSubmit={handleSignUp}>
            <InputField ref={usernameRef} label="Username (Lowercase)" placeholder="pujan-khunt" isRequired={true} type="text" />
            <InputField ref={emailRef} label="Email" placeholder="pujankhunt2412@gmail.com" isRequired={true} type="email" />
            <div className="flex gap-4">
              <InputField ref={firstNameRef} label="First Name" placeholder="Pujan" isRequired={true} type="text" />
              <InputField ref={lastNameRef} label="Last Name" placeholder="Khunt" isRequired={true} type="text" />
            </div>
            <InputField ref={passwordRef} label="Password (8 Characters Minimum)" placeholder="Secure Password" isRequired={true} type="password" />
            {error && <ErrorComponent errorMessage={error} />}
            <SubmitButton buttonText="Submit" />
          </FormWrapper>
          <DialogFooter onClick={() => navigate("/sign-in")} footerText="Already have an account?" footerLinkText="Sign In" />
        </Dialog>
      </div>
    </Background>
  );
}

export default SignIn;
