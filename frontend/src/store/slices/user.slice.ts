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

export const logoutUser = createAsyncThunk('user/logout', async () => {
  localStorage.removeItem(USER_KEY);
  await request.post(HttpPaths.LOGOUT);
});

export const loginUser = createAsyncThunk(
  'user/login',
  async (user: Pick<User, 'email' | 'password'>) => {
    const res: UserSignUpResponse = await request.post(HttpPaths.LOGIN, {
      email: user.email,
      password: user.password,
    });
    localStorage.setItem(USER_KEY, JSON.stringify(res?.data));
    return res?.data?.user;
  },
);

interface UserSignUpResponse {
  data: {
    token: UserToken;
    user: User;
  };
}

export const createUser = createAsyncThunk(
  'user/createUser',
  async (user: Pick<User, 'name' | 'email' | 'password'>) =>
    new Promise((resolve, reject) => {
      request
        .post(HttpPaths.SIGNUP, user)
        .then((res) => {
          const response = res as UserSignUpResponse;
          localStorage.setItem(USER_KEY, JSON.stringify(response?.data));
          resolve(response?.data?.user);
        })
        .catch((err) => {
          console.error('Error during sign-up:', err);
          if (err?.response?.data?.message) {
            message.error(err?.response?.data?.message);
          }
          reject(err);
        });
    }) as Promise<User>,
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
        state.user = action.payload as User;
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
