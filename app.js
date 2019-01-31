'use strict';

var app = angular.module('myModule',[]);

app.controller('myController', function($scope,$http){

   $scope.getAllBeneficiary = function () {

        var data = {};

        $("#cover-spin").show();

        $http({
            method: 'POST',
            url: '/getAllBeneficiary',
            data: data
        }).then(function successCallback(response) {
            if (response.data != null && response.status == 200) {
                $("#cover-spin").hide();
                console.log(response);

            } else {
                alert("Error!! Please contact system admin");
            }
        });
    }
     
    $scope.getAllCertprovider = function () {

        var data = {};

        $("#cover-spin").show();

        $http({
            method: 'POST',
            url: '/getAllCertprovider',
            data: data
        }).then(function successCallback(response) {
            if (response.data != null && response.status == 200) {
                $("#cover-spin").hide();
                console.log(response);

            } else {
                alert("Error!! Please contact system admin");
            }
        });

    }

    $scope.getAllFuneralhome = function () {

        var data = {};

        $("#cover-spin").show();

        $http({
            method: 'POST',
            url: '/getAllFuneralhome',
            data: data
        }).then(function successCallback(response) {
            if (response.data != null && response.status == 200) {
                $("#cover-spin").hide();
                console.log(response);

            } else {
                alert("Error!! Please contact system admin");
            }
        });

    }

    $scope.getAllHospital = function () {

        var data = {};

        $("#cover-spin").show();

        $http({
            method: 'POST',
            url: '/getAllHospital',
            data: data
        }).then(function successCallback(response) {
            if (response.data != null && response.status == 200) {
                $("#cover-spin").hide();
                console.log(response);

            } else {
                alert("Error!! Please contact system admin");
            }
        });

    }

    $scope.getAllInsurer = function () {

        var data = {};

        $("#cover-spin").show();

        $http({
            method: 'POST',
            url: '/getAllInsurer',
            data: data
        }).then(function successCallback(response) {
            if (response.data != null && response.status == 200) {
                $("#cover-spin").hide();
                console.log(response);

            } else {
                alert("Error!! Please contact system admin");
            }
        });

    }

    $scope.getAllPatientform = function () {

        var data = {};

        $("#cover-spin").show();

        $http({
            method: 'POST',
            url: '/getAllPatientform',
            data: data
        }).then(function successCallback(response) {
            if (response.data != null && response.status == 200) {
                $("#cover-spin").hide();
		console.log(response.data.patientDetails);
		$scope.allPaitentRecord = response.data.patientDetails;

            } else {
                alert("Error!! Please contact system admin");
            }
        });

    }


   $scope.postDeathRecord = function (deathRecordData) {     
	                                      // 1548678580199 same  // 1548678775283 Apollo
	var hospital = $('#hospital').val();
	var Beneficiaryname = $('#beneficiaryName').val();
	
	if(deathRecordData!=undefined  &&  deathRecordData.personName!=undefined && deathRecordData.address !=undefined && deathRecordData.deathOfDeath != undefined && deathRecordData.SSNo != undefined && hospital)
	{
 
	var validateSSN = is_socialSecurity_Number(deathRecordData.SSNo);

	if(!validateSSN)
	{
	   alert("Please Enter valid SSN no.");
	   return null;	
	}
	else
	{
	
        var pid = Date.now().toString();
        var options = { year: 'numeric', month: 'long', day: 'numeric' };		
        var date  = deathRecordData.deathOfDeath.toLocaleDateString("en-US",options)
        var data = {
                    "$class": "org.aetna.insurance.Patientform",
                    "pid": pid,
                    "pname":deathRecordData.personName ,
                    "address": deathRecordData.address,
                    "dod": date,
                    "SSN": deathRecordData.SSNo,
                    "Hospital":hospital ,
                    "Policyno":" ",
                    "Beneficiary_name":" ",
                    "Beneficiary_notified": "No",
                    "Cert_Provided": "No",
                    "Funeralhome_notified": "No",
                    "InsurerVerified": "No",
                    "Claimstatus": "No",
                    "funeralhome": " ",
                    "Cert_Requested": "No"
            }
		
		console.log("success inserting death record");
		console.log(data);

	$("#cover-spin").show();	
	
	$http({
            method: 'POST',
            url: '/addDeathRecord',
            data: data
        }).then(function successCallback(response) {
            if (response.data != null && response.status == 200) {
                $("#cover-spin").hide();
		console.log(response);
                alert("record successfully updated person id : "+pid);

            } else {
                alert("Error!! Please contact system admin");
            }
        });

	}
      }
    }		

    function is_socialSecurity_Number(str)
    {
	var Regexp = /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/;
  
        if (Regexp.test(str))
          {
            return true;
          }
        else
          {
            return false;
          }
    }



 	$scope.VerifyandNotifyBeneficiary = function(data) { 

		console.log(data.pid +" "+data.beneficiaryName);

		data = {
			"$class": "org.aetna.insurance.VerifyandNotifyBeneficiary",
			"patientform": "org.aetna.insurance.Patientform#"+data.pid,
 			"beneficiary": "org.aetna.insurance.Beneficiary#"+data.beneficiaryName,
			"Policyno": data.Policyno;
		}
		
		$("#cover-spin").show();

		$http({
        		    method: 'POST',
       	       	 	    url: '/VerifyandNotifyBeneficiary',
        		    data: data
       		 }).then(function successCallback(response) {
           		 if (response.data != null && response.status == 200) {
             			   $("#cover-spin").hide();
            			   console.log(response);
               			   alert("record successfully updated with tx id : "+response.data.verifyandNotifyBeneficiaryRecordDetails.transactionId);
           		 } else {
               			 alert("Error!! Please contact system admin");
           		 }
       		 });

		
  	}

	$scope.Beneficiaryupdate = function(data) {
	
		console.log(data.pid+" "+data.funeralHome);
		$("#cover-spin").show();
	
		data = {
                        "$class": "org.aetna.insurance.Beneficiaryupdate",
                        "patientform": "resource:org.aetna.insurance.Patientform#"+data.pid,
                        "beneficiary": "resource:org.aetna.insurance.Beneficiary#"+data.funeralHome
                }

                $http({
                            method: 'POST',
                            url: '/Beneficiaryupdate',
                            data: data
                 }).then(function successCallback(response) {
                         if (response.data != null && response.status == 200) {
                                   $("#cover-spin").hide();
                                   console.log(response);
                                   alert("record successfully updated with tx id : "+response.data.RecordDetails.transactionId);
                         } else {
                                 alert("Error!! Please contact system admin");
                         }
                 });


        }
	
	$scope.providecert = function(data) {
		
		console.log(data.pid);
		$("#cover-spin").show();
		
		data = {
                       "$class": "org.aetna.insurance.Providecert",
                        "patientform": "resource:org.aetna.insurance.patientform#"+data.pid,
                }


                $http({
                            method: 'POST',
                            url: '/providecert',
                            data: data
                 }).then(function successCallback(response) {
                         if (response.data != null && response.status == 200) {
                                   $("#cover-spin").hide();
                                   console.log(response);
                                   alert("record successfully updated with tx id : "+response.data.RecordDetails.transactionId);
                         } else {
                                 alert("Error!! Please contact system admin");
                         }
                 });
		

        }
	
	$scope.claiminitiation = function(data) {
	
		console.log(data.pid);
		$("#cover-spin").show();

		data = {
                       "$class": "org.aetna.insurance.claiminitiation",
                        "patientform": "resource:org.aetna.insurance.Patientform#"+data.pid,
                }


                $http({
                            method: 'POST',
                            url: '/claiminitiation',
                            data: data
                 }).then(function successCallback(response) {
                         if (response.data != null && response.status == 200) {
                                   $("#cover-spin").hide();
                                   console.log(response);
                                   alert("record successfully updated with tx id : "+response.data.RecordDetails.transactionId);
                         } else {
                                 alert("Error!! Please contact system admin");
                         }
                 });

        }

	$scope.requestcert = function(data) {

		console.log(data.pid);
		$("#cover-spin").show();
	
		data = {
                       "$class": "org.aetna.insurance.requestcert",
                        "patientform": "resource:org.aetna.insurance.Patientform#"+data.pid,
                }


                $http({
                            method: 'POST',
                            url: '/requestcert',
                            data: data
                 }).then(function successCallback(response) {
                         if (response.data != null && response.status == 200) {
                                   $("#cover-spin").hide();
                                   console.log(response);
                                   alert("record successfully updated with tx id : "+response.data.RecordDetails.transactionId);
                         } else {
                                 alert("Error!! Please contact system admin");
                         }
                 });

        }


});	


