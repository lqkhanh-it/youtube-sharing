import { message } from 'antd';
import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
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

interface UserToken {
  acecessToken: string;
  refreshToken: string;
}

export const fetchUser = createAsyncThunk('user/getUser', async () => {
  const data = JSON.parse(localStorage.getItem(USER_KEY) as string);
  return data?.user;
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

interface UserSignUpResponse {
  data: {
    token: UserToken;
    user: User;
  };
}

export const createUser = createAsyncThunk(
  'user/createUser',
  (user: Pick<User, 'name' | 'email' | 'password'>) =>
    new Promise((resolve, reject) => {
      request
        .post(HttpPaths.SIGNUP, user)
        .then((res: UserSignUpResponse) => {
          localStorage.setItem(USER_KEY, JSON.stringify(res?.data));
          resolve(res?.data?.user);
        })
        .catch((err) => {
          console.error('Error during sign-up:', err);
          if (err?.response?.data?.message) {
            message.error(err?.response?.data?.message);
          }
          reject(err);
        });
    }),
);

export const resetUserStatus = createAction('user/resetStatus', () => ({
  payload: initialState,
}));

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (_state, action) => {
        const state = _state;
        state.user = action.payload;
      })
      .addCase(resetUserStatus, (_state) => {
        const state = _state;
        state.status = ERequestStatus.IDLE;
      })
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
      .addCase(logoutUser.fulfilled, (_state) => {
        const state = _state;
        state.status = ERequestStatus.IDLE;
        state.user = null;
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

export const selectUser = (state: RootState) => state.user.user;
export const selectStatus = (state: RootState) => state.user.status;

export default userSlice.reducer;
