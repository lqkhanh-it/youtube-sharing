import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';
import request, { ERequestStatus, HttpPaths } from '../../common/request';

export const USER_KEY = 'user';
export interface User {
  _id: string;
  name?: string;
  profilePicUrl?: string;
  email?: string;
  password?: string;
  verified?: boolean;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserState {
  user: User | null;
  status: ERequestStatus;
}

const initialState: IUserState = {
  user: null,
  status: ERequestStatus.IDLE,
};

export const fetchUsers = createAsyncThunk('user/getUser', async () => {
  const user = localStorage.getItem(USER_KEY);
  return user;
});

export const logoutUser = createAsyncThunk(
  'user/login',
  async () =>
    new Promise((resolve, reject) => {
      request
        .post(HttpPaths.LOGOUT)
        .then(() => {
          localStorage.removeItem(USER_KEY);
          resolve(true);
        })
        .catch((err) => {
          console.error('Request failed:', err);
          reject(err);
        });
    }),
);

export const loginUser = createAsyncThunk(
  'user/logout',
  async (user: Pick<User, 'email' | 'password'>) =>
    new Promise((resolve, reject) => {
      request
        .post(HttpPaths.LOGIN, { email: user.email, password: user.password })
        .then((res) => {
          localStorage.setItem(USER_KEY, JSON.stringify(res));
          resolve(res);
        })
        .catch((err) => {
          console.error('Request failed:', err);
          reject(err);
        });
    }),
);

export const createUser = createAsyncThunk(
  'user/createUser',
  (user: Pick<User, 'name' | 'email' | 'password'>) =>
    new Promise((resolve, reject) => {
      request
        .post(HttpPaths.SIGNUP, user)
        .then((res) => {
          const data = res as User;
          localStorage.setItem(USER_KEY, JSON.stringify(data));
          resolve(data);
        })
        .catch((err) => {
          console.error('Error during sign-up:', err);
          reject(err);
        });
    }),
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (_state) => {
        const state = _state;
        state.status = ERequestStatus.LOADING;
      })
      .addCase(loginUser.rejected, (_state) => {
        const state = _state;
        state.status = ERequestStatus.FAILED;
      })
      .addCase(loginUser.fulfilled, (_state, action) => {
        const state = _state;
        state.status = ERequestStatus.SUCCEEDED;
        state.user = action.payload;
      })
      .addCase(logoutUser.pending, (_state) => {
        const state = _state;
        state.status = ERequestStatus.LOADING;
      })
      .addCase(logoutUser.fulfilled, (_state) => {
        const state = _state;
        state.status = ERequestStatus.SUCCEEDED;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (_state) => {
        const state = _state;
        state.status = ERequestStatus.FAILED;
      })
      .addCase(createUser.pending, (_state) => {
        const state = _state;
        state.status = ERequestStatus.LOADING;
      })
      .addCase(createUser.fulfilled, (_state, action) => {
        const state = _state;
        state.status = ERequestStatus.SUCCEEDED;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (_state) => {
        const state = _state;
        state.status = ERequestStatus.FAILED;
      });
  },
});

export const selectUser = (state: RootState) => state.users.user;
export const selectStatus = (state: RootState) => state.users.status;

export default userSlice.reducer;
