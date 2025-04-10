import Background from "../components/Background.jsx";
import Dialog from "../components/Dialog.jsx";
import InputField from "../components/InputField.jsx";
import SubmitButton from "../components/SubmitButton.jsx";
import DialogFooter from "../components/DialogFooter.jsx";
import Header from "../components/Header.jsx";
import SubHeader from "../components/SubHeader.jsx";
import FormWrapper from "../components/FormWrapper.jsx";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const formData = {
      username,
      firstName,
      lastName,
      password,
    };

    try {
      const response = await axios.post("http://localhost:3000/api/v1/sign-up", formData);
      const data = response.data;
      if (data.success) {
        console.log(data.data.jwtToken);
        localStorage.setItem("jwtToken", JSON.stringify({ token: data.data.jwtToken }));
        navigate("/sign-in");
      } else {
        console.error("Sign up failed:", data.message);
        alert(data.message);
      }

    } catch (error) {
      alert("An error occurred while signing up. Please try again.");
      console.error("Error signing up:", error);
    }
  }

  return (
    <Background>
      <div className="flex justify-center items-center h-full">
        <Dialog>
          <Header headerText="Sign Up" />
          <SubHeader subHeaderText="Enter Your Information To Create Your Account" />
          <FormWrapper onSubmit={handleSignIn}>
            <InputField value={username} onChange={(e) => setUsername(e.target.value)} label="Email" placeholder="pujankhunt2412@gmail.com" isRequired={true} type="email" />
            <InputField value={firstName} onChange={(e) => setFirstName(e.target.value)} label="First Name" placeholder="Pujan" isRequired={true} type="text" />
            <InputField value={lastName} onChange={(e) => setLastName(e.target.value)} label="Last Name" placeholder="Khunt" isRequired={true} type="text" />
            <InputField value={password} onChange={(e) => setPassword(e.target.value)} label="Password (8 Characters Minimum)" placeholder="Secure Password" isRequired={true} type="password" />
            <SubmitButton buttonText="Submit" />
          </FormWrapper>
          <DialogFooter footerText="Already have an account?" footerLinkText="Sign In" />
        </Dialog>
      </div>
    </Background>
  );
}

export default SignIn;
