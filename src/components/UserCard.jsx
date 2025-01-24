import React from "react";
import { useLocation } from "react-router";

const UserCard = ({ userDetails }) => {
  const { firstName, lastName, age, about, skills, photoURL, gender } =
    userDetails;

  const location = useLocation();

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
          <div>
            <span>Skills: </span>
            {skills.map((skill, index) => (
              <>
                <span key={index}>{skill}</span>
                {index !== skills.length - 1 && <span>, </span>}
              </>
            ))}
          </div>
        )}
        {about && <p>{about}</p>}

        {!(location.pathname == "/profile") && (
          <div className="card-actions justify-center gap-x-2 my-2">
            <button className="btn bg-red-500 text-white">Ignore</button>
            <button className="btn btn-primary">Interested</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
