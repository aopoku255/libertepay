import { createSlice } from "@reduxjs/toolkit";
import {
  getTeamData,
  addTeamData,
  updateTeamData,
  deleteTeamData,
  addAdmin,
  getAdmin,
} from "./thunk";
export const initialState = {
  teamData: [],
  admin: [],
  error: {},
  adminError: null,
};

const TeamSlice = createSlice({
  name: "TeamSlice",
  initialState,
  reducers: {
    addAdminError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTeamData.fulfilled, (state, action) => {
      state.teamData = action.payload;
    });
    builder.addCase(getTeamData.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(getAdmin.fulfilled, (state, action) => {
      state.admin = action.payload;
    });
    builder.addCase(getAdmin.rejected, (state, action) => {
      state.adminError = action.payload.error || null;
    });
    builder.addCase(addTeamData.fulfilled, (state, action) => {
      state.teamData.push(action.payload);
    });
    builder.addCase(addAdmin.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(addTeamData.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(updateTeamData.fulfilled, (state, action) => {
      state.teamData = state.teamData.map((team) =>
        team.id.toString() === action.payload.id.toString()
          ? { ...team, ...action.payload }
          : team
      );
    });
    builder.addCase(updateTeamData.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(deleteTeamData.fulfilled, (state, action) => {
      state.teamData = state.teamData.filter(
        (team) => team.id !== action.payload
      );
    });
    builder.addCase(deleteTeamData.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
  },
});

export const { addAdminError } = TeamSlice.actions;
export default TeamSlice.reducer;
