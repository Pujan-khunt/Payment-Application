import Background from "../components/Background";
import Dialog from "../components/Dialog.jsx";
import InputField from "../components/InputField.jsx";
import SubmitButton from "../components/SubmitButton.jsx";
import DialogFooter from "../components/DialogFooter.jsx";
import Header from "../components/Header.jsx";
import SubHeader from "../components/SubHeader.jsx";
import FormWrapper from "../components/FormWrapper.jsx";

function SignUp() {
  return (
    <Background>
      <div className="flex justify-center items-center h-full">
        <Dialog>
          <Header headerText="Sign Up" />
          <SubHeader subHeaderText="Enter Your Information To Sign In" />
          <FormWrapper>
            <InputField label="Username" placeholder="Pujan Khunt" isRequired={true} type="text" />
            <InputField label="Password (8 Characters Minimum)" placeholder="Secure Password" isRequired={true} type="password" />
            <SubmitButton buttonText="Submit" />
          </FormWrapper>
          <DialogFooter footerText="Already have an account?" footerLinkText="Sign In" />
        </Dialog>
      </div>
    </Background>
  );
}

export default SignUp;
