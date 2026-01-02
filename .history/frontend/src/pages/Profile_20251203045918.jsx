import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../features/profile/profileSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((s) => s.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  if (loading) return <div className="mt-10 text-center">Loading...</div>;
  if (error) return <div className="mt-10 text-center text-red-600">{error}</div>;

  return (
    <>
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name}</h1>
      <p><strong>Email:</strong> {user?.email}</p>
      <p className="text-sm text-gray-600 mt-2">Member since: {new Date(user?.created_at).toLocaleString()}</p>
    </div>
    <div>
      <Product
      </div></>
  );
}
