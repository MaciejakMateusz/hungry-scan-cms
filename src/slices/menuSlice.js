import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";

export const updateMenu = createAsyncThunk(
    'updateMenu/updateMenu',
    async (params, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/menus/update`, {
            method: 'PATCH',
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

export const updateMenuSlice = createSlice({
    name: 'updateMenu',
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
            .addCase(updateMenu.pending, state => {
                state.isLoading = true;
            })
            .addCase(updateMenu.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateMenu.rejected, (state, action) => {
                state.isLoading = false;
                state.errorData = action.payload;
            })
    }
});

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
            newMenuFormActive: false,
            editMenuFormActive: false,
            contextMenuActive: false,
            contextMenuDetailsActive: false,
            newMenuCreated: false,
            menuUpdated: false,
            menuRemoved: false,
            menuDuplicated: false,
            name: ''
        },
        reducers: {
            setNewMenuFormActive: (state, action) => {
                state.newMenuFormActive = action.payload;
            },
            setEditMenuFormActive: (state, action) => {
                state.editMenuFormActive = action.payload;
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
            setMenuUpdated: (state, action) => {
                state.menuUpdated = action.payload;
            },
            setMenuRemoved: (state, action) => {
                state.menuRemoved = action.payload;
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
    setNewMenuFormActive,
    setEditMenuFormActive,
    setContextMenuActive,
    setContextMenuDetailsActive,
    setNewMenuCreated,
    setMenuUpdated,
    setMenuDuplicated,
    setMenuRemoved,
    setName,
    clearForm
} = menuSLice.actions;
export const {setErrorData} = postMenuSlice.actions;

const menuReducer = combineReducers({
    form: menuSLice.reducer,
    fetchMenu: fetchMenuSlice.reducer,
    postMenu: postMenuSlice.reducer,
    updateMenu: updateMenuSlice.reducer
});

export default menuReducer;