import { ADD_STUDENT} from "../constants/action-types";
export function addStudent(payload) {
  console.log("dispatching the action")
  return { type: ADD_STUDENT, payload };
}