import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {getLanguage} from "../locales/langUtils";

export const duplicateMenu = createAsyncThunk(
    'duplicateMenu/duplicateMenu',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/menus/duplicate`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': getLanguage()
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

export const duplicateMenuSlice = createSlice({
    name: 'duplicateMenu',
    initialState: {
        isLoading: false,
        errorData: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(duplicateMenu.pending, state => {
                state.isLoading = true;
            })
            .addCase(duplicateMenu.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(duplicateMenu.rejected, (state, action) => {
                state.isLoading = false;
                state.errorData = action.payload;
            })
    }
});

export const fetchActiveMenu = createAsyncThunk(
    'fetchActiveMenu/fetchActiveMenu',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/user/current-menu`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': getLanguage()
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
        if (!menuId) return;
        const response = await fetch(`${apiHost}/api/user/menu`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': getLanguage()
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
            schedulerActive: false
        },
        reducers: {
            setSchedulerActive: (state, action) => {
                state.schedulerActive = action.payload;
            }
        }
    });

export const {setSchedulerActive} = cmsSlice.actions;

const cmsReducer = combineReducers({
    view: cmsSlice.reducer,
    switchMenu: switchActiveMenuSlice.reducer,
    fetchActiveMenu: fetchActiveMenuSlice.reducer,
    duplicateMenu: duplicateMenuSlice.reducer
});

export default cmsReducer;