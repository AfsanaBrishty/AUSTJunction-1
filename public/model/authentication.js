    
    
    const _name = document.getElementById("name");
    const _email = document.getElementById("email");                      
    const _phone = document.getElementById("phoneNumber");
    const _sendCodeBtn = document.getElementById("send-code");
    const _submitBtn = document.getElementById("submit_data");
              
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal",
          callback: function(response) {
            submitUserData();
          }
        }
      );
  
      _sendCodeBtn.addEventListener('click', e => {
        e.preventDefault();
        sendCode();
      });
      function sendCode()
      {
        var phoneNumber = document.getElementById("phoneNumber").value;
        console.log(phoneNumber);
  
           var appVerifier = window.recaptchaVerifier;
           firebase
             .auth()
             .signInWithPhoneNumber(phoneNumber,appVerifier)
             .then(function(confirmationResult)
             {
               window.confirmationResult=confirmationResult;
             })
             .catch(function(error) {
               console.log(error);
             });
       }
       

    _submitBtn.addEventListener('click', e => {
      e.preventDefault();
      var code = document.getElementById("code").value;
      confirmationResult
        .confirm(code)
        .then(function(result) {
          var user = result.user;

          storeUserData(_email.value,_name.value,_phone.value,user.uid);
        })
        .catch(function(error) {
          console.log(error);
        });
      
    });
       
    //this function will be used to store user data into firebase
    function storeUserData(email,user_name,phone,uid)
    {
        const usersCollection = firebase.firestore().collection('users');
        usersCollection.doc(uid).set({
           username: user_name,
           phone: phone,        
           email:email,
       }, {merge: true})
       .then(()=>{
            console.log('Data has been saved successfully !')})
       .catch(error => {
            console.error(error)
        });
   }    
   
   