import "./App.css";
import { WelcomeUser } from "./pages/WelcomeUser";
import { UserOnboarding } from "./components/UserOnboarding";
import { useApp } from "./context/app-context";

function App() {
  const { isUser } = useApp();
  return (
    <div className="app relative">
      <img
        src="https://picsum.photos/200/300"
        alt=""
        className="absolute h-full w-full -z-10"
      />
      {isUser ? <UserOnboarding /> : <WelcomeUser />}
    </div>
  );
}

export default App;
