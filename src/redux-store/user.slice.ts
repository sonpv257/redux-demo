import { User } from "@/types/user.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  users: User[];
  loading: boolean;
  message?: string;
  error?: string;
}

const initialState: UserState = {
  users: [],
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUsers: (state) => {
      state.loading = true;
    },
    fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.loading = false;
    },
    addUser: (state, _action: PayloadAction<User>) => {},
    addUserSuccess: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearMessage: (state) => {
      state.message = undefined;
      state.error = undefined;
    },
  },
});

export const userActions = { ...userSlice.actions };
export default userSlice.reducer;
