import { message } from 'antd';
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import wsHelper from '../../common/websocket';
import type { RootState } from '..';
import { ERequestStatus } from '../../common/request';
import { User } from './user.slice';

export interface Video {
  _id: string;
  title: string;
  description: string;
  author: User;
  imgUrl?: string;
  status?: boolean;
  videoUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IVideoState {
  videos: Video[];
  status: ERequestStatus;
}

const initialState: IVideoState = {
  videos: [],
  status: ERequestStatus.IDLE,
};

export const shareVideo = createAsyncThunk('video/shareVideo', (url: string) => {
  wsHelper.sendMessage(url);
  message.success('Video shared!');
});

export const addVideo = createAction('video/addVideo', (video: Video[]) => ({
  payload: video,
}));

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addVideo, (_state, action) => {
      const state = _state;
      state.videos = [...action.payload, ...state.videos];
    });
    builder.addCase(shareVideo.rejected, (_state) => {
      const state = _state;
      state.status = ERequestStatus.FAILED;
    });
    builder.addCase(shareVideo.fulfilled, (_state) => {
      const state = _state;
      state.status = ERequestStatus.SUCCEEDED;
    });
    builder.addCase(shareVideo.pending, (_state) => {
      const state = _state;
      state.status = ERequestStatus.LOADING;
    });
  },
});

export const selectVideos = (state: RootState) => state.videos.videos;
export const selectStatus = (state: RootState) => state.videos.status;

export default videoSlice.reducer;
