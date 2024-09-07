import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';
import request, { ERequestStatus, HttpPaths } from '../../common/request';
import { User } from './user.slice';

export interface Video {
  _id: string;
  title: string;
  description: string;
  author: string | User;
  imgUrl?: string;
  status?: boolean;
  videoUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IVideoState {
  video: Video[] | null;
  status: ERequestStatus;
}

const initialState: IVideoState = {
  video: null,
  status: ERequestStatus.IDLE,
};

export const fetchVideo = createAsyncThunk('video/fetchVideo', async () => []);

export const shareVideo = createAsyncThunk(
  'video/shareVideo',
  (user: Pick<User, 'name' | 'email' | 'password'>) =>
    new Promise((resolve, reject) => {
      request
        .post(HttpPaths.SIGNUP, user)
        .then((res) => {
          resolve(res as User);
        })
        .catch((err) => {
          console.log('Error during sign-up:', err);
          reject(err);
        });
    }),
);

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVideo.rejected, (_state) => {
      const state = _state;
      state.status = ERequestStatus.FAILED;
    });
  },
});

export const selectVideos = (state: RootState) => state.video;
export const selectStatus = (state: RootState) => state.users.status;

export default videoSlice.reducer;
