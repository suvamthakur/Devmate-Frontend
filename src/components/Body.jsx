import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { axiosFetch } from "../lib/axiosFetch";
import constants from "../lib/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const fetchProfile = async () => {
    try {
      const res = await axiosFetch(constants.GET_PROFILE);
      dispatch(addUser(res.data.data));
    } catch (err) {
      if (err.status == 401) {
        navigate("/login");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchProfile();
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
