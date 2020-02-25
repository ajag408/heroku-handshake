import { ADD_STUDENT } from "../constants/action-types";
import axios from 'axios';
export function addStudentMiddleware({ dispatch }) {
    return function(next) {
      return function(action) {
        if (action.type === ADD_STUDENT) {
            console.log(action.payload);
            axios.post('http://localhost:4000/students/create-student', action.payload)
            .then(res => {
                if(res.data.errno){
                    alert("Unsuccessful signup; make sure email is unique");
                } else {
                    alert("Successful signup");
                    window.location.href = "/student-signin";
                }
                }
            );
        }
        return next(action);
      };
    };
  }