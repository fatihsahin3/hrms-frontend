import {
  APPLY_JOB_AD,
  WITHDRAW_APPLICATION,
} from "../actions/applicationActions";
import { applications } from "../initialValues/applications";
import { toast } from "react-toastify";

const initialState = {
  applications: applications,
};

export default function applicationsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case APPLY_JOB_AD:
      let jobAd = state.applications.find((a) => a.jobAd.id === payload.id);
      if (jobAd) {
        toast.error(
          <div>
            You have already applied <br /> {payload.jobTitle}!
          </div>
        );
        return { ...state };
      } else {
        toast.success(
          <div>
            {payload.jobTitle} <br /> Application successful!
          </div>
        );
        return {
          ...state,
          applications: [...state.applications, { jobAd: payload }],
        };
      }
    case WITHDRAW_APPLICATION:
      alert("WITHDRAW_APPLICATION");
      return {
        ...state,
        applications: [
          ...state.applications.filter((a) => a.id !== payload.id),
        ],
      };

    default:
      return state;
  }
}
