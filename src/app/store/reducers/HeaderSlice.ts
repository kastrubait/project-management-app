import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ApiService } from '../../Api/ApiService';
import { IUpdateProfile, IUpdateUserSlice, IUser } from '../../Interfaces/Interfaces';
import { errorHandle } from '../../Api/ErrorHandle';
import { RootState } from '../store';
import * as jose from 'jose';

export const getAllUsers = createAsyncThunk('header/getAllUsers', async (_, thunkAPI) => {
  try {
    const response = await ApiService.getAllUsers();
    return response;
  } catch (err) {
    if (err instanceof Error) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
});

export const updateUserThunk = createAsyncThunk(
  'header/updateUserThunk',
  async ({ dataForm }: IUpdateProfile, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const response = await ApiService.updateUserById(state.header.userId, dataForm);
      return response;
    } catch (err) {
      if (err instanceof AxiosError) {
        errorHandle(err);
      }
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
      const response = await ApiService.registration({ data });
      if (response.id) {
        thunkAPI.dispatch(authUserThunk({ data }));
      }
      return response;
    } catch (err) {
      if (err instanceof AxiosError) {
        errorHandle(err);
      }
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
      const response = await ApiService.authorization({ data });
      return response;
    } catch (err) {
      if (err instanceof AxiosError) {
        errorHandle(err);
      }
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

export const deleteUserThunk = createAsyncThunk('header/deleteUserThunk', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const response = await ApiService.deleteUserById(state.header.userId);
    return response;
  } catch (err) {
    if (err instanceof AxiosError) {
      errorHandle(err);
    }
    if (err instanceof Error) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
});

export const getUserThunk = createAsyncThunk('header/getUserThunk', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const response = await ApiService.getUserById(state.header.userId);
    return response;
  } catch (err) {
    if (err instanceof AxiosError) {
      errorHandle(err);
    }
    if (err instanceof Error) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
});

interface HeaderState {
  users: IUser[];
  isAuthUser: boolean;
  userId: string | null;
  userName: string;
  userLogin: string;
  userPassword: string;
  status: string | null;
  error: string | undefined;
}

const initialState: HeaderState = {
  users: [],
  isAuthUser: false,
  userId: '',
  userLogin: '',
  userPassword: '',
  userName: '',
  status: null,
  error: undefined,
};

export const headerSlice = createSlice({
  name: 'header',

  initialState,
  reducers: {
    logOutUser: (state) => {
      state.isAuthUser = false;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    },
    addPassword: (state, action: PayloadAction<string>) => {
      state.userPassword = action.payload;
    },
    setIsAuthUser: (state, action: PayloadAction<boolean>) => {
      state.isAuthUser = action.payload;
    },
    setStatus: (state, action: PayloadAction<string | null>) => {
      state.status = action.payload;
    },
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
    },
    setErrors: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
    },
  },

  extraReducers: (builder) => {
    //updateUserProfile

    builder
      .addCase(updateUserThunk.pending, (state) => {
        state.error = undefined;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.userId = action.payload.id;
        localStorage.setItem('userId', action.payload.id);
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
        localStorage.setItem('userId', action.payload.id);
        state.userLogin = action.payload.login;
        state.userName = action.payload.name;
        state.isAuthUser = false;
        state.status = null;
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
      .addCase(authUserThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        localStorage.setItem('token', action.payload.token);
        state.userId = localStorage.getItem('userId');
        if (action.payload.token && !state.userId) {
          const claims = jose.decodeJwt(action.payload.token);
          state.userId = claims.userId as string;
          localStorage.setItem('userId', state.userId);
        }
        state.isAuthUser = true;
        state.status = null;
      })
      .addCase(authUserThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.isAuthUser = false;
        state.error = action.payload as string;
      });

    //deleteUserThunk

    builder
      .addCase(deleteUserThunk.pending, (state) => {
        state.error = undefined;
      })
      .addCase(deleteUserThunk.fulfilled, (state) => {
        state.status = 'resolved';
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        state.isAuthUser = false;
        state.status = null;
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

    //getAllUserThunk

    builder
      .addCase(getAllUsers.pending, (state) => {
        state.error = undefined;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.users = action.payload;
        state.status = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

    //getUserThunk

    builder
      .addCase(getUserThunk.pending, (state) => {
        state.error = undefined;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.userLogin = action.payload.login;
        state.userName = action.payload.name;
        state.status = null;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });
  },
});

export const { logOutUser, addPassword, setIsAuthUser, setStatus, setUserId, setErrors } =
  headerSlice.actions;

export default headerSlice.reducer;
