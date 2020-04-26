window.readUserData= function(uid)
{
    var _username=document.getElementById("userprofile_username");
    var _email=document.getElementById("userprofile_email");
    var _phone=document.getElementById("userprofile_phone");
    var _subscribed_bus=document.getElementById("userprofile_subscribeBus");
    var _subscribed_bus2= _subscribed_bus.options[_subscribed_bus.selectedIndex].value;
    console.log(_subscribed_bus2);
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
              _subscribed_bus2.innerHTML=User['subscribed_bus'];
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
              
              em.contentEditable=true;
              
              sbus.contentEditable=true;
              

              document.getElementById("edit_userData").innerHTML="Submit";
              
              document.getElementById("userprofile_subscribeBus").disabled=false;
   }
   else if(uname.isContentEditable==true && em.isContentEditable==true && sbus.isContentEditable==true)
   {
        uname.contentEditable=false;
        
        em.contentEditable=false;
          
        sbus.contentEditable=false;

        firebase.auth().onAuthStateChanged(function(user)
        {
          
          if (user)
          {
            console.log("USER LOGGED IN");
            EditUserData(uname.value,em.value,sbus.value,user.uid);

          } 
        });
       

          if(document.getElementById("edit_userData").innerHTML="Submit")
          {
              document.getElementById("edit_userData").innerHTML="Edit";
             
              if(document.getElementById("userprofile_subscribeBus").disabled==false)
              {
                document.getElementById("userprofile_subscribeBus").disabled=true;
              }

          }

    }
   });

  }


   function EditUserData(_username,_email,_subscribed_bus2,uid)
   {
       const usersCollection = firebase.firestore().collection('users');
       usersCollection.doc(uid).set({
           subscribed_bus: bus_name,
      }, {merge: true})
      .then(()=>{
           alert('Data has been saved successfully !!!!')})
      .catch(error => {
           console.error(error)
       });
  }

