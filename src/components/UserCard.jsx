import React from "react";
import { useLocation } from "react-router";
import { axiosFetch } from "../lib/axiosFetch";
import constants from "../lib/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../store/feedSlice";

const UserCard = ({ userDetails }) => {
  const { _id, firstName, lastName, age, about, skills, photoURL, gender } =
    userDetails;

  const location = useLocation();
  const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) => {
    try {
      const res = await axiosFetch.post(
        constants.SEND_REQUEST + "/" + status + "/" + _id
      );
      console.log(res);
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure className="pt-4">
        <img src={photoURL} className="rounded-lg" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>
          {age}, {gender}
        </p>

        {skills && (
          <div className="flex">
            <span>Skills: </span>
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center ml-1.5">
                <span>{skill}</span>
                {index !== skills.length - 1 && <span>, </span>}
              </div>
            ))}
          </div>
        )}
        {about && <p>{about}</p>}

        {!(location.pathname == "/profile") && (
          <div className="card-actions justify-center gap-x-2 my-2">
            <button
              className="btn bg-red-500 text-white"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
