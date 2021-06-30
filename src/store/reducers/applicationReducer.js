import {
  APPLY_JOB_AD,
  WITHDRAW_APPLICATION,
} from "../actions/applicationActions";
import { applicationItems } from "../initialValues/applicationItems";

const initialState = {
  applicationItems: applicationItems,
};

export default function applicationReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case APPLY_JOB_AD:
      let jobAd = state.applicationItems.find((a) => a.id === payload.id);
      if (jobAd) {
        alert("You have already applied this job ad!");
        return { ...state };
      } else {
        return {
          ...state,
          applicationItems: [...state.applicationItems, { jobAd: payload }],
        };
      }
    case WITHDRAW_APPLICATION:
      return {
        ...state,
        applicationItems: [
          ...state.applicationItems.filter((a) => a.id !== payload.id),
        ],
      };

    default:
      return state;
  }
}
