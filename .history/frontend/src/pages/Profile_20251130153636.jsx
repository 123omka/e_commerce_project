import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../features/prprofileSlice";

function Profile() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-green-100 p-6 rounded shadow">
      <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
      <p className="mt-3">Email: {user?.email}</p>
      <p>User ID: {user?.id}</p>
    </div>
  );
}

export default Profile;
