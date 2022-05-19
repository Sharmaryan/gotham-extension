import "./App.css";
import { WelcomeUser } from "./pages/WelcomeUser";
import { UserOnboarding } from "./components/UserOnboarding";
import { useApp } from "./context/app-context";

function App() {
  const { isUser } = useApp();
  return (
    <div className="app relative">
      <img
        src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"
        alt=""
        className="absolute h-full w-full -z-10"
      />
      {isUser ? <UserOnboarding /> : <WelcomeUser />}
    </div>
  );
}

export default App;
