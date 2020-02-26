import { ADD_STUDENT } from "../constants/action-types";
import { SIGNIN_STUDENT } from "../constants/action-types";
import { LOGOUT_STUDENT } from "../constants/action-types";
import { DISPLAY_STUDENT } from "../constants/action-types";
import { UPDATE_STUDENT } from "../constants/action-types";
import { ADD_EDUCATION } from "../constants/action-types";
import { ADD_EXPERIENCE} from "../constants/action-types";
import { UPDATE_SKILLSET} from "../constants/action-types";
import { UPLOAD_PROFPIC} from "../constants/action-types";
import axios from 'axios';
export function studentMiddleware({ dispatch }) {
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
        else if(action.type === SIGNIN_STUDENT){
                axios.post('http://localhost:4000/students/login', action.payload)
                    .then(res => {
                        if(res.data.isStudent){
                        window.location.href = "/student/landing";
                        } else {
                        alert(res.data);
                        }
                    }
                    );
        }
        else if(action.type === LOGOUT_STUDENT){
           axios.get('http://localhost:4000/students/logout')
                    .then(res => {
                        console.log(res);
                        window.location.href = "/";
                    });
        }
        else if(action.type === DISPLAY_STUDENT){
            axios.get('http://localhost:4000/students/user')
            .then(res => {
              console.log(res.data);
              if(!res.data.isStudent){
                window.location.href = "/student-signin";
              } else {
                action.payload = {
                  name : res.data.user.name,
                  dob: res.data.user.dob,
                  city: res.data.user.city,
                  state: res.data.user.state,
                  country: res.data.user.country,
                  careerObjective: res.data.user.careerObjective,
                  email: res.data.user.email,
                  phone: res.data.user.phone,
                  profPic: 'http://localhost:4000/students/profPic/',
                  skillset: res.data.user.skillset 
                  };
              }
            });
            axios.get('http://localhost:4000/students/education')
            .then(res => {
              console.log(res.data);
              if(res.data.errno){
                alert(res.data);
              } else {
                action.payload.education = res.data;
             }
            });
        
            axios.get('http://localhost:4000/students/experience')
            .then(res => {
              console.log(res.data);
              if(res.data.errno){
                alert(res.data);
              } else {
                action.payload.experience = res.data;
            }
            })
            .then(() => {next(action)})
         }
         else if(action.type === UPDATE_STUDENT){
          axios.put('http://localhost:4000/students/update-student-basic', action.payload)
          .then(res => {
              console.log(res);
              if(res.data.errno){
                    alert("Unsuccessful update");
                } else {
                    alert("Successful update");
                    window.location.href = "/student/profile";
                }
            }     
          );
         }
         else if(action.type === ADD_EDUCATION){
          axios.post('http://localhost:4000/students/add-education', action.payload)
          .then(res => {
              console.log(res);
              if(res.data.errno){
                    alert("Unsuccessful add");
                } else {
                    alert("Successful add");
                    window.location.href = "/student/profile";
                }
            }     
          );
         }
         else if(action.type === ADD_EXPERIENCE){
            axios.post('http://localhost:4000/students/add-experience', action.payload)
              .then(res => {
                  console.log(res);
                  if(res.data.errno){
                        alert("Unsuccessful add");
                    } else {
                        alert("Successful add");
                        window.location.href = "/student/profile";
                    }
                }     
              );
         }
         else if(action.type === UPDATE_SKILLSET){
           axios.put('http://localhost:4000/students/update-skillset', action.payload)
              .then(res => {
                  console.log(res);
                  if(res.data.errno){
                        alert("Unsuccessful update");
                    } else {
                        alert("Successful update");
                        window.location.href = "/student/profile";
                    }
                }     
              );
       }
       else if(action.type === UPLOAD_PROFPIC){
               axios.post('http://localhost:4000/students/profPic', action.payload)
                .then(res => {
                    if(res.data.errno){
                      alert("Unsuccessful update");
                    } else {
                      // alert(res.data);
                      window.location.href = "/student/profile";
                    }
                  }     
                );
    }



        return next(action);
      };
    };
  }