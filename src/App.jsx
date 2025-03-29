import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Display from './components/Display';
import Home from './components/Home';
import './background.css'; // Importa el CSS que define las clases .bg, .bg2 y .bg3

function App() {
  // Comprueba en sessionStorage si ya se mostró la landing.
  const [showLanding, setShowLanding] = useState(() => {
    return !sessionStorage.getItem('landingShown');
  });

  const handleEnter = () => {
    sessionStorage.setItem('landingShown', 'true');
    setShowLanding(false);
  };

  return (
    <>
      {showLanding ? (
        <Home onEnter={handleEnter} />
      ) : (
        <main className="h-screen">
          <section className="h-[10%]">
            <NavBar />
          </section>
          <section className="h-[90%] flex">
            <Display />
          </section>
        </main>
      )}
    </>
  );
}

export default App;