import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userLogin, logOutUser, getLogedUser } from '../../api';
import { setAuthToken, clearAuthData } from '../../Utils/auth/authUtils';
import handleError from '../../Utils/HandleErrors/ErrorHandler';

const initialState = {
    loading: false,
    User: null,
    activeUserId: null,
    users: {},
    error: ''
};

export const authenticateUser = createAsyncThunk('LOGIN_USER', async (data, { rejectWithValue }) => {
    try {
        const response = await userLogin(data);
        if (response?.success && response?.data?.token) {
            const { id, token, role, expiresIn } = response.data;
            setAuthToken(id, token, role, expiresIn);
        }
        return response;
    } catch (error) {
        handleError(error);
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const logoutUserStatus = createAsyncThunk('LOGOUT_USER', async (_, { rejectWithValue }) => {
    try {
        const response = await logOutUser();
        if (response?.success) {
            clearAuthData();
        }
        return response;
    } catch (error) {
        handleError(error, 'bottom-right');
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const getUserLoginStatus = createAsyncThunk('GET_USER', async (_, { rejectWithValue }) => {
    try {
        const response = await getLogedUser();
        return response?.data;
    } catch (error) {
        handleError(error, 'bottom-right');
        return rejectWithValue(error.response?.data || { message: "Error fetching user data", success: false });
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        switchActiveUser: (state, action) => {
            const userId = action.payload;
            if (state.users[userId]) {
                state.activeUserId = userId;
                state.User = state.users[userId];
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticateUser.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(authenticateUser.fulfilled, (state, action) => {
                const userData = action.payload?.data;
                if (userData) {
                    state.users[userData.id] = userData;
                    state.activeUserId = userData.id;
                    state.User = userData;
                }
                state.loading = false;
                state.error = '';
            })
            .addCase(authenticateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Login failed';
            })
            .addCase(logoutUserStatus.fulfilled, (state) => {
                const userId = state.activeUserId;
                delete state.users[userId];
                state.activeUserId = Object.keys(state.users)[0] || null;
                state.User = state.users[state.activeUserId] || null;
                state.loading = false;
                state.error = '';
            });
    }
});

export const userReducer = userSlice.reducer;