import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {getLanguage} from "../locales/langUtils";

export const getOrganizationRestaurants = createAsyncThunk(
    'getOrganizationRestaurants/getOrganizationRestaurants',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/restaurants/organization`, {
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

        return await response.json();
    }
);

export const getOrganizationRestaurantsSlice = createSlice({
    name: 'getOrganizationRestaurants',
    initialState: {
        isLoading: false,
        restaurants: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrganizationRestaurants.pending, state => {
                state.isLoading = true;
            })
            .addCase(getOrganizationRestaurants.fulfilled, (state, action) => {
                state.isLoading = false;
                state.restaurants = action.payload.map(restaurant => ({
                    value: restaurant,
                    label: `${restaurant.name} - ${restaurant.address}`
                }));
            })
            .addCase(getOrganizationRestaurants.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

export const getRoles = createAsyncThunk(
    'getRoles/getRoles',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/admin/users/roles`, {
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

        return await response.json();
    }
);

export const getRolesSlice = createSlice({
    name: 'getRoles',
    initialState: {
        isLoading: false,
        roles: []
    },
    reducers: {
        setRoles: (state, action) => {
            state.roles = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRoles.pending, state => {
                state.isLoading = true;
            })
            .addCase(getRoles.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(getRoles.rejected, state => {
                state.isLoading = false;
            })
    }
});

export const updateUser = createAsyncThunk(
    'updateUser/updateUser',
    async (_, {getState, rejectWithValue}) => {
        const state = getState().users.form;
        const response = await fetch(`${apiHost}/api/admin/users/update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': getLanguage()
            },
            body: JSON.stringify({
                forename: state.forename,
                surname: state.surname,
                username: state.username,
                restaurants: state.chosenRestaurants.map(restaurant => restaurant.value),
                roles: state.chosenRoles.map(role => role.value),
                active: state.active
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

export const updateUserSlice = createSlice(
    {
        name: 'updateUser',
        initialState: {
            isLoading: false,
            updateUserError: null
        },
        reducers: {
            setUpdateUserError: (state, action) => {
                state.updateUserError = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(updateUser.pending, state => {
                    state.isLoading = true;
                })
                .addCase(updateUser.fulfilled, state => {
                    state.isLoading = false;
                    state.updateUserError = null;
                })
                .addCase(updateUser.rejected, (state, action) => {
                    state.isLoading = false;
                    state.updateUserError = action.payload;
                })
        }
    });

export const saveUser = createAsyncThunk(
    'saveUser/saveUser',
    async (_, {getState, rejectWithValue}) => {
        const state = getState().users.form;
        const response = await fetch(`${apiHost}/api/admin/users/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': getLanguage()
            },
            body: JSON.stringify({
                forename: state.forename,
                surname: state.surname,
                username: state.username,
                restaurants: state.chosenRestaurants.map(restaurant => restaurant.value),
                roles: state.chosenRoles.map(role => role.value),
                active: state.active
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

export const saveUserSlice = createSlice(
    {
        name: 'saveUser',
        initialState: {
            isLoading: false,
            saveUserError: null
        },
        reducers: {
            setSaveUserError: (state, action) => {
                state.saveUserError = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(saveUser.pending, state => {
                    state.isLoading = true;
                })
                .addCase(saveUser.fulfilled, state => {
                    state.isLoading = false;
                    state.saveUserError = null;
                })
                .addCase(saveUser.rejected, (state, action) => {
                    state.isLoading = false;
                    state.saveUserError = action.payload;
                })
        }
    });

export const getUsers = createAsyncThunk(
    'getUsers/getUsers',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/admin/users`, {
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

        return await response.json();
    }
);

export const getUsersSlice = createSlice({
    name: 'getUsers',
    initialState: {
        errorData: null,
        isLoading: false,
        users: []
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, state => {
                state.isLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.errorData = action.payload;
            })
    }
});

export const removeUser = createAsyncThunk(
    'removeUser/removeUser',
    async (_, {rejectWithValue, getState}) => {
        const viewState = getState().users.view;
        const username = viewState.userToRemove?.username;
        const response = await fetch(`${apiHost}/api/admin/users/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': getLanguage()
            },
            body: username,
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        try {
            return await response.json();
        } catch (error) {
            return {"message": "There was an error while deleting user."};
        }
    }
);

export const removeUserSlice = createSlice(
    {
        name: 'removeUser',
        initialState: {
            isLoading: false,
            removalError: null,
        },
        reducers: {
            setRemovalError: (state, action) => {
                state.removalError = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(removeUser.pending, state => {
                    state.isLoading = true;
                })
                .addCase(removeUser.fulfilled, state => {
                    state.isLoading = false;
                    state.removalError = null;
                })
                .addCase(removeUser.rejected, (state, action) => {
                    state.isLoading = false;
                    state.removalError = action.payload;
                })
        }
    });

export const usersViewSlice = createSlice({
    name: 'view',
    initialState: {
        newUserFormActive: false,
        editUserFormActive: false,
        userToRemove: null,
        userToUpdate: null,
        userCreated: false,
        userUpdated: false,
        userRemoved: false,
        filterExpanded: false,
        filterValue: ''
    },
    reducers: {
        setNewUserFormActive: (state, action) => {
            state.newUserFormActive = action.payload;
        },
        setEditUserFormActive: (state, action) => {
            state.editUserFormActive = action.payload;
        },
        setUserToRemove: (state, action) => {
            state.userToRemove = action.payload;
        },
        setUserToUpdate: (state, action) => {
            state.userToUpdate = action.payload;
        },
        setUserCreated: (state, action) => {
            state.userCreated = action.payload;
        },
        setUserUpdated: (state, action) => {
            state.userUpdated = action.payload;
        },
        setUserRemoved: (state, action) => {
            state.userRemoved = action.payload;
        },
        setFilterExpanded: (state, action) => {
            state.filterExpanded = action.payload;
        },
        setFilterValue: (state, action) => {
            state.filterValue = action.payload;
        },
        clearView: state => {
            state.newUserFormActive = false;
            state.editUserFormActive = false;
            state.userToRemove = null;
            state.userToUpdate = null;
            state.userCreated = false;
            state.userUpdated = false;
            state.userRemoved = false;
            state.filterExpanded = false;
            state.filterValue = '';
        }
    }
});

export const userFormSlice = createSlice({
    name: 'form',
    initialState: {
        username: null,
        surname: null,
        forename: null,
        chosenRestaurants: [],
        chosenRoles: [],
        active: true,
        errorData: null
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
        setChosenRestaurants: (state, action) => {
            state.chosenRestaurants = action.payload;
        },
        setChosenRoles: (state, action) => {
            state.chosenRoles = action.payload;
        },
        setActive: (state, action) => {
            state.active = action.payload;
        },
        setErrorData: (state, action) => {
            state.errorData = action.payload;
        },
        clearForm: state => {
            state.username = null;
            state.surname = null;
            state.forename = null;
            state.chosenRestaurants = [];
            state.chosenRoles = [];
            state.active = true;
            state.errorData = null;
        }
    }
});

export const {
    setNewUserFormActive,
    setEditUserFormActive,
    setUserToRemove,
    setUserToUpdate,
    setUserCreated,
    setUserUpdated,
    setUserRemoved,
    setFilterExpanded,
    setFilterValue,
    clearView
} = usersViewSlice.actions;

export const {
    setUsername,
    setSurname,
    setForename,
    setChosenRestaurants,
    setChosenRoles,
    setActive,
    setErrorData,
    clearForm
} = userFormSlice.actions;

export const {setRemovalError} = removeUserSlice.actions;
export const {setSaveUserError} = saveUserSlice.actions;
export const {setUpdateUserError} = updateUserSlice.actions;
export const {setUsers} = getUsersSlice.actions;
export const {setRoles} = getRolesSlice.actions;

const usersReducer = combineReducers({
    view: usersViewSlice.reducer,
    form: userFormSlice.reducer,
    getUsers: getUsersSlice.reducer,
    getRoles: getRolesSlice.reducer,
    getRestaurants: getOrganizationRestaurantsSlice.reducer,
    saveUser: saveUserSlice.reducer,
    updateUser: updateUserSlice.reducer,
    removeUser: removeUserSlice.reducer
});

export default usersReducer;