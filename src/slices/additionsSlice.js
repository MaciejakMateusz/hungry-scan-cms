import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";

export const postAddition = createAsyncThunk(
    'additions/postAddition',
    async ({action, transformName}, {getState, rejectWithValue}) => {
        const state = getState().additions.form;
        const response = await fetch(`${apiHost}/api/cms/ingredients/${action}`, {
            method: action === 'add' ? 'POST' : 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: state.id,
                name: transformName(state.name),
                price: state.price,
                available: state.available.value
            }),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        return await response.json();
    }
);

export const postAdditionsSlice = createSlice(
    {
        name: 'postAddition',
        initialState: {
            isLoading: false,
            errorData: {},
        },
        reducers: {
            setErrorData: (state, action) => {
                state.errorData = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(postAddition.pending, state => {
                    state.isLoading = true;
                })
                .addCase(postAddition.fulfilled, state => {
                    state.isLoading = false;
                    state.errorData = {};
                })
                .addCase(postAddition.rejected, (state, action) => {
                    state.isLoading = false;
                    state.errorData = action.payload;
                })
        }
    });

export const getIngredients = createAsyncThunk(
    'additions/getIngredients',
    async (_, {rejectWithValue, getState}) => {
        const state = getState().additions.getIngredients;
        const requestBody = new Map();
        requestBody.set("pageSize", state.pageData.pageSize);
        requestBody.set("pageNumber", state.pageData.pageNumber);

        const params = Object.fromEntries(requestBody);
        const response = await fetch(`${apiHost}/api/cms/ingredients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        return await response.json();
    }
);

export const getIngredientsSlice = createSlice(
    {
        name: 'getIngredients',
        initialState: {
            isLoading: false,
            ingredients: [],
            pageData: {
                pageNumber: 0,
                pageSize: 100
            }
        },
        reducers: {
            setIngredients: (state, action) => {
                state.ingredients = action.payload;
            },
            setPageNumber: (state, action) => {
                state.pageData.pageNumber = action.payload;
            },
            setPageSize: (state, action) => {
                state.pageData.pageSize = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(getIngredients.pending, state => {
                    state.isLoading = true;
                })
                .addCase(getIngredients.fulfilled, (state, action) => {
                    state.ingredients = action.payload.content;
                    state.isLoading = false;
                })
                .addCase(getIngredients.rejected, state => {
                    state.isLoading = false;
                })
        }
    });

export const additionsFormSlice = createSlice({
    name: 'form',
    initialState: {
        id: null,
        addition: null,
        name: '',
        price: '0.00',
        available: true
    },
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
        },
        setAddition: (state, action) => {
            state.addition = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setPrice: (state, action) => {
            state.price = action.payload;
        },
        setAvailable: (state, action) => {
            state.available = action.payload;
        },
        clearForm: state => {
            state.id = null;
            state.addition = null;
            state.name = '';
            state.price = '0.00';
            state.available = true;
        }
    }
});

export const additionsSlice = createSlice({
    name: 'view',
    initialState: {
        filterValue: '',
        additionDialogActive: false,
        additionToRemove: null,
        isNewAddition: true,
        filteringActive: false,
        filterExpanded: false,
    },
    reducers: {
        setFilterValue: (state, action) => {
            state.filterValue = action.payload;
        },
        setAdditionDialogActive: (state, action) => {
            state.additionDialogActive = action.payload;
        },
        setAdditionToRemove: (state, action) => {
            state.additionToRemove = action.payload;
        },
        setIsNewAddition: (state, action) => {
            state.isNewAddition = action.payload;
        },
        setFilteringActive: (state, action) => {
            state.filteringActive = action.payload;
        },
        setFilterExpanded: (state, action) => {
            state.filterExpanded = action.payload;
        },
        resetAdditionData: state => {
            state.additionDialogActive = false;
            state.isNewAddition = true;
        },
        clearView: state => {
            state.filterValue = '';
            state.additionDialogActive = false;
            state.additionToRemove = null;
            state.isNewAddition = true;
            state.filteringActive = false;
            state.filterExpanded = false;
        }
    }
});

export const {
    setFilterValue,
    setAdditionDialogActive,
    setAdditionToRemove,
    setIsNewAddition,
    setFilteringActive,
    setFilterExpanded,
    resetAdditionData,
    clearView
} = additionsSlice.actions;

export const {setPageNumber, setPageSize, setIngredients} = getIngredientsSlice.actions;
export const {setId, setAddition, setName, setPrice, setAvailable, clearForm} = additionsFormSlice.actions;
export const {setErrorData} = postAdditionsSlice.actions;

const additionsReducer = combineReducers({
    view: additionsSlice.reducer,
    getIngredients: getIngredientsSlice.reducer,
    form: additionsFormSlice.reducer,
    postAddition: postAdditionsSlice.reducer
});

export default additionsReducer;