import Rebase from 're-base';
import firebase from 'firebase';


const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDeszFXq3RA8JxwsWcHrNjO23PuqToa3qY',
  authDomain: 'catch-of-the-day-ebaaa.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-ebaaa.firebaseio.com'
})

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;



// import Rebase from 're-base';
// import firebase from 'firebase';

// const firebaseApp = firebase.initializeApp({
//   apiKey: 'AIzaSyCdgXxyNqCZEeY36Ss9i4jFMSUh7FdGi6M',
//   authDomain: 'catch-of-the-day-wes-bos.firebaseapp.com',
//   databaseURL: 'https://catch-of-the-day-wes-bos.firebaseio.com',
// });

// const base = Rebase.createClass(firebaseApp.database());

// export { firebaseApp };

// export default base;
