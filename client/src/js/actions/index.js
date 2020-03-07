import {
  ADD_STUDENT,
  SIGNIN_STUDENT,
  LOGOUT_STUDENT,
  DISPLAY_STUDENT,
  UPDATE_STUDENT,
  ADD_EDUCATION,
  ADD_EXPERIENCE,
  UPDATE_SKILLSET,
  UPLOAD_PROFPIC,
} from '../constants/action-types';


export function addStudent(payload) {
  console.log('dispatching the action');
  return { type: ADD_STUDENT, payload };
}
export function signinStudent(payload) {
  console.log('dispatching the action');
  return { type: SIGNIN_STUDENT, payload };
}

export function logoutStudent(payload) {
  console.log('dispatching the action');
  return { type: LOGOUT_STUDENT, payload };
}

export function displayStudent(payload) {
  console.log('dispatching the action');
  return { type: DISPLAY_STUDENT, payload };
}

export function updateStudent(payload) {
  console.log('dispatching the action');
  return { type: UPDATE_STUDENT, payload };
}

export function addEducation(payload) {
  console.log('dispatching the action');
  return { type: ADD_EDUCATION, payload };
}

export function addExperience(payload) {
  console.log('dispatching the action');
  return { type: ADD_EXPERIENCE, payload };
}


export function updateSkillset(payload) {
  console.log('dispatching the action');
  return { type: UPDATE_SKILLSET, payload };
}

export function uploadProfPic(payload) {
  console.log('dispatching the action');
  return { type: UPLOAD_PROFPIC, payload };
}
