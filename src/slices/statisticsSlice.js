import {combineReducers, createSlice} from "@reduxjs/toolkit";

export const statisticsSlice = createSlice(
    {
        name: 'view',
        initialState: {
            period: null,
            initialYear: null,
            chosenYear: null,
            initialMonth: null,
            chosenMonth: null,
            initialWeek: null,
            chosenWeek: null,
            chosenDay: null,
            restaurant: {
                id: 1,
                created: new Date(2024, 4, 12).toISOString()
            }
        },
        reducers: {
            setPeriod: (state, action) => {
                state.period = action.payload;
                switch (action.payload) {
                    case 'year':
                        state.chosenYear = state.chosenYear ? state.chosenYear : state.initialYear;
                        break;
                    case 'month':
                        state.chosenMonth = state.chosenMonth ? state.chosenMonth : state.initialMonth;
                        state.chosenYear = state.chosenYear ? state.chosenYear : state.initialYear;
                        break;
                    case 'week':
                        state.chosenWeek = state.chosenWeek ? state.chosenWeek : state.initialWeek;
                        state.chosenYear = state.chosenYear ? state.chosenYear : state.initialYear;
                        break;
                    case 'day':
                        new Date();
                        break;
                    default:
                        state.chosenMonth = state.chosenMonth ? state.chosenMonth : state.initialMonth;
                }
            },
            setInitialYear: (state, action) => {
                state.initialYear = action.payload;
            },
            setChosenYear: (state, action) => {
                state.chosenYear = action.payload;
            },
            setInitialMonth: (state, action) => {
                state.initialMonth = action.payload;
            },
            setChosenMonth: (state, action) => {
                state.chosenMonth = action.payload;
            },
            setInitialWeek: (state, action) => {
                state.initialWeek = action.payload;
            },
            setChosenWeek: (state, action) => {
                state.chosenWeek = action.payload;
            },
            setChosenDay: (state, action) => {
                state.chosenDay = action.payload;
            },
            setRestaurant: (state, action) => {
                state.restaurant = action.payload;
            }
        }
    });

export const {
    setPeriod,
    setInitialYear,
    setChosenYear,
    setInitialMonth,
    setChosenMonth,
    setInitialWeek,
    setChosenWeek,
    setChosenDay,
    setRestaurant} = statisticsSlice.actions;

const statisticsReducer = combineReducers({
    view: statisticsSlice.reducer,
});

export default statisticsReducer;