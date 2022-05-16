import { useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import { fetchLoginUser, selectUser } from "./features/userSlice";
import Login from "./pages/Login";
import { useAppDispatch, useAppSelector } from "./app/store";

function App() {
  const user = useAppSelector(selectUser); // user authenticated
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLoginUser());
  }, [dispatch]);

  return user.isLoggedIn ? <MainLayout /> : <Login />;
}

export default App;
