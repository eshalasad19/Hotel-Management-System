import axios from "axios";

const API_URL = "http://localhost:5001/api/rooms";

// GET ALL ROOMS
export const getRooms = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// GET SINGLE ROOM
export const getSingleRoom = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};