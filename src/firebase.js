import * as firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyDevqH4crNkIvE61myARqAN-iQeg_hJPx4",
  authDomain: "metchup-285cb.firebaseapp.com",
  databaseURL: "https://metchup-285cb.firebaseio.com",
  projectId: "metchup-285cb",
  storageBucket: "metchup-285cb.appspot.com",
  messagingSenderId: "18524068247",
  appId: "1:18524068247:web:84d7155250def9e619ccd2",
  measurementId: "G-QYXMWBNLFF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const Auth = firebase.auth();

// How long does login status last
Auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

//returns the person's data by the id
export async function getUserById(userId){
  var retDoc;
  await db.collection("Users").doc(userId).get().then(function(doc) {
    if (doc.exists) {
      console.log("getUserById returns Document data:", doc.data());
      retDoc = doc.data();
    } else {
      console.log("No such document!");
    }
  }).catch(err => handleErr(err));
  return retDoc;
}

//returns several person data enrolling in the queried classId
export async function getUserByClass(classId){
  var retDoc =[];
  await db.collection("Users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.data().classes.includes(classId.toString()))
        retDoc.push(doc.id);
    });
  });
  return retDoc;
}

//return the classmates from all classess the user is currently enrolled in.
export async function getClassmateById(userId){
    var retDoc = [];
    await db.collection("Users").doc(userId).get().then(function(doc) {
        var classes = doc.data().classes;
        for(let i =0;i<classes.length;i++){
            console.log("add class id "+classes[i]+"to the list.");
                retDoc = retDoc.concat(getUserByClass(classes[i]));
        }
    }).then(alert("all classes successfully load.")).catch(err => handleErr(err));
    for(let i =0;i<retDoc.length;i++){
        console.log("classmates id "+i+" : "+retDoc[i]);
    }
    return retDoc;
}

//adds class by classId to the person by the id
export function addClassToUser(classId, id){
  db.collection("Users").doc(id).get().then(function(doc) {
    var classes = doc.data().classes;
    var len = classes.length;
    
    if(classes.includes(classId)) {
      alert("Class already exists!");
    } else if(len >= 6) {
      alert("Achieved Maximum Class Capacity; Please check Dashboard");
    } else {
      db.collection("Users").doc(id).update({
        classes: firebase.firestore.FieldValue.arrayUnion(classId)
      }).then(alert("Class successfully added!"))
      .catch(err => handleErr(err));
    }
  }).catch(err => handleErr(err));
}

//deletes class by classId to the person by the id
export function deleteClassFromUser(classId, id){
  db.collection("Users").doc(id).update({
    classes: firebase.firestore.FieldValue.arrayRemove(classId)
  }).then(alert("Class successfully removed!"))
  .catch(err => handleErr(err));
}

export function changeUserMajor(id, value){
  db.collection("Users").doc(id).update({
    major: value
  }).then(console.log("Major Success!"))
  .catch(err => handleErr(err));
}

export function changeUserIntro(id, value){
  db.collection("Users").doc(id).update({
    intro: value
  }).then(console.log("Success change!"))
  .catch(err => handleErr(err));
}

export function changeUserResidence(id, value){
  db.collection("Users").doc(id).update({
    residence: value
  }).then(console.log("Success change!"))
  .catch(err => handleErr(err));
}

//return the classmates from all classess the user is currently enrolled in.
export async function getMessagesByUser(userId){
  var retDoc = [];
  await db.collection("Messages").where("idTo", "==", userId)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              retDoc.push(doc);
              console.log(doc.id, " => ", doc.data());
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });

  return retDoc;
}

export async function getInvitationsByUser(userId){
  var retDoc = [];
  await db.collection("Invitations").where("idTo", "==", userId)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              retDoc.push(doc);
              console.log(doc.id, " => ", doc.data());
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });

  return retDoc;
}

export function resolveInvitation(accepted, userId, groupId, invitationId){
  if(accepted){
    addUserToGroup(userId, groupId).then(console.log("Invitation Accepted"));
  } else {
    db.collection("Invitations").doc(invitationId).delete()
    .then(alert("Invitation"+invitationId+"successfully removed!"))
    .catch(err => handleErr(err));
  }
}

export function refreshGroupInvitation(userId, classId){
  db.collection("Invitations").where("class", "==", classId).where("to", "array-contains", userId).get()
  .then(function(querySnapshot){
    querySnapshot
    .forEach((doc)=>
    {
      db.collection("Invitations").doc(doc).delete()
      .then(console.log("Cleaning Invitation from the same class"))
      .catch(err => handleErr(err));
    })
  })
  .catch(err => handleErr(err));
}

export async function addUserToGroup(userId, groupId){
  await db.collection("Users").doc(groupId).update({
    peers: firebase.firestore.FieldValue.arrayUnion(userId)
  }).then(alert("Group successfully added!"))
  .catch(err => handleErr(err));
}

export async function inGroup(userId, classId){
  await db.collection("Groups").where("class", "==", classId).get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc){
    if (doc.data().includes(userId)){
      console.log("Found User is already in Group for class"+classId);
      return doc.data();
    }
  });
  return false;
})
}

// handles errors with custom messages
export function handleErr(err) {
  if (err.code === "not-found") {
    alert("Backend error: data not found");
  } else {
    alert(err);
  }
    //More cases
}
