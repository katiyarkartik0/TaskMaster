import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { persistor } from "index";

import Button from "components/Button/Button";
import Dashboard from "pages/homepage/dashboard/dashboard";
import UnauthorizedPage from "pages/homepage/unauthorizedPage/UnauthorizedPage";

import { getAccessToken, getUserData } from "helpers/selector";

import "./homepage.css";

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
          <h1 className="app-title">Task Master</h1>
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
