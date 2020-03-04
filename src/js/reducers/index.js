import { DISPLAY_STUDENT } from '../constants/action-types';

const initialState = {
  name: '',
  dob: '',
  city: '',
  state: '',
  country: '',
  careerObjective: '',
  email: '',
  phone: '',
  profPic: '',
  education: [],
  collegeName: '',
  educationLocation: '',
  degree: '',
  major: '',
  gradYear: '',
  gpa: '',
  experience: [],
  companyName: '',
  jobTitle: '',
  jobLocation: '',
  stDate: '',
  endDate: '',
  workDescription: '',
  skillset: '',
};

function rootReducer(state = initialState, action) {
  if (action.type === DISPLAY_STUDENT) {
    // console.log(action.payload)
    state = action.payload;
    return state;
  }
  return state;
}

export default rootReducer;
