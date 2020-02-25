import { ADD_STUDENT} from "../constants/action-types";
import { SIGNIN_STUDENT} from "../constants/action-types";
export function addStudent(payload) {
  console.log("dispatching the action")
  return { type: ADD_STUDENT, payload };
}
export function signinStudent(payload) {
    console.log("dispatching the action")
    return { type: SIGNIN_STUDENT, payload };
  }