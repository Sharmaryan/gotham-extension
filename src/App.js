import "./App.css";
import { WelcomeUser } from "./pages/WelcomeUser";
import { UserOnboarding } from "./components/UserOnboarding";
import { useApp } from "./context/app-context";
import { useEffect, useState } from "react";
import { imageDb } from "./db/imageDb";

function App() {
  const { isUser } = useApp();
  const [background, setBackground] = useState();

  useEffect(() => {
setBackground( imageDb[Math.floor(Math.random() * imageDb.length )])
  },[])
  return (
    <div className="app relative">
      <img
        src={background}
        alt="background"
        className="absolute h-full w-full -z-10"
      />
      {isUser ? <UserOnboarding /> : <WelcomeUser />}
    </div>
  );
}

export default App;
