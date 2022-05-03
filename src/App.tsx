import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import Login from "./pages/Login";
import { useEffect } from "react";
import { fetchLoginUser } from "./features/userSlice";
import { useDispatch } from "react-redux";
import { IUser } from "./types";

function App() {
  const user: IUser = useSelector(selectUser); // user authenticated
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoginUser());
  }, []);

  return user.isLoggedIn ? <MainLayout /> : <Login />;
}

export default App;
