import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";

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
            menu: null,
            weekDay: null,
            timeFrom: null,
            timeTo: null
        },
        reducers: {
            setMenu: (state, action) => {
                state.menu = action.payload;
            },
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

export const {setMenu, setWeekDay, setTimeFrom, setTimeTo} = cmsSlice.actions;

const cmsReducer = combineReducers({
    view: cmsSlice.reducer,
    switchMenu: switchActiveMenuSlice.reducer
});

export default cmsReducer;