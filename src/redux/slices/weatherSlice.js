import {createAsyncThunk , createSlice} from '@reduxjs/toolkit'
import axios from 'axios'


//action
export const fetchWeatherAction = createAsyncThunk(
    'weather/fetch',
   async (payload , {rejectWithValue , getState ,dispatch})=>{
        try {
          // const apiId=import.meta.env.VITE_API
         
            const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=${import.meta.env.VITE_API}`)
        

            dispatch(setWeatherData(data))
            return data
        } catch (error) {
            if(!error?.response){
                throw error
            }
            return rejectWithValue(error?.response?.data)
        }
    }
)

export const setWeatherData = (data) =>({
    type: 'weather/setWeatherData',
    payload: data
})
//slices
const weatherSlice = createSlice({
    name : 'weather',
    initialState:{},
    extraReducers: (builder)=>{
        //pending
        builder.addCase(fetchWeatherAction.pending , (state ,action)=>{
           state.loading =true ; 
        }) 
        //fullfill
        builder.addCase(fetchWeatherAction.fulfilled , (state ,action)=>{
            state.weather = action?.payload
            state.loading= false;
            state.error = undefined;
         }) 
         //rejected
         builder.addCase(fetchWeatherAction.rejected , (state ,action)=>{
            state.loading =false ; 
            state.weather =undefined; 
            state.error = action?.payload
         }) 
    },
});

export default weatherSlice.reducer