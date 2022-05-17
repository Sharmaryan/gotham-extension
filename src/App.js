import "./App.css";
import { WelcomeUser } from "./pages/WelcomeUser";
import { UserOnboarding } from "./components/UserOnboarding";
import { useApp } from "./context/app-context";

function App() {
  const { isUser } = useApp();
  return (
    <div className="app relative">
      <img
        src="https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
        alt=""
        className="absolute h-full w-full -z-10"
      />
      {isUser ? <UserOnboarding /> : <WelcomeUser />}
    </div>
  );
}

export default App;
