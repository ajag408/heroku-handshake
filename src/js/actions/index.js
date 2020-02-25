import { ADD_STUDENT} from "../constants/action-types";
import { SIGNIN_STUDENT} from "../constants/action-types";
import { LOGOUT_STUDENT} from "../constants/action-types";
import { DISPLAY_STUDENT} from "../constants/action-types";
export function addStudent(payload) {
  console.log("dispatching the action")
  return { type: ADD_STUDENT, payload };
}
export function signinStudent(payload) {
    console.log("dispatching the action")
    return { type: SIGNIN_STUDENT, payload };
  }

  export function logoutStudent(payload) {
    console.log("dispatching the action")
    return { type: LOGOUT_STUDENT, payload };
  }

  export function displayStudent(payload) {
    console.log("dispatching the action")
    return { type: DISPLAY_STUDENT, payload };
  }