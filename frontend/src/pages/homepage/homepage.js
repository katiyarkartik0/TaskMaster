import Button from "components/Button/Button";
import Dashboard from "./dashboard/dashboard";
import { useSelector } from "react-redux";
import { getAccessToken, getUserData } from "helpers/selector";
import "./homepage.css";
import { persistor } from "index";
import { useNavigate } from "react-router-dom";
import UnauthorizedPage from "./unauthorizedPage/UnauthorizedPage";

const HomePage = () => {
  const navigate = useNavigate();
  const userData = useSelector(getUserData);
  const accessToken = useSelector(getAccessToken);
  const handleLogout = () => {
    persistor.purge();
    navigate("/");
  };
  if (accessToken) {
    return (
      <div className="App">
        <div className="nav">
          <h1>Todo App Dashboard</h1>
          <Button
            text={"Logout " + userData.name}
            onClickEvent={handleLogout}
          />
        </div>
        <br></br>
        <Dashboard />
      </div>
    );
  } else {
    return <UnauthorizedPage />;
  }
};

export default HomePage;
