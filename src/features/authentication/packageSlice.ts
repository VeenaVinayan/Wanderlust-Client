import { createSlice, createAsyncThunk , PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../apiStore/api';
import { TPackage, TPackageAllData, TPackageState } from '../../types/packageTypes'; 

const initialState: TPackageState = {
     packages: [],
     status:"idle",
     error:null,
}
export const fetchPackages = createAsyncThunk<TPackageAllData[], void, {rejectValue: string}>(
   "packages/fetchPackages",
  async(_, {rejectWithValue}) =>{
    try{
          const response = await axiosInstance.get('/user/packages');
          console.log("Data Values ::",response.data.data);
          return response.data.data;
     }catch(error: unknown){
         let errorMessage = "Failed to fetch packages";
         if (typeof error === "object" && error !== null && "message" in error) {
             errorMessage = (error as { message?: string }).message || errorMessage;
         }
         return rejectWithValue(errorMessage);
     }
}   
);
const packageSlice = createSlice({
     name:"packages",
     initialState,
     reducers: {
           updatePackageInStore: (state, action: PayloadAction<TPackage>) => {
           const index = state.packages.findIndex(pkg => pkg._id === action.payload._id);
           if (index !== -1) {
               state.packages[index] = action.payload; // 🔹 Update the package in the store
             }
       },
     },
     extraReducers : (builder) =>{
         builder
            .addCase(fetchPackages.pending, (state) =>{
                  state.status = "loading";
            })
            .addCase(fetchPackages.fulfilled, (state, action: PayloadAction<TPackage[]>) =>{
                  state.status = "succeeded";
                  state.packages = action.payload;
            })
            .addCase(fetchPackages.rejected,(state,action) =>{
                  state.status = "failed";
                  state.error = action.payload ?? "Something went wrong!!";
            });
     }
});

export default packageSlice.reducer;
export const { updatePackageInStore } = packageSlice.actions;
