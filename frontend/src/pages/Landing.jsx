import Background from '../components/Background';
import LandingNavbar from '../components/LandingNavbar';
import CentralPiece from '../components/CentralPiece';

function Landing() {
  return (
    <>
      <Background>
        <LandingNavbar />
        <CentralPiece/>
      </Background>
    </>
  )
}

export default Landing
