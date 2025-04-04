import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";

export const fetchActiveMenu = createAsyncThunk(
    'fetchActiveMenu/fetchActiveMenu',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/user/current-menu`, {
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

        try {
            return await response.json();
        } catch (error) {
            return {};
        }
    }
);

export const fetchActiveMenuSlice = createSlice({
    name: 'fetchActiveMenu',
    initialState: {
        isLoading: false,
        menu: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchActiveMenu.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchActiveMenu.fulfilled, (state, action) => {
                state.isLoading = false;
                state.menu = action.payload;
            })
            .addCase(fetchActiveMenu.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

export const switchActiveMenu = createAsyncThunk(
    'switchActiveMenu/switchActiveMenu',
    async (params, {rejectWithValue}) => {
        const menuId = params.menuId;
        if(!params.menuId) return;
        const response = await fetch(`${apiHost}/api/user/menu`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(menuId),
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

export const switchActiveMenuSlice = createSlice({
    name: 'switchActiveMenu',
    initialState: {
        isLoading: false,
        data: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(switchActiveMenu.pending, state => {
                state.isLoading = true;
            })
            .addCase(switchActiveMenu.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(switchActiveMenu.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

export const cmsSlice = createSlice(
    {
        name: 'view',
        initialState: {
            weekDay: null,
            timeFrom: null,
            timeTo: null
        },
        reducers: {
            setWeekDay: (state, action) => {
                state.weekDay = action.payload;
            },
            setTimeFrom: (state, action) => {
                state.timeFrom = action.payload;
            },
            setTimeTo: (state, action) => {
                state.timeTo = action.payload;
            }
        }
    });

export const {setWeekDay, setTimeFrom, setTimeTo} = cmsSlice.actions;

const cmsReducer = combineReducers({
    view: cmsSlice.reducer,
    switchMenu: switchActiveMenuSlice.reducer,
    fetchActiveMenu: fetchActiveMenuSlice.reducer
});

export default cmsReducer;