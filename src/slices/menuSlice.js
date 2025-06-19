import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {cleanseAndGroupMenuPlans} from "../utils/schedulerUtils";

export const switchStandard = createAsyncThunk(
    'switchStandard/switchStandard',
    async (params, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/menus/switch-standard`, {
            method: 'PATCH',
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

export const switchStandardSlice = createSlice({
    name: 'switchStandard',
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
            .addCase(switchStandard.pending, state => {
                state.isLoading = true;
            })
            .addCase(switchStandard.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(switchStandard.rejected, (state, action) => {
                state.isLoading = false;
                state.errorData = action.payload;
            })
    }
});

export const updatePlans = createAsyncThunk(
    'updatePlans/updatePlans',
    async (params, {rejectWithValue}) => {
        const menus = cleanseAndGroupMenuPlans(params.menus);
        const response = await fetch(`${apiHost}/api/cms/menus/update-plans`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(menus),
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

export const updatePlansSlice = createSlice({
    name: 'updatePlans',
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
            .addCase(updatePlans.pending, state => {
                state.isLoading = true;
            })
            .addCase(updatePlans.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updatePlans.rejected, (state, action) => {
                state.isLoading = false;
                state.errorData = action.payload;
            })
    }
});

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

export const fetchMenuColors = createAsyncThunk(
    'fetchMenuColor/fetchMenuColor',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/menu-colors`, {
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

export const fetchMenuColorsSlice = createSlice({
    name: 'fetchMenuColors',
    initialState: {
        isLoading: false,
        menuColors: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenuColors.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchMenuColors.fulfilled, (state, action) => {
                state.isLoading = false;
                state.menuColors = action.payload;
            })
            .addCase(fetchMenuColors.rejected, (state) => {
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
            standardSwitched: false,
            plansUpdated: false,
            name: '',
            color: {
                id: null,
                hex: ''
            }
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
            setStandardSwitched: (state, action) => {
                state.standardSwitched = action.payload;
            },
            setPlansUpdated: (state, action) => {
                state.plansUpdated = action.payload;
            },
            setName: (state, action) => {
                state.name = action.payload;
            },
            setColor: (state, action) => {
                state.color = action.payload;
            },
            clearForm: (state) => {
                state.name = '';
                state.color = {
                    id: null,
                    hex: ''
                }
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
    setMenuRemoved,
    setMenuDuplicated,
    setStandardSwitched,
    setPlansUpdated,
    setName,
    setColor,
    clearForm
} = menuSLice.actions;
export const {setErrorData} = postMenuSlice.actions;

const menuReducer = combineReducers({
    form: menuSLice.reducer,
    fetchMenu: fetchMenuSlice.reducer,
    fetchMenuColors: fetchMenuColorsSlice.reducer,
    postMenu: postMenuSlice.reducer,
    updateMenu: updateMenuSlice.reducer,
    updatePlans: updatePlansSlice.reducer,
    switchStandard: switchStandardSlice.reducer
});

export default menuReducer;