import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userLogin, logOutUser, getLogedUser } from '../../api';

const initialState = {
    loading: false,
    User: null,
    token: localStorage.getItem('authToken') || null, 
    error: ''
};

export const authenticateUser = createAsyncThunk('LOGIN_USER', async (data, { rejectWithValue }) => {
    try {
        const response = await userLogin(data);
        return response; 
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);  
    }
});

export const logoutUserStatus = createAsyncThunk('LOGOUT_USER', async (_, { rejectWithValue }) => {
    try {
        const response = await logOutUser();
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const getUserLoginStatus = createAsyncThunk('GET_USER', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('authToken'); 
        if (!token) {
            return rejectWithValue({ message: "No authentication token found", success: false });
        }

        const response = await getLogedUser();
        if (!response) {
            return rejectWithValue({ message: "Failed to fetch user data", success: false });
        }

        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: "Error fetching user data", success: false });
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(authenticateUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(authenticateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.User = action.payload?.user || null;  
            state.token = action.payload?.token || null;  
            state.error = '';
            
            if (action.payload?.token) {
                localStorage.setItem('authToken', action.payload.token); 
                localStorage.setItem('role', action.payload.user?.role);
            }
        });
        builder.addCase(authenticateUser.rejected, (state, action) => {
            state.loading = false;
            state.User = null;
            state.token = null;
            state.error = action.payload || 'Login failed'; 
        });

        builder.addCase(getUserLoginStatus.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserLoginStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.User = action.payload || null; 
            state.token = localStorage.getItem('authToken') || null; 
            state.error = '';
        });
        builder.addCase(getUserLoginStatus.rejected, (state, action) => {
            state.loading = false;
            state.User = null;
            state.error = action.payload || 'User fetch failed';
        });

        builder.addCase(logoutUserStatus.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(logoutUserStatus.fulfilled, (state) => {
            state.loading = false;
            state.User = null;
            state.token = null;
            state.error = '';
            localStorage.removeItem('authToken'); 
        });
        builder.addCase(logoutUserStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Logout failed';
        });
    }
});

export const userReducer = userSlice.reducer;
