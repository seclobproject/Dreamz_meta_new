import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL } from '../Constants';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

// Typescript codes to define type
interface UserInfo {
    email: string;
    password: string;
}

interface AppState {
    userInfo: UserInfo | null;
    pending: boolean;
    error: boolean;
}
// Typescript codes to define type
const MySwal = withReactContent(Swal);

// Redux action to get user
export const fetchUser = createAsyncThunk('fetchUser', async (data: any) => {

    const { email, password } = data;
    
    const config = {
        headers: { 'content-type': 'application/json' },
    };

    const response = await axios.post(`${URL}/api/users/login`, { email, password }, config);

    return response.data;
});

export const logout = createAsyncThunk('logout', async () => {
    localStorage.removeItem('userInfo');
});

const storedUserInfo = localStorage.getItem('userInfo');

const parsedUserInfo: UserInfo | null = storedUserInfo ? (JSON.parse(storedUserInfo) as UserInfo) : null;

const initialState: AppState = {
    userInfo: parsedUserInfo,
    pending: false,
    error: false,
};

const authSlice:any = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.pending = true;
            state.userInfo = null;
            state.error = false;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.pending = false;
            state.userInfo = action.payload;
            state.error = false;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            console.log('Error', action.payload);
            state.error = true;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.userInfo = null;
        });
    },
});



export default authSlice.reducer;
