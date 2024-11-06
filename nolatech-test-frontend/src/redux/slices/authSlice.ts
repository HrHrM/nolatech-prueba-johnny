import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type Role = 'Admin' | 'Manager' | 'Employee';


const initialRole: Role | null = (localStorage.getItem('role') as Role) || null;
const initialID: string | null = (localStorage.getItem('id')) || '';
const initialName: string | null = (localStorage.getItem('name')) || '';

interface AuthState {
  role: Role | null;
  id: string;
  name: string;
}

const initialState: AuthState = {
  role: initialRole,
  id: initialID,
  name: initialName,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<Role>) => {
      state.role = action.payload;
      // save the role in localStorage
      localStorage.setItem('role', action.payload);
    },
    clearRole: (state) => {
      state.role = null;

      // delete the role from localStorage
      localStorage.removeItem('role');
    },
    setID: (state, action: PayloadAction<number>) => {
      // console.log('ACTION ID', action);
      state.id = action.payload.toString();
      // console.log('STATE ID', state);
      // save the id in localStorage
      localStorage.setItem('id', action.payload.toString());
    },
    clearID: (state) => {
      state.id = '';
      // delete the id from localStorage
      localStorage.removeItem('id');
    },
    setName: (state, action: PayloadAction<string>) => {
      // console.log('ACTION NAME', action);
      state.name = action.payload;
      // console.log('STATE NAME', state);

      // save the name in localStorage
      localStorage.setItem('name', action.payload);
    },
    clearName: (state) => {
      state.name = '';
      // delete the name from localStorage
      localStorage.removeItem('name');
    },
  },
});

export const { setRole, clearRole, setID, clearID, setName, clearName } = authSlice.actions;
export default authSlice.reducer;
