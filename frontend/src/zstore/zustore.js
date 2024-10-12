import { create } from 'zustand';

// Create the Zustand store
const useAuthStore = create((set) => ({
  role: 'distributor', // initial value of role
  setRole: (newRole) => set({ role: newRole }), // function to set the role
}));

export default useAuthStore;
