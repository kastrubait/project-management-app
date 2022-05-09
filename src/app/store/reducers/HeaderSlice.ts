import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiService } from '../../Api/ApiService';
import { IHeaderProps, IUpdateUserSlice } from '../../Interfaces/Interfaces';
import { RootState } from '../store';

export const updateUserThunk = createAsyncThunk(
  'header/updateUserThunk',
  async ({ data }: IUpdateUserSlice, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const response = await ApiService.updateUserById(state.header.userId, data);
      console.log(`test response`, response);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

interface HeaderState {
  userId: string;
  userName: string;
  userLogin: string;
  userPassword: string;
  status: string | null;
  error: string | undefined;
  headerData: IHeaderProps[];
}

const initialState: HeaderState = {
  userId: '97734a86-937e-4e5b-8e04-3519b5610c15',
  userLogin: '',
  userPassword: '',
  userName: '',
  status: null,
  error: undefined,
  headerData: [
    {
      module: 'blablo',
      nextModule: false,
    },
  ],
};

export const headerSlice = createSlice({
  name: 'header',

  initialState,
  reducers: {
    setHeaderData: (state, action: PayloadAction<IHeaderProps[]>) => {
      state.headerData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        console.log(`test extraReducer:`, action.payload);
        state.userId = action.payload.id;
        state.userLogin = action.payload.login;
        state.userName = action.payload.name;
        state.userPassword = action.payload.password;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });
  },
});

export const { setHeaderData } = headerSlice.actions;

export default headerSlice.reducer;
