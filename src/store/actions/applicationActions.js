export const APPLY_JOB_AD = "APPLY_JOB_AD";
export const WITHDRAW_APPLICATION = "WITHDRAW_APPLICATION";

export function applyJobAd(jobAd) {
  return {
    type: APPLY_JOB_AD,
    payload: jobAd,
  };
}

export function withdrawApplication(jobAd) {
  return {
    type: WITHDRAW_APPLICATION,
    payload: jobAd,
  };
}
