import ErrorComponent from "../components/ErrorComponent.jsx";
import Background from "../components/Background";
import Dialog from "../components/Dialog.jsx";
import InputField from "../components/InputField.jsx";
import SubmitButton from "../components/SubmitButton.jsx";
import DialogFooter from "../components/DialogFooter.jsx";
import Header from "../components/Header.jsx";
import SubHeader from "../components/SubHeader.jsx";
import FormWrapper from "../components/FormWrapper.jsx";
import VerticalGap from "../components/VerticalGap.jsx";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    const formData = {
      username,
      password
    }

    const token = JSON.parse(localStorage.getItem("jwtToken")).token;

    try {
      const response = await axios.post("http://localhost:3000/api/v1/sign-in", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;

      if (!data.success) {
        setError(data.message);
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <Background>
      <div className="flex justify-center items-center h-full">
        <Dialog>
          <Header headerText="Sign In" />
          <SubHeader subHeaderText="Enter Your Information To Sign In" />
          <FormWrapper onSubmit={handleSignIn}>
            <InputField value={username} onChange={(e) => setUsername(e.target.value)} label="Email" placeholder="pujankhunt2412@gmail.com" isRequired={true} type="text" />
            <InputField value={password} onChange={(e) => setPassword(e.target.value)} label="Password (8 Characters Minimum)" placeholder="Secure Password" isRequired={true} type="password" />
            <VerticalGap gap="my-4" />
            <SubmitButton buttonText="Submit" />
          </FormWrapper>
          <DialogFooter footerText="Dont have an account?" footerLinkText="Sign Up" />
          {error && <ErrorComponent errorMessage={error} />}
        </Dialog>
      </div>
    </Background>
  );
}

export default SignUp;
