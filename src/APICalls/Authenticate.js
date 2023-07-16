import { useDispatch } from "react-redux";
import { authorizeUser } from "../Store/CarStore";

const googleLogin = () => {
  const dispatch = useDispatch();
  fetch(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/auth/google"
      : "https://car-bazar-backend-pesto-team.vercel.app/auth/google",
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    }
  )
    .then((response) => {
      if (response.status === 200) {
        dispatch(authorizeUser());
        return response.json();
      }
      console.log("error");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default googleLogin;
