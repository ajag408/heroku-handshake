import axios from 'axios';
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

export default function studentMiddleware() {
  return function (next) {
    return function (action) {
      if (action.type === ADD_STUDENT) {
        console.log(action.payload);
        axios.post('/students/create-student', action.payload)
          .then((res) => {
            if (res.data.errno) {
              alert('Unsuccessful signup; make sure email is unique');
            } else {
              alert('Successful signup');
              window.location.href = '/student-signin';
            }
          });
      } else if (action.type === SIGNIN_STUDENT) {
        axios.post('/students/login', action.payload)
          .then((res) => {
            if (res.data.isStudent) {
              window.location.href = '/student/landing';
            } else {
              alert(res.data);
            }
          });
      } else if (action.type === LOGOUT_STUDENT) {
        axios.get('/students/logout')
          .then((res) => {
            console.log(res);
            window.location.href = '/';
          });
      } else if (action.type === DISPLAY_STUDENT) {
        axios.get('/students/user')
          .then((res) => {
            console.log(res.data);
            if (!res.data.isStudent) {
              window.location.href = '/student-signin';
            } else {
              action.payload = {
                name: res.data.user.name,
                dob: res.data.user.dob,
                city: res.data.user.city,
                state: res.data.user.state,
                country: res.data.user.country,
                careerObjective: res.data.user.careerObjective,
                email: res.data.user.email,
                phone: res.data.user.phone,
                profPic: '/students/profPic/',
                skillset: res.data.user.skillset,
              };
            }
          });
        axios.get('/students/education')
          .then((res) => {
            console.log(res.data);
            if (res.data.errno) {
              alert(res.data);
            } else {
              action.payload.education = res.data;
            }
          });

        axios.get('/students/experience')
          .then((res) => {
            console.log(res.data);
            if (res.data.errno) {
              alert(res.data);
            } else {
              action.payload.experience = res.data;
            }
          })
          .then(() => { next(action); });
      } else if (action.type === UPDATE_STUDENT) {
        axios.put('/students/update-student-basic', action.payload)
          .then((res) => {
            console.log(res);
            if (res.data.errno) {
              alert('Unsuccessful update');
            } else {
              alert('Successful update');
              window.location.href = '/student/profile';
            }
          });
      } else if (action.type === ADD_EDUCATION) {
        axios.post('/students/add-education', action.payload)
          .then((res) => {
            console.log(res);
            if (res.data.errno) {
              alert('Unsuccessful add');
            } else {
              alert('Successful add');
              window.location.href = '/student/profile';
            }
          });
      } else if (action.type === ADD_EXPERIENCE) {
        axios.post('/students/add-experience', action.payload)
          .then((res) => {
            console.log(res);
            if (res.data.errno) {
              alert('Unsuccessful add');
            } else {
              alert('Successful add');
              window.location.href = '/student/profile';
            }
          });
      } else if (action.type === UPDATE_SKILLSET) {
        axios.put('/students/update-skillset', action.payload)
          .then((res) => {
            console.log(res);
            if (res.data.errno) {
              alert('Unsuccessful update');
            } else {
              alert('Successful update');
              window.location.href = '/student/profile';
            }
          });
      } else if (action.type === UPLOAD_PROFPIC) {
        axios.post('/students/profPic', action.payload)
          .then((res) => {
            if (res.data.errno) {
              alert('Unsuccessful update');
            } else {
              // alert(res.data);
              window.location.href = '/student/profile';
            }
          });
      }


      return next(action);
    };
  };
}
