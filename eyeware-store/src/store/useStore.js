import { create } from "zustand";
import axios from "axios";

axios.defaults.baseURL = "${import.meta.env.VITE_API_URL}";

export const useStore = create((set, get) => ({
  user: null, 
  cart: [],
  wishlist: [],
  saveForLater: [],

  login: (user) => set({ user }),
  logout: () => set({ user: null, cart: [], wishlist: [] }),

  fetchUserData: async () => {
  const user = get().user;
  if (!user) return;

  const res = await axios.get("/api/user/me", {
    headers: { Authorization: `Bearer ${user.token}` },
  });

  set({
    cart: res.data.cart,
    wishlist: res.data.wishlist,
    saveForLater: res.data.saveForLater, 
  });
},


addToCart: async (productId, navigate) => {
  const user = get().user;

  if (!user) {
    navigate("/login", {
      state: { from: window.location.pathname }
    });
    return;
  }

  await axios.post(`/api/user/cart/${productId}`, {}, {
    headers: { Authorization: `Bearer ${user.token}` }
  });

  await get().fetchUserData();
},

  removeFromCart: async (productId) => {
    const user = get().user;
    if (!user) return alert("Login required");
    try {
      const res = await axios.delete(`/api/user/cart/${productId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      set({ cart: res.data });
    } catch (err) {
      console.error(err);
    }
  },

  addToWishlist: async (productId) => {
  const user = get().user;
  if (!user) return alert("Login required");

  try {
    const res = await axios.post(
      `/api/user/wishlist/${productId}`,
      {},
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    set({ wishlist: res.data });
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.msg || "Failed to add to wishlist");
  }
},


  removeFromWishlist: async (productId) => {
    const user = get().user;
    if (!user) return alert("Login required");
    try {
      const res = await axios.delete(`/api/user/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      set({ wishlist: res.data });
    } catch (err) {
      console.error(err);
    }
  },

  saveForLaterItem: async (productId) => {
  const user = get().user;
  if (!user) return alert("Login required");

  await axios.post(
    `/api/user/cart/${productId}/save`,
    {},
    { headers: { Authorization: `Bearer ${user.token}` } }
  );

  await get().fetchUserData(); 
},

  moveToCartFromSave: async (productId) => {
  const user = get().user;

  await axios.post(
    `/api/user/save/${productId}/move-to-cart`,
    {},
    { headers: { Authorization: `Bearer ${user.token}` } }
  );

  await get().fetchUserData();
},


}));
