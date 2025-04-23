import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";

export const postMenu = createAsyncThunk(
    'postMenu/postMenu',
    async (params, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/menus/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params.menu),
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

export const postMenuSlice = createSlice({
    name: 'postMenu',
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
            .addCase(postMenu.pending, state => {
                state.isLoading = true;
            })
            .addCase(postMenu.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(postMenu.rejected, (state, action) => {
                state.isLoading = false;
                state.errorData = action.payload;
            })
    }
});

export const fetchMenu = createAsyncThunk(
    'fetchMenu/fetchMenu',
    async (params, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/menu/show`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params.id),
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

export const fetchMenuSlice = createSlice({
    name: 'fetchMenu',
    initialState: {
        isLoading: false,
        menu: {}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenu.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchMenu.fulfilled, (state, action) => {
                state.isLoading = false;
                state.menu = action.payload;
            })
            .addCase(fetchMenu.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

export const menuSLice = createSlice(
    {
        name: 'form',
        initialState: {
            menuFormActive: false,
            contextMenuActive: false,
            contextMenuDetailsActive: false,
            newMenuCreated: false,
            menuDuplicated: false,
            name: ''
        },
        reducers: {
            setMenuFormActive: (state, action) => {
                state.menuFormActive = action.payload;
            },
            setContextMenuActive: (state, action) => {
                state.contextMenuActive = action.payload;
            },
            setContextMenuDetailsActive: (state, action) => {
                state.contextMenuDetailsActive = action.payload;
            },
            setNewMenuCreated: (state, action) => {
                state.newMenuCreated = action.payload;
            },
            setMenuDuplicated: (state, action) => {
                state.menuDuplicated = action.payload;
            },
            setName: (state, action) => {
                state.name = action.payload;
            },
            clearForm: (state) => {
                state.name = '';
            }
        }
    });

export const {
    setMenuFormActive,
    setContextMenuActive,
    setContextMenuDetailsActive,
    setNewMenuCreated,
    setMenuDuplicated,
    setName,
    clearForm
} = menuSLice.actions;
export const {setErrorData} = postMenuSlice.actions;

const menuReducer = combineReducers({
    form: menuSLice.reducer,
    fetchMenu: fetchMenuSlice.reducer,
    postMenu: postMenuSlice.reducer
});

export default menuReducer;