import axios from "axios";

export const fetchOrders = async (username) => {
  if (!username) throw new Error("Username is required");

  return axios.get(
    `https://dishpop-restro-side-backend.onrender.com/api/v1/public/restaurants/${username}/orders`

    // `http://localhost:5001/api/v1/public/restaurants/${username}/orders`
  );
};
