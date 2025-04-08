import Background from "../components/Background.jsx";
import Navbar from "../components/Navbar.jsx";
import UserSection from "../components/UserSection.jsx";
import AccountBalance from "../components/AccountBalance.jsx";
import avatarUrl from "../Assets/images/profile.jpg";

function Dashboard() {
  return (
    <Background>
      <Navbar firstName="Pujan" avatarUrl={avatarUrl} />
      <div className="bg-white/70 mx-auto w-1/2 mt-6 rounded-lg py-0.5">
        <AccountBalance balance={52392} />
      </div>
      <UserSection />
    </Background>
  );
}

export default Dashboard;
