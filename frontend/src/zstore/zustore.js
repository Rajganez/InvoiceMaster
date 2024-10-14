import { create } from 'zustand';

// Create the Zustand store
const useAuthStore = create((set) => ({
  name: '', // initial value of role
  setName: (newName) => set({ name: newName }), // function to set the role
}));

export default useAuthStore;
