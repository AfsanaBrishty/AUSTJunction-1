
window.readUserData= function(uid)
{
    var _username=document.getElementById("userprofile_username");
    var _email=document.getElementById("userprofile_email");
    var _phone=document.getElementById("userprofile_phone");
    var _subscribed_bus=document.getElementById("userprofile_subscribeBus");
    var _editDataBtn = document.getElementById("edit_userData");

    const usersCollection = firebase.firestore().collection('users');

    const query = usersCollection.doc(uid.trim());

    query.get()
    .then(user => {
      if(user.exists)
        {
            console.log(user.data());

            var User=user.data();

            _username.innerHTML=User['username'];
            _email.innerHTML=User['email'];
            _phone.innerHTML=User['phone'];
            _subscribed_bus.innerHTML=User['subscribed_bus'];


        }

      else
        console.log('User does not exist !');
      })
    .catch(error => {
      console.error(error);
    });




    _editDataBtn.addEventListener('click', e => {
      e.preventDefault();
     var uname = document.getElementById("userprofile_username");  //check boolean//
     var em = document.getElementById("userprofile_email");
     var sbus = document.getElementById("userprofile_subscribeBus");
     if(uname.isContentEditable==false && em.isContentEditable==false && sbus.isContentEditable==false)
     {
     uname.contentEditable=true;
     console.log("Uname" +uname.isContentEditable);
     em.contentEditable=true;
     console.log("Email" +em.isContentEditable);
     sbus.contentEditable=true;
     console.log("BUs" +sbus.isContentEditable);

     document.getElementById("edit_userData").innerHTML="Submit";
     console.log("CheckIF");
   }else if(uname.isContentEditable==true && em.isContentEditable==true && sbus.isContentEditable==true)
   {
     uname.contentEditable=false;
     console.log("Uname1" +uname.isContentEditable);
     em.contentEditable=false;
      console.log("Email1" +em.isContentEditable);
     sbus.contentEditable=false;
     console.log("BUS1" +sbus.isContentEditable);

     if(document.getElementById("edit_userData").innerHTML="Submit")
     {
       document.getElementById("edit_userData").innerHTML="Edit";
       console.log("CheckELSE");
     }
    }
   });
}
