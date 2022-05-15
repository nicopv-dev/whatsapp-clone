import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import { fetchLoginUser, IUserState } from "./features/userSlice";
import Login from "./pages/Login";

function App() {
  const user = useSelector((state: IUserState) => state.user); // user authenticated
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoginUser());
  }, [dispatch]);

  return user.isLoggedIn ? <MainLayout /> : <Login />;
}

export default App;
