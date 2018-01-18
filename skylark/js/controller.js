var app = angular.module('skylarkApp', []);
app.controller('signUpController', function($scope,$http,$filter,$timeout) {
    console.log("Controller loading");
    const baseUrl = "http://localhost:8080/";
    const baseUrlWeb = "http://localhost/skylark-website/";
    /*const baseUrl = "http://cirqdevv2.southeastasia.cloudapp.azure.com:8082/";
    const baseUrlWeb = "http://cirqdevv2.southeastasia.cloudapp.azure.com:8082/skylark-website/";*/

    //============= Sign up call & validation =========================
    $scope.signUpObj={};
    $scope.signUpObj.residing="";
    $scope.projectList=["Skylark Royaume","Skylark Ithaca","Skylark Arcadia"];
    $scope.signUp = function(){
        if (!validationSignupData())
            return;
        const jsonToSend= angular.toJson($scope.signUpObj);
        $http({ method: 'POST', url: baseUrl+"signup",data: jsonToSend }).then(function (res){
             window.location.href=baseUrlWeb+"Signup_success.html";
        }, function (res) {
            $scope.signUpObj={};
            $scope.invalidEmail=true;
            $scope.reVerify=false;
            $scope.changedVal=false;
        });
    };

    var validationSignupData=function () {
        $scope.errorField={};
        var varToReturn=true;
        if (!$scope.signUpObj.fname) {
            $scope.errorField.fname = true;
            varToReturn=false;
        }
        if (!$scope.signUpObj.email) {
            $scope.errorField.email = true;
            varToReturn=false;
        }
        if ($scope.signUpObj.email && $scope.invalidEmail){
            $scope.errorField.email = false;
            $scope.errorField.validEmail = true;
            varToReturn=false;
        }
        if (!$scope.signUpObj.phone){
            $scope.errorField.phone = true;
            varToReturn=false;
        }
        if ($scope.signUpObj.phone && !/^\+?(\d{8,12})$/.test($scope.signUpObj.phone)){
            $scope.errorField.phone = false;
            $scope.errorField.validPhone = true;
            varToReturn=false;
        }
        if (!$scope.signUpObj.password){
            $scope.errorField.password = true;
            $scope.pswdVerifier = false;
            varToReturn=false;
        }
        if (!$scope.signUpObj.repassword){
            $scope.reVerify = false;
            $scope.changedVal=true;
            varToReturn=false;
        }
        if($scope.pswdVerifier){
            varToReturn=false;
        }
        if (!$scope.reVerify){
            varToReturn=false;
        }
        if (!$scope.signUpObj.residing || $scope.signUpObj.residing===""){
            $scope.errorField.residing = true;
            varToReturn=false;
        }
        if (!$scope.signUpObj.houseno){
            $scope.errorField.houseno = true;
            varToReturn=false;
        }


        $timeout(function () {
            $scope.errorField={};
            $scope.changedVal=false;
        }, 5000);
        console.log("Return from validation======: ",varToReturn);
        return varToReturn;
    };

    $scope.invalidEmail=true;
    $scope.validateEmail=function (email) {
        if (/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/.test(email)){
            $scope.invalidEmail=false;
        }else {
            $scope.invalidEmail=true;
        }
    };

    $scope.passwordValidator = function (passcheck) {
        if (!passcheck || passcheck.length < 8 || passcheck.length > 20) {
            $scope.pswdVerifier = true;
        } else{
            $scope.pswdVerifier = false;
        }
    };

    $scope.passwordCheck = function (passcheck) {
        if ($scope.signUpObj.password === passcheck)
            $scope.reVerify=true;
        else
            $scope.reVerify=false;
    };
    $scope.toHome=function(){
        console.log("success");
        window.location.href="index.html";

    }
});

app.controller('signInController', function($scope,$http,$filter,$timeout) {
    const baseUrl = "http://localhost:8080/";
    const baseUrlWeb = "http://localhost/skylark-website/";
    /*const baseUrl = "http://cirqdevv2.southeastasia.cloudapp.azure.com:8082/";
    const baseUrlWeb = "http://cirqdevv2.southeastasia.cloudapp.azure.com:8082/skylark-website/";*/
    $scope.signInObj={};
    $scope.signInError={};
    $scope.signIn = function(){
        if (!signInValidation())
            return;
        const jsonToSend= angular.toJson($scope.signInObj);
        $http({ method: 'POST', url: baseUrl+"login",data: jsonToSend }).then(function (res){
            window.location.href=baseUrlWeb+"feedpage.html";
            var usrCompId = localStorage.setItem("customerData", JSON.stringify(res.data.object));
        }, function (res) {
            $scope.showLoginError=true;
            if (res.status===400){
                $scope.errorMsg="Email not found";
            }
            if (res.status===401){
                $scope.errorMsg="Customer not verified by skylark";
            }
            if (res.status===402){
                $scope.errorMsg="Customer rejected by skylark";
            }
            if (res.status===403){
                $scope.errorMsg="Password mismatch";
            }
            $timeout(function () {
                $scope.showLoginError=false;
            }, 5000);
        });
    };

    var signInValidation=function () {
        var signInReturn=true;
        if (!$scope.signInObj.email){
            $scope.signInError.email=true;
            signInReturn=false;
        }
        if (!$scope.signInObj.password){
            $scope.signInError.password=true;
            signInReturn=false;
        }

        $timeout(function () {
            $scope.signInError={};
        }, 5000);
        return signInReturn;
    };
    $scope.toHome=function(){
        console.log("success");
        window.location.href="index.html"
    }

});

app.controller('feedController', function($scope,$http,$filter,$timeout) {
    const baseUrl = "http://localhost:8080/";
    const baseUrlWeb = "http://localhost/skylark-website/";
   /* const baseUrl = "http://cirqdevv2.southeastasia.cloudapp.azure.com:8082/";
    const baseUrlWeb = "http://cirqdevv2.southeastasia.cloudapp.azure.com:8082/skylark-website/";*/
    $scope.fromLocal=JSON.parse(localStorage.getItem("customerData"));
    if ($scope.fromLocal===null || $scope.fromLocal===undefined){
        window.location.href=baseUrlWeb+"signin.html";
    }

    $scope.projectList=["Skylark Royaume","Skylark Ithaca","Skylark Arcadia"];
    $scope.referral={};
    $scope.referral.userid=$scope.fromLocal.userid;
    $scope.sendReferral=function () {
        if(!referralValidation())
            return;
        const jsonToSend= angular.toJson($scope.referral);
        $http({ method: 'POST', url: baseUrl+"referral",data: jsonToSend }).then(function (res){
            $scope.successReferral=true;
            $scope.referral={};
            $timeout(function () {
                $scope.successReferral=false;
            }, 5000);
        }, function (res) {

        });
    };
    
    var referralValidation=function () {
        $scope.errorReferral={};
        var referralReturn=true;
        if (!$scope.referral.fname){
            referralReturn=false;
            $scope.errorReferral.fname=true;
        }
        if (!$scope.referral.email){
            referralReturn=false;
            $scope.errorReferral.email=true;
        }
        if ($scope.referral.email && $scope.invalidEmail){
            referralReturn=false;
            $scope.errorReferral.email=false;
            $scope.errorReferral.invalidEmail=true;
        }
        if (!$scope.referral.phone){
            referralReturn=false;
            $scope.errorReferral.phone=true;
        }
        if (!$scope.referral.residing){
            referralReturn=false;
            $scope.errorReferral.residing=true;
        }

        $timeout(function () {
            $scope.errorReferral={};
        }, 5000);
        return referralReturn;

    };

    $scope.invalidEmail=true;
    $scope.validateEmail=function (email) {
        if (/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/.test(email)){
            $scope.invalidEmail=false;
        }else {
            $scope.invalidEmail=true;
        }
    };

});

app.controller('forgotPasswordController', function($scope,$http,$filter,$timeout) {
    const baseUrl = "http://localhost:8080/";
    const baseUrlWeb = "http://localhost/skylark-website/";
    /*const baseUrl = "http://cirqdevv2.southeastasia.cloudapp.azure.com:8082/";
    const baseUrlWeb = "http://cirqdevv2.southeastasia.cloudapp.azure.com:8082/skylark-website/";*/
    $scope.forgot={};
    $scope.getForgotPasswordLink=function () {
        if(!forgotValidation())
            return;
        const jsonToSend= angular.toJson($scope.forgot);
        $http({ method: 'POST', url: baseUrl+"login/submitemail",data: jsonToSend }).then(function (res){
            $scope.successForgot=true;
            $scope.forgot={};
            $timeout(function () {
                $scope.successForgot=false;
            }, 5000);
        }, function (res) {
                $scope.notRegistered=true;
            $timeout(function () {
                $scope.notRegistered=false;
            }, 5000);
        });
    };
    $scope.errorField={};
    var forgotValidation=function () {
      if (!$scope.forgot.email || $scope.invalidEmail){
          $scope.errorField.validEmail=true;
          $timeout(function () {
              $scope.errorField={};
          }, 5000);
          return false;
      }
      else
          return true;
    };

    $scope.validateEmail=function (email) {
        if (/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/.test(email)){
            $scope.invalidEmail=false;
        }else {
            $scope.invalidEmail=true;
        }
    };

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    $scope.change={};
    $scope.change.userid=getParameterByName('id');
    console.log("===========id: ",$scope.change.userid);
    $scope.changePassword=function () {
        if(!changePasswordValidation())
            return;
        const jsonToSend= angular.toJson($scope.change);
        $http({ method: 'POST', url: baseUrl+"login/changepassword",data: jsonToSend }).then(function (res){
            $scope.successChanged=true;
            window.location.href=baseUrlWeb+"Password_reset_success.html";
            $timeout(function () {
                $scope.successChanged=false;
            }, 5000);
        }, function (res) {

        });
    };

    $scope.changePass={};
    $scopechangePass={};
    var changePasswordValidation=function () {
        var varToSend=true;
        if (!$scope.change.password || $scope.change.password.length < 8 || $scope.change.password.length > 20){
            $scope.changePass.password=true;
            varToSend=false;
        }
        if (!$scope.change.repassword || $scope.change.password!==$scope.change.repassword){
            $scope.changePass.repassword=true;
            varToSend=false;
        }
        $timeout(function () {
            $scope.changePass={};
        }, 5000);
        return varToSend;
    };
});

app.controller('contactUsController', function($scope,$http,$filter,$timeout) {
    const baseUrl = "http://localhost:8080/";
    const baseUrlWeb = "http://localhost/skylark-website/";
    $scope.errorcontact={};
    var contactFormValidation=function () {

        var contactReturn=true;
        if (!$scope.contact.name){
            contactReturn=false;
            $scope.errorcontact.name=true;
        }
        if (!$scope.contact.email){
            contactReturn=false;
            $scope.errorcontact.email=true;
        }
        if ($scope.contact.email && $scope.invalidEmail){
            contactReturn=false;
            $scope.errorcontact.email=false;
            $scope.errorcontact.invalidEmail=true;
        }
        if (!$scope.contact.phone){
            contactReturn=false;
            $scope.errorcontact.phone=true;
        }


        $timeout(function () {
            $scope.contactReturn={};
        }, 5000);
        return contactReturn;

    };

    $scope.errorcontact.email=false;
    $scope.validateEmail=function (email) {
        if (/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/.test(email)){
            $scope.errorcontact.email=false;
        }else {
            $scope.errorcontact.email=true;
        }
    };


    $scope.contact={};
    console.log("inside the controller");
    $scope.toContact= function (projectName) {

        if(!contactFormValidation())
            return;
        $scope.processing=true;
         $scope.contact.project=projectName;
        const jsonToSend= angular.toJson($scope.contact);
        console.log("jsonToSend",jsonToSend);
        $http({ method: 'POST', url: baseUrl+"contact",data: jsonToSend }).then(function (res){
            console.log("success");
            $scope.processing=false;
            $scope.contact={};
        }, function (res) {
            console.log("request failed");
            $scope.contact={};
            $scope.processing=false;
        });
    };
});


