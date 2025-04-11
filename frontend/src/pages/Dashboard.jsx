import Background from "../components/Background.jsx";
import Navbar from "../components/Navbar.jsx";
import UserSection from "../components/UserSection.jsx";
import AccountBalance from "../components/AccountBalance.jsx";
import avatarUrl from "../Assets/images/profile.jpg";
import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [userBalance, setUserBalance] = useState(0);

  useEffect(() => {
    const fetchUserBalance = async () => {
      const jwtToken = JSON.parse(localStorage.getItem("jwtToken")).token;
      const response = await axios.get("http://localhost:3000/api/v1/balance", {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      if(response.success) {

      }
      return response.data.data.balance;
    }

    const balance = fetchUserBalance();
    setUserBalance(balance);
  }, []);

  return (
    <Background>
      <Navbar firstName="Pujan" avatarUrl={avatarUrl} />
      <div className="bg-white/70 mx-auto w-1/2 mt-6 rounded-lg py-0.5">
        <AccountBalance balance={userBalance} />
      </div>
      <UserSection />
    </Background>
  );
}

export default Dashboard;
