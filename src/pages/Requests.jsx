import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { axiosFetch } from "../lib/axiosFetch";
import constants from "../lib/constants";
import { addRequests, removeRequest } from "../store/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = axiosFetch.post(
        constants.REVIEW_REQUEST + "/" + status + "/" + _id
      );
      dispatch(removeRequest(_id));
    } catch (err) {}
  };

  const fetchRequests = async () => {
    try {
      const res = await axiosFetch.get(constants.FETCH_REQUESTS);
      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
    <div className="text-center my-10 px-4">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoURL, age, gender, about } =
          request.senderId;

        return (
          <div
            key={_id}
            className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300  mx-auto"
          >
            <div className="w-20 h-20 rounded-full">
              <img
                alt="photo"
                className="object-cover w-full h-full rounded-full"
                src={photoURL}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              {about && <p>{about}</p>}
            </div>
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;
