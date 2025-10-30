import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setCookie} from "../utils/utils";
import {apiHost} from "../apiData";

export const updateUserProfile = createAsyncThunk(
    'updateUserProfile/updateUserProfile',
    async (_, {getState, rejectWithValue}) => {
        const state = getState().userProfile.form;
        const response = await fetch(`${apiHost}/api/user/profile`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                forename: state.forename,
                surname: state.surname,
                password: state.password,
                newPassword: state.newPassword,
                repeatedPassword: state.repeatedPassword,
            }),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        try {
            return await response.json();
        } catch (error) {
            return {};
        }
    }
);

export const updateUserProfileSlice = createSlice(
    {
        name: 'updateUserProfile',
        initialState: {
            isLoading: false,
            errorData: null
        },
        reducers: {
            setErrorData: (state, action) => {
                state.errorData = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(updateUserProfile.pending, state => {
                    state.isLoading = true;
                })
                .addCase(updateUserProfile.fulfilled, state => {
                    state.isLoading = false;
                    state.errorData = null;
                })
                .addCase(updateUserProfile.rejected, (state, action) => {
                    state.isLoading = false;
                    state.errorData = action.payload;
                })
        }
    });

export const getUserProfile = createAsyncThunk(
    'getUserProfile/getUserProfile',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/user/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        return await response.json();
    }
);

export const getUserProfileSlice = createSlice({
    name: 'getUserProfile',
    initialState: {
        isLoading: false,
        userData: {}
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.pending, state => {
                state.isLoading = true;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData = action.payload;
                const currentDate = new Date();
                const expiryDate = currentDate.setMonth(currentDate.getMonth() + 1);
                setCookie("userForename", action.payload.forename, expiryDate);
            })
            .addCase(getUserProfile.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

export const userProfileFormSlice = createSlice({
    name: 'form',
    initialState: {
        username: null,
        surname: null,
        forename: null,
        password: null,
        newPassword: null,
        repeatedPassword: null,
        userProfileUpdated: false,
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setSurname: (state, action) => {
            state.surname = action.payload;
        },
        setForename: (state, action) => {
            state.forename = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setNewPassword: (state, action) => {
            state.newPassword = action.payload;
        },
        setRepeatedPassword: (state, action) => {
            state.repeatedPassword = action.payload;
        },
        setUserProfileUpdated: (state, action) => {
            state.userProfileUpdated = action.payload;
        },
        clearProfileForm: (state) => {
            state.username = null;
            state.surname = null;
            state.forename = null;
            state.password = null;
            state.newPassword = null;
            state.repeatedPassword = null;
        }
    }
});

export const {
    setUsername,
    setSurname,
    setForename,
    setPassword,
    setNewPassword,
    setRepeatedPassword,
    setUserProfileUpdated,
    clearProfileForm
} = userProfileFormSlice.actions

export const {setErrorData} = updateUserProfileSlice.actions;

const userProfileReducer = combineReducers({
    form: userProfileFormSlice.reducer,
    getUserProfile: getUserProfileSlice.reducer,
    updateUserProfile: updateUserProfileSlice.reducer
});

export default userProfileReducer;