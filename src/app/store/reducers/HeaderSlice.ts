import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiService } from '../../Api/ApiService';
import { IBoardData } from '../../Interfaces/IBoard';
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
      if (response.id) {
        thunkAPI.dispatch(authUserThunk({ data }));
      }
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

export const createBoardThunk = createAsyncThunk(
  'header/createBoardThunk',
  async (title: string, thunkAPI) => {
    try {
      const response = await ApiService.createBoard(title);
      console.log(`response in thunk`, response);

      return response;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

export const getBoardTitleThunk = createAsyncThunk(
  'header/getBoardTitleThunk',
  async (boardId: string, thunkAPI) => {
    try {
      const response = await ApiService.getBoardById(boardId);
      console.log(`response in thunk`, response);

      return response;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

export const deleteBoardThunk = createAsyncThunk(
  'header/deleteBoardThunk',
  async (boardId: string, thunkAPI) => {
    try {
      const response = await ApiService.deleteBoardById(boardId);
      console.log(`response in thunk`, response);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

export const getAllBoardThunk = createAsyncThunk('header/getAllBoardThunk', async (_, thunkAPI) => {
  try {
    const response = await ApiService.getAllBoard();
    console.log(`response in thunk`, response);

    return response;
  } catch (err) {
    if (err instanceof Error) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
});

export const updateBoardThunk = createAsyncThunk(
  'header/ updatetBoardThunk',
  async ({ id, title }: IBoardData, thunkAPI) => {
    try {
      const response = await ApiService.updateBoardById(id, title);
      console.log(`response in thunk`, response);

      return response;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

interface IBoard {
  id: string;
  title: string;
}

interface HeaderState {
  isAuthUser: boolean;
  userId: string;
  userName: string;
  userLogin: string;
  userPassword: string;
  status: string | null;
  error: string | undefined;
  boards: IBoard[];
  boardTitle: string;
  headerData: IHeaderProps[];
}

const initialState: HeaderState = {
  isAuthUser: false,
  userId: '',
  userLogin: '',
  userPassword: '',
  userName: '',
  status: null,
  error: undefined,
  boards: [],
  boardTitle: '',
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
    //updateUserProfile

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
        state.status = null;
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
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(deleteUserThunk.fulfilled, (state) => {
        state.status = 'resolved';
        localStorage.removeItem('token');
        state.isAuthUser = false;
        state.status = null;
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

    //createBoardThunk

    builder
      .addCase(createBoardThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(createBoardThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.boards.push(action.payload);
        state.status = null;
      })
      .addCase(createBoardThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

    //deleteBoardThunk

    builder
      .addCase(deleteBoardThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(deleteBoardThunk.fulfilled, (state) => {
        state.status = 'resolved';
        state.status = null;
      })
      .addCase(deleteBoardThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

    //getAllBoardThunk

    builder
      .addCase(getAllBoardThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(getAllBoardThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.boards = [...action.payload];
        state.status = null;
      })
      .addCase(getAllBoardThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

    //updateBoardThunk

    builder
      .addCase(updateBoardThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(updateBoardThunk.fulfilled, (state) => {
        state.status = 'resolved';
        // state.boards = [...action.payload];
        state.status = null;
      })
      .addCase(updateBoardThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

    //getBoardTitleThunk

    builder
      .addCase(getBoardTitleThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(getBoardTitleThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.boardTitle = action.payload.title;
        state.status = null;
      })
      .addCase(getBoardTitleThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });
  },
});

export const { setHeaderData, logOutUser, addPassword } = headerSlice.actions;

export default headerSlice.reducer;
