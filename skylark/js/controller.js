var app = angular.module('skylarkApp', []);
(function() {
    app.directive('onlyLettersInput', onlyLettersInput);
    function onlyLettersInput() {
        return {
            require: 'ngModel',
            link: function(scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    var transformedInput = text.replace(/[^a-zA-Z]/g, '');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    };
})();
(function() {
    app.directive('onlyNumberInput', onlyLettersInput);
    function onlyLettersInput() {
        return {
            require: 'ngModel',
            link: function(scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    var transformedInput = text.replace(/[^+ 0-9.]/g,'');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    };
})();
app.controller('signUpController', function($scope,$rootScope,$http,$filter,$timeout) {
    console.log("Controller loading");
    /*const baseUrl = "http://localhost:8080/";
    const baseUrlWeb = "http://localhost/skylark-website/";*/
    const baseUrl = "http://34.236.8.175:8080/";
    const baseUrlWeb = "http://34.236.8.175/";

    //============= Sign up call & validation =========================+
    $rootScope.prevLocationSignUp = document.referrer;
    console.log("lchnsjvbd vkjhsvf ",$rootScope.prevLocationSignUp);



    if ($rootScope.prevLocationSignUp.indexOf("signin.html") > -1) {
        $rootScope.prevLocationSignUp = localStorage.getItem("signin");
    }else {
        localStorage.setItem("signup", $rootScope.prevLocationSignUp);
    }

    $scope.goBack=function () {
        window.open($rootScope.prevLocationSignUp,'_self');
    };
    $scope.signUpObj={};
    $scope.signUpObj.residing="";
    $scope.projectList=["Skylark Royaume","Skylark Ithaca","Skylark Arcadia"];
    $scope.signUp = function(){
        if (!validationSignupData())
            return;
        $scope.signinLoader=true;
        const jsonToSend= angular.toJson($scope.signUpObj);
        $http({ method: 'POST', url: baseUrl+"signup",data: jsonToSend }).then(function (res){
            $scope.signinLoader=false;
             window.location.href="Signup_success.html";
        }, function (res) {
            $scope.signinLoader=false;
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

    $scope.validatePhoneNumber=function (phone) {
          if (phone){
              if (phone.indexOf("+")!==phone.lastIndexOf("+") || phone.length < 8 || phone.length > 12){
                  $scope.invalidPhoneNumber=true;
              }else {
                  $scope.invalidPhoneNumber=false;
              }

          }else {
              $scope.invalidPhoneNumber=true;
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

app.controller('signInController', function($scope,$rootScope,$http,$filter,$timeout,$window ) {
    /*const baseUrl = "http://localhost:8080/";
    const baseUrlWeb = "http://localhost/skylark-website/";*/
    const baseUrl = "http://34.236.8.175:8080/";
    const baseUrlWeb = "http://34.236.8.175/";

    $rootScope.prevLocationSignIn = document.referrer;
    console.log($rootScope.prevLocationSignUp," sjhfhjbv skjvh login: ",$rootScope.prevLocationSignIn);


    if ($rootScope.prevLocationSignIn.indexOf("signup.html") > -1)
        $rootScope.prevLocationSignIn = localStorage.getItem("signup");
    else


        localStorage.setItem("signin", $rootScope.prevLocationSignIn);


        console.log("sjhfhjbv skjvh login: ",$rootScope.prevLocationSignIn);
    $scope.goBack=function () {
        window.open($rootScope.prevLocationSignIn,'_self');
        // $window.open(newState, _blank);
    };
    $scope.signInObj={};
    $scope.signInError={};
    $scope.signIn = function(){
        if (!signInValidation())
            return;
        $scope.signinLoader=true;
        const jsonToSend= angular.toJson($scope.signInObj);
        $http({ method: 'POST', url: baseUrl+"login",data: jsonToSend }).then(function (res){
            $scope.signinLoader=false;
            window.location.href="feedpage.html";
            var usrCompId = localStorage.setItem("customerData", JSON.stringify(res.data.object));
        }, function (res) {
            $scope.signinLoader=false;
            $scope.showLoginError=true;
            if (res.status===400){
                $scope.errorMsg="Email not found";
            }
            if (res.status===401){
                $scope.errorMsg="Your details not verified by skylark";
            }
            if (res.status===402){
                $scope.errorMsg="Sorry, Your details rejected by skylark";
            }
            if (res.status===403){
                $scope.errorMsg="Password mismatch";
            }
            $timeout(function () {
                $scope.showLoginError=false;
            }, 10000);
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

        return signInReturn;
    };
    $scope.toHome=function(){
        console.log("success");
        window.location.href="index.html"
    }

});

app.controller('feedController', function($scope,$http,$filter,$timeout) {
    /*const baseUrl = "http://localhost:8080/";
    const baseUrlWeb = "http://localhost/skylark-website/";*/
    const baseUrl = "http://34.236.8.175:8080/";
    const baseUrlWeb = "http://34.236.8.175/";
    $scope.fromLocal=JSON.parse(localStorage.getItem("customerData"));
    if ($scope.fromLocal===null || $scope.fromLocal===undefined){
        window.location.href="signin.html";
    }

    $scope.projectList=["Skylark Royaume","Skylark Ithaca","Skylark Arcadia"];
    $scope.referral={};
    $scope.referral.userid=$scope.fromLocal.userid;
    $scope.sendReferral=function () {
        if(!referralValidation())
            return;
        $scope.processing=true;
        const jsonToSend= angular.toJson($scope.referral);
        $http({ method: 'POST', url: baseUrl+"referral",data: jsonToSend }).then(function (res){
            $scope.processing=false;
            $scope.successReferral=true;
            $scope.referral={};
            $timeout(function () {
                $scope.successReferral=false;
            }, 5000);
        }, function (res) {
            $scope.processing=false;
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
        if (!$scope.referral.phone){
            referralReturn=false;
            $scope.errorReferral.phone=true;
        }
        if (!$scope.referral.residing){
            referralReturn=false;
            $scope.errorReferral.residing=true;
        }

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

    $scope.validatePhoneNumber=function (phone) {
        if (phone){
            if (phone.indexOf("+")!==phone.lastIndexOf("+") || phone.indexOf("+") > 0 || phone.length < 8 || phone.length > 12){
                $scope.invalidPhoneNumber=true;
            }else {
                $scope.invalidPhoneNumber=false;
            }

        }else {
            $scope.invalidPhoneNumber=true;
        }
    };

});

app.controller('forgotPasswordController', function($scope,$http,$filter,$timeout) {
    /*const baseUrl = "http://localhost:8080/";
    const baseUrlWeb = "http://localhost/skylark-website/";*/
    const baseUrl = "http://34.236.8.175:8080/";
    const baseUrlWeb = "http://34.236.8.175/";
    $scope.forgot={};
    $scope.getForgotPasswordLink=function () {
        if(!forgotValidation())
            return;
        $scope.signinLoader=true;
        const jsonToSend= angular.toJson($scope.forgot);
        $http({ method: 'POST', url: baseUrl+"login/submitemail",data: jsonToSend }).then(function (res){
            $scope.signinLoader=false;
            $scope.successForgot=true;
            $scope.forgot={};
            $timeout(function () {
                $scope.successForgot=false;
            }, 5000);
        }, function (res) {
            $scope.signinLoader=false;
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
            window.location.href="Password_reset_success.html";
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

    $scope.toHome=function(){
        window.location.href="index.html";
    };
    $scope.passwordValidator = function (passcheck) {
        if (!passcheck || passcheck.length < 8 || passcheck.length > 20) {
            $scope.pswdVerifier = true;
        } else{
            $scope.pswdVerifier = false;
        }
    };
});

app.controller('contactUsController', function($scope,$http,$filter,$timeout) {
    /* const baseUrl = "http://localhost:8080/";
     const baseUrlWeb = "http://localhost/skylark-website/";*/
    const baseUrl = "http://34.236.8.175:8080/";
    const baseUrlWeb = "http://34.236.8.175/";
    $scope.sticky = {name: "stickycontactform.html", url: "stickycontactform.html"};
    $scope.errorcontact={};
    var contactFormValidation=function () {
        var contactReturn=true;
        if (!$scope.contact.fname){
            contactReturn=false;
            $scope.errorcontact.name=true;

        }
        if (!$scope.contact.email){
            contactReturn=false;
            $scope.errorcontact.email=true;
        }
        if (!$scope.contact.phone){
            contactReturn=false;
            $scope.errorcontact.phone=true;
            // $scope.invalidPhoneNumber=true;
        }

        return contactReturn;
    };

    $scope.errorcontact.email=false;
    $scope.validateEmail=function (email) {
        if (/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/.test(email)){
            $scope.invalidEmail=false;
        }else {
            $scope.invalidEmail=true;
        }
    };


    $scope.contact={};

    $scope.toContact= function (projectName) {
        console.log("inside the controller fun: ",contactFormValidation());
        if(!(contactFormValidation() && !$scope.invalidPhoneNumber ))
            return;
        $scope.processing=true;
        $scope.contact.sourcepage=projectName;
        const jsonToSend= angular.toJson($scope.contact);
        console.log("jsonToSend",jsonToSend);
        $http({ method: 'POST', url: baseUrl+"contact/save",data: jsonToSend }).then(function (res){
            console.log("success");
            $scope.processing=false;
            $scope.contact={};
            $scope.errorcontact={};
        }, function (res) {
            console.log("request failed");
            $scope.contact={};
            $scope.processing=false;
        });
    };

    $scope.validatePhoneNumber=function (phone) {
        if (phone){
            if (phone.indexOf("+")!==phone.lastIndexOf("+") || phone.length < 8 || phone.length > 12){
                $scope.invalidPhoneNumber=true;
            }
            else {
                $scope.invalidPhoneNumber=false;

            }
        }
        else {
            $scope.invalidPhoneNumber=true;
        }
    };
    $scope.clearContact=function () {
        $scope.contact={};
    };
    $scope.showMasterPlan=false;
    $scope.subsecToggle = function(){
        $scope.showMasterPlan=!$scope.showMasterPlan;
    }
});

app.controller('stickyFormController', function($scope,$http,$filter,$timeout) {
    /* const baseUrl = "http://localhost:8080/";
     const baseUrlWeb = "http://localhost/skylark-website/";*/
    const baseUrl = "http://34.236.8.175:8080/";
    const baseUrlWeb = "http://34.236.8.175/";

    console.log("dfvdsv df gd",location.href);

    $scope.formerrorcontact={};
    var formcontactFormValidation=function () {
        var formcontactReturn=true;
        if (!$scope.formcontact.fname){
            formcontactReturn=false;
            $scope.formerrorcontact.name=true;

        }
        if (!$scope.formcontact.email){
            formcontactReturn=false;
            $scope.formerrorcontact.email=true;
        }
        if (!$scope.formcontact.phone){
            formcontactReturn=false;
            $scope.formerrorcontact.phone=true;
            // $scope.invalidPhoneNumber=true;
        }

        return formcontactReturn;
    };

    $scope.formerrorcontact.email=false;
    $scope.formvalidateEmail=function (email) {
        if (/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/.test(email)){
            $scope.forminvalidEmail=false;
        }else {
            $scope.forminvalidEmail=true;
        }
    };


    $scope.formcontact={};

    $scope.formtoContact= function (projectName) {
        console.log("inside the controller fun: ",formcontactFormValidation());
        if(!(formcontactFormValidation() && !$scope.forminvalidPhoneNumber ))
            return;
        $scope.formprocessing=true;
        $scope.formcontact.sourcepage=projectName;
        const jsonToSend= angular.toJson($scope.formcontact);
        console.log("jsonToSend",jsonToSend);
        $http({ method: 'POST', url: baseUrl+"contact/save",data: jsonToSend }).then(function (res){
            console.log("success");
            $scope.formprocessing=false;
            $scope.formcontact={};
            $scope.formerrorcontact={};
        }, function (res) {
            console.log("request failed");
            $scope.formcontact={};
            $scope.formprocessing=false;
        });
    };

    $scope.formvalidatePhoneNumber=function (phone) {
        if (phone){
            if (phone.indexOf("+")!==phone.lastIndexOf("+") || phone.length < 8 || phone.length > 12){
                $scope.forminvalidPhoneNumber=true;
            }
            else {
                $scope.forminvalidPhoneNumber=false;

            }
        }
        else {
            $scope.forminvalidPhoneNumber=true;
        }
    };
    $scope.formclearContact=function () {
        $scope.formcontact={};
    };
    $scope.formshowMasterPlan=false;
    $scope.formsubsecToggle = function(){
        $scope.formshowMasterPlan=!$scope.formshowMasterPlan;
    }
});


