import React, { useEffect } from "react";
import { axiosFetch } from "../lib/axiosFetch";
import constants from "../lib/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  console.log(connections);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const res = await axiosFetch.get(constants.GET_CONNECTIONS);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  if (connections?.length == 0)
    return (
      <div>
        <h1>No connection</h1>
      </div>
    );

  return (
    connections?.length > 0 && (
      <div className="my-5 px-4">
        <div>
          <h1 className="text-2xl font-medium text-center">Connections</h1>
          <div className="my-5 flex gap-4">
            {connections.map((connection) => (
              <div
                key={connection._id}
                className="gap-x-2 mb-5 bg-base-300 p-4 rounded-md"
              >
                <div className="w-44 h-44">
                  <img
                    src={connection.photoURL}
                    className="object-cover w-full h-full rounded-md"
                    alt=""
                  />
                </div>
                <div className="my-2 text-lg font-medium">
                  <p>{connection.firstName + " " + connection.lastName}</p>
                  <p>{connection.age + ", " + connection.gender}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Connections;
