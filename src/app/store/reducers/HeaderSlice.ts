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
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

export const addUserThunk = createAsyncThunk(
  'header/addUserThunk',
  async ({ data }: IUpdateUserSlice, thunkAPI) => {
    try {
      const response = await ApiService.registration(data);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

export const authUserThunk = createAsyncThunk(
  'header/authUserThunk',
  async ({ data }: IUpdateUserSlice, thunkAPI) => {
    try {
      const response = await ApiService.authorization(data);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

export const deleteUserThunk = createAsyncThunk('header/deleteUserThunk', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    console.log(`thunkAPI.getState userId`, state);
    const response = await ApiService.deleteUserById(state.header.userId);
    return response;
  } catch (err) {
    if (err instanceof Error) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
});

interface HeaderState {
  isAuthUser: boolean;
  userId: string;
  userName: string;
  userLogin: string;
  userPassword: string;
  status: string | null;
  error: string | undefined;
  headerData: IHeaderProps[];
}

const initialState: HeaderState = {
  isAuthUser: false,
  userId: 'f88fc000-6677-430c-9f14-8846d5fc34e8',
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
    logOutUser: (state) => {
      state.isAuthUser = false;
      localStorage.removeItem('token');
    },
    addPassword: (state, action: PayloadAction<string>) => {
      state.userPassword = action.payload;
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
        state.userId = action.payload.id;
        state.userLogin = action.payload.login;
        state.userName = action.payload.name;
        state.userPassword = action.payload.password;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

    //addUserThunk
    builder
      .addCase(addUserThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(addUserThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.userId = action.payload.id;
        state.userLogin = action.payload.login;
        state.userName = action.payload.name;
        state.isAuthUser = true;
      })
      .addCase(addUserThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

    //authUserThunk
    builder
      .addCase(authUserThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(authUserThunk.fulfilled, (state) => {
        state.status = 'resolved';
        state.isAuthUser = true;
      })
      .addCase(authUserThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.isAuthUser = false;
        state.error = action.payload as string;
      });

    //deleteUserThunk
    builder
      .addCase(deleteUserThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(deleteUserThunk.fulfilled, (state) => {
        state.status = 'resolved';
        localStorage.removeItem('token');
        state.isAuthUser = false;
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });
  },
});

export const { setHeaderData, logOutUser, addPassword } = headerSlice.actions;

export default headerSlice.reducer;
