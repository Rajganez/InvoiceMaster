import { create } from 'zustand';

// Create the Zustand store
const useAuthStore = create((set) => ({
  Id: '', // initial value of id
  setId: (newId) => set({ Id: newId }), // function to set the id
  Name: '', // initial value of Name
  setName: (newName) => set({ Name: newName }), // function to set the Name
}));

export default useAuthStore;
