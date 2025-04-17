import { toast } from "react-toastify";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password
    }

    const token = JSON.parse(localStorage.getItem("jwtToken")).token;
    try {
      await axios.post("/sign-in", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success("User authenticated successfully.");
      navigate("/dashboard");
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return (
    <Background>
      <div className="flex justify-center items-center h-full">
        <Dialog>
          <Header headerText="Sign In" />
          <SubHeader subHeaderText="Enter Your Information To Sign In" />
          <FormWrapper onSubmit={handleSignIn}>
            <InputField value={email} onChange={(e) => setEmail(e.target.value)} label="Email" placeholder="pujankhunt2412@gmail.com" isRequired={true} type="text" />
            <InputField value={password} onChange={(e) => setPassword(e.target.value)} label="Password" placeholder="Secure Password" isRequired={true} type="password" />
            <VerticalGap gap="my-4" />
            {error && <ErrorComponent errorMessage={error} />}
            <SubmitButton buttonText="Submit" />
          </FormWrapper>
          <DialogFooter onClick={() => navigate("/sign-up")} footerText="Dont have an account?" footerLinkText="Sign Up" />
        </Dialog>
      </div>
    </Background>
  );
}

export default SignUp;
