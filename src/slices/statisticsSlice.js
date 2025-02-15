import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";

export const getPopularItemsStats = createAsyncThunk(
    'getPopularItemsStats/getPopularItemsStats',
    async (credentials, {rejectWithValue}) => {
        const period = credentials.period;
        const params = credentials.params;
        const response = await fetch(`${apiHost}/api/stats/dashboard/${period}/menu-item-views`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                menuId: params.menu?.value?.id,
                year: params.year?.value,
                month: params.month?.value,
                week: params.week?.value,
                day: params?.day
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

export const getPopularItemsStatsSlice = createSlice({
    name: 'getPopularItemsStats',
    initialState: {
        isLoading: false,
        data: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPopularItemsStats.pending, state => {
                state.isLoading = true;
            })
            .addCase(getPopularItemsStats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getPopularItemsStats.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

export const getScanStats = createAsyncThunk(
    'getScanStats/getScanStats',
    async (credentials, {rejectWithValue}) => {
        const period = credentials.period;
        const params = credentials.params;
        const response = await fetch(`${apiHost}/api/stats/dashboard/${period}/scans`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                year: params.year?.value,
                month: params.month?.value,
                week: params.week?.value,
                day: params?.day
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

export const getScanStatsSlice = createSlice({
    name: 'getScanStats',
    initialState: {
        isLoading: false,
        data: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getScanStats.pending, state => {
                state.isLoading = true;
            })
            .addCase(getScanStats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getScanStats.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

export const statisticsSlice = createSlice(
    {
        name: 'view',
        initialState: {
            period: null,
            chosenYear: null,
            chosenMonth: null,
            chosenWeek: null,
            chosenDay: null,
            chosenMenu: null
        },
        reducers: {
            setPeriod: (state, action) => {
                state.period = action.payload;
            },
            setChosenYear: (state, action) => {
                state.chosenYear = action.payload;
            },
            setChosenMonth: (state, action) => {
                state.chosenMonth = action.payload;
            },
            setChosenWeek: (state, action) => {
                state.chosenWeek = action.payload;
            },
            setChosenDay: (state, action) => {
                state.chosenDay = action.payload;
            },
            setPeriodData: (state, action) => {
                state.initialYear = action.payload?.initialYear;
                state.initialMonth = action.payload?.initialYear;
                state.initialWeek = action.payload?.initialYear;
                state.period = action.payload?.period;
                state.chosenMonth = action.payload?.chosenMonth;
                state.chosenYear = action.payload?.chosenYear;
                state.chosenDay = action.payload?.chosenDay;
            },
            setChosenMenu: (state, action) => {
                state.chosenMenu = action.payload;
            }
        }
    });

export const {
    setPeriod,
    setChosenYear,
    setChosenMonth,
    setChosenWeek,
    setChosenDay,
    setPeriodData,
    setChosenMenu
} = statisticsSlice.actions;

const statisticsReducer = combineReducers({
    view: statisticsSlice.reducer,
    scanStats: getScanStatsSlice.reducer,
    popularItemsStats: getPopularItemsStatsSlice.reducer
});

export default statisticsReducer;