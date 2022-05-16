import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiService } from '../../Api/ApiService';
import { IBodyProps, IUpdateProfile } from '../../Interfaces/Interfaces';
import { RootState } from '../store';

export const updateUserThunk = createAsyncThunk(
  'header/updateUserThunk',
  async ({ editProfileData }: IUpdateProfile, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const response = await ApiService.createTasksById(state.header.userId, editProfileData);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);
interface BodyState {
  bodyData: IBodyProps[];
}

const initialState: BodyState = {
  bodyData: [
    {
      module: 'blablo',
      nextModule: false,
    },
  ],
};

export const bodySlice = createSlice({
  name: 'body',

  initialState,
  reducers: {
    setBodyData: (state, action: PayloadAction<IBodyProps[]>) => {
      state.bodyData = action.payload;
    },
  },
});

export const { setBodyData } = bodySlice.actions;

export default bodySlice.reducer;
