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
            addMenuFormActive: false,
            name: ''
        },
        reducers: {
            setAddMenuFormActive: (state, action) => {
                state.addMenuFormActive = action.payload;
            },
            setName: (state, action) => {
                state.name = action.payload;
            },
            clearForm: (state) => {
                state.name = ''
            }
        }
    });

export const {setAddMenuFormActive, setName, clearForm} = menuSLice.actions;
export const {setErrorData} = postMenuSlice.actions;

const menuReducer = combineReducers({
    form: menuSLice.reducer,
    fetchMenu: fetchMenuSlice.reducer,
    postMenu: postMenuSlice.reducer
});

export default menuReducer;