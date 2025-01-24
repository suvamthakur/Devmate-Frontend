import React, { useEffect, useState } from "react";
import { axiosFetch } from "../lib/axiosFetch";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router";
import constants from "../lib/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("sumit@gmail.com");
  const [password, setPassword] = useState("Sumit@12345");
  const [error, setError] = useState("");
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      const res = await axiosFetch.post(constants.LOGIN, {
        email,
        password,
      });
      dispatch(addUser(res.data.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-12">
      <div className="card bg-base-300 text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title text-zinc-300 mx-auto">Login</h2>

          <div className="text-zinc-400 font-medium">
            <div className="my-3">
              <label htmlFor="">Email</label>
              <input
                type="email"
                className="w-full my-1 px-3 py-1.5 rounded-md text-zinc-200 font-normal outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-3">
              <label htmlFor="">Password</label>
              <input
                type="password"
                className="w-full my-1 px-3 py-1.5 rounded-md text-zinc-200 font-normal outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className="font-medium text-red-500">{error}</p>
          </div>
          <div className="card-actions justify-center">
            <button
              className="btn bg-zinc-950 text-zinc-400 text-base"
              onClick={() => handleLogin()}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
