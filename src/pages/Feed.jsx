import React, { useEffect } from "react";
import { axiosFetch } from "../lib/axiosFetch";
import constants from "../lib/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import UserCard from "../components/UserCard";

function Feed() {
  const dispatch = useDispatch();
  const feedUsers = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    try {
      const res = await axiosFetch.get(constants.GET_FEED);
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    feedUsers && (
      <div className="flex justify-center my-5">
        {/* {feedUsers.map((user) => (
          <UserCard userDetails={user} />
        ))} */}
        {feedUsers.length > 0 ? (
          <UserCard userDetails={feedUsers[0]} />
        ) : (
          <h1 className="text-center">No new users found</h1>
        )}
      </div>
    )
  );
}

export default Feed;
