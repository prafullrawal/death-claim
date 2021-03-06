'use strict';

"scripts";[
        "./bootstrap-notify.js"
]


var app = angular.module('myModule',['ngTable']);

app.controller('myController', function($scope,$http,NgTableParams){

   // init funciton on page load
   $scope.init = function() {
	
//	$scope.getAllHospital();
//	$scope.getAllFuneralHome();
		
   };
	
   $scope.verifyBeneficiary = function (bid) {

	$("#cover-spin").show();
		
	if(bid==undefined){
	   //alert('Beneficiary Id cant be blank.');	
	   $("#cover-spin").hide();
	   return null;
	} 

	bid = bid.toString();	
	var data = { "bid" : bid}	

        $http({
            method: 'POST',
            url: '/verifyBeneficiary',
            data: data
        }).then(function successCallback(response) {
            if (response.data.success==true && response.status == 200) {
                $("#cover-spin").hide();
                $scope.addPaitentData.verifiedBName = response.data.record.name;
		console.log(response);		
            } else {
	        $("#cover-spin").hide();		
		$scope.addPaitentData.verifiedBName = "";		
		$.notify({
			
                        icon: "fas fa-exclamation-triangle",
                        title: " Error !! ",
                        message: " Beneficiary not found please enter correct id."
                },{type: "danger"}, {
					offset:{
						x:15,
						y:400
					}
				});
            }
        });

   }
  
   $scope.searchPaitentRecord = function (pid) {

        $("#cover-spin").show();

        if(pid==undefined){
           //alert('Beneficiary Id cant be blank.');
           $("#cover-spin").hide();
           return null;
        }


	var data = pid.split("+");
	var pid = data[0];
	var reqby = data[1];
        pid = pid.toString();
        var data = { "pid" : pid}
	
	console.log(data);

        $http({
            method: 'POST',
            url: '/searchPatient',
            data: data
        }).then(function successCallback(response) {
            if (response.data.success==true && response.status == 200) {
                $("#cover-spin").hide();

		if(reqby=='fhome')
			 $scope.fHomeSearchPaitentRecord = response.data.record;
		if(reqby=='dboard')
	                $scope.spaitentRecord = response.data.record;
		
		//$scope.tableParamsPsearch = new NgTableParams({count: 2}, {counts:[], dataset: $scope.paitentData});	        

            } else {
		$("#cover-spin").hide();
             	$.notify({
                        icon: "fas fa-exclamation-triangle",
                        title: "Error !!",
                        message: "Paitent not found please enter correct id."
                },{
               		type: "danger",
			offset:{
				x:15,
				y:200
			}
		});

		$scope.spaitentRecord = " ";

            }
        });

   }

   $scope.getAllBeneficiary = function () {

        var data = {};

        $("#cover-spin").show();

        $http({
            method: 'POST',
            url: '/getAllBeneficiary',
            data: data
        }).then(function successCallback(response) {
            if (response.data.success==true && response.status == 200) {
                $("#cover-spin").hide();
                console.log(response);
            } else {
		$("#cover-spin").hide();
                $.notify({
                        icon: "fas fa-exclamation-triangle",
                        title: "Error !!",
                        message: "Error!! Please contact system admin"
                },{
                        type: "danger",
                        offset:{
                                x:15,
                                y:200
                        }
                });

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
            if (response.data.success==true && response.status == 200) {
                $("#cover-spin").hide();
                console.log(response);

            } else {
		$("#cover-spin").hide();
                $.notify({
                        icon: "fas fa-exclamation-triangle",
                        title: "Error !!",
                        message: "Error!! Please contact system admin"
                },{
                        type: "danger",
                        offset:{
                                x:15,
                                y:200
                        }
                });

            }
        });

    }

    $scope.getAllFuneralHome = function () {

        var data = {};

        $("#cover-spin").show();

        $http({
            method: 'POST',
            url: '/getAllFuneralhome',
            data: data
        }).then(function successCallback(response) {
            if (response.data.success==true && response.status == 200) {
                $("#cover-spin").hide();
		$scope.allFuneralHomes = response.data.funeralhomeDetails;
                console.log(response);

            } else {
		$("#cover-spin").hide();
                $.notify({
                        icon: "fas fa-exclamation-triangle",
                        title: "Error !!",
                        message: "Please contact system admin"
                },{
                        type: "danger",
                        offset:{
                                x:15,
                                y:200
                        }
                });
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
            if (response.data.success==true && response.status == 200) {
                $("#cover-spin").hide(); 
		$scope.allHospitals = response.data.hospitalDetails;
		console.log($scope.allHospitals);
            } else {
		$("#cover-spin").hide();
               	$.notify({
                        icon: "fas fa-exclamation-triangle",
                        title: "Error !!",
                        message: "Please contact system admin"
                },{
                        type: "danger",
                        offset:{
                                x:15,
                                y:200
                        }
                });
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
            if (response.data.success==true && response.status == 200) {
                $("#cover-spin").hide();
                console.log(response);

            } else {
		$("#cover-spin").hide();
              	$.notify({
                        icon: "fas fa-exclamation-triangle",
                        title: "Error !!",
                        message: "Please contact system admin"
                },{
                        type: "danger",
                        offset:{
                                x:15,
                                y:200
                        }
                });
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
            if (response.data.success==true && response.status == 200) {
                $("#cover-spin").hide();

		$scope.allPaitentRecord = response.data.patientDetails;
		$scope.tableParams = new NgTableParams({count: 10}, {counts:[], dataset: $scope.allPaitentRecord});
		$scope.tableParamsAllPaitents = new NgTableParams({count: 5}, {counts:[], dataset: $scope.allPaitentRecord});

            } else {
		$("#cover-spin").hide();
                $.notify({
                        icon: "fas fa-exclamation-triangle",
                        title: "Error !!",
                        message: "Please contact system admin"
                },{
                        type: "danger",
                        offset:{
                                x:15,
                                y:200
                        }
                });
            }
        });

    }


   $scope.postDeathRecord = function (deathRecordData) {     
	
	console.log(deathRecordData);	

		
	if(deathRecordData!=undefined  &&  deathRecordData.personName!=undefined && deathRecordData.address !=undefined && deathRecordData.deathOfDeath != undefined && deathRecordData.SSNo != undefined && deathRecordData.pid!=undefined)
	{
 
	var validateSSN = is_socialSecurity_Number(deathRecordData.SSNo);

	if(!validateSSN)
	{
	   alert("Please Enter valid SSN no.");
	   return null;	
	}
	else
	{
	
 	//var hospitalNameId = deathRecordData.hospitalName.split("+");
	//var hospitalName = hospitalNameId[1];
	//var hid = hospitalNameId[0]; 
	
        var pid = Date.now().toString();
        var options = { year: 'numeric', month: 'long', day: 'numeric' };		
        var date  = deathRecordData.deathOfDeath.toLocaleDateString("en-US",options)

 
        var data = {
  			"$class": "org.aetna.insurance.PatientRegistration",  
			"patientform":{
                	    "$class": "org.aetna.insurance.Patientform",
           	            "pid": pid,
          	            "pname":deathRecordData.personName ,
                 	    "address": deathRecordData.address,
         	            "dod": date,
                	    "SSN": deathRecordData.SSNo,
			    "hid":"1551416691476",
               		    "Hospital":"Apollo",
			    "fhid":"1551416896228",
			    "bid":" ",
          	            "Policyno":deathRecordData.pid,
                	    "Beneficiary_name":" ",
               		    "Beneficiary_notified": "No",
          	            "Cert_Provided": "No",
       		            "Funeralhome_notified": "No",
                	    "InsurerVerified": "No",
                	    "Claimstatus": "No",
              		    "funeralhome":"445 Mount Eden, Auckland",
            	            "Cert_Requested": "No"
            	  	}
		}
		
		console.log("success inserting death record");
		console.log(data);
		

	$("#cover-spin").show();	
	
	$http({
            method: 'POST',
            url: '/addDeathRecord',
            data: data
        }).then(function successCallback(response) {
            if (response.data.success==true && response.status == 200) {
                $("#cover-spin").hide();
		console.log(response);
		$scope.addPaitentData = "";
		$scope.getAllPatientform();
		
		$.notify({
                        icon: "far fa-handshake",
                        title: "Success !!",
                        message: "Inserted record in ledger with unique Id : "+pid+" and TxId : "+response.data.deathRecordDetails.transactionId
                }, {
                                        offset:{
                                                x:15,
                                                y:200
                                        }
                                });
			
            } else {
		$("#cover-spin").hide();
               	$.notify({
                        icon: "fas fa-exclamation-triangle",
                        title: "Error !!",
                        message: " Please try again or contact system admin."
                },{
                        type: "danger",
                        offset:{
                                x:15,
                                y:200
                        }
                });
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

		if(data.policyNo==undefined || data.policyNo==" ")
		{
			return null;
		}
	
		data = {
			"$class": "org.aetna.insurance.VerifyandNotifyBeneficiary",
			"patientform": "org.aetna.insurance.Patientform#"+data.pid,
 			"beneficiary": "org.aetna.insurance.Beneficiary#"+data.bid,
			"Policyno": data.policyNo
		}

		console.log(data);
	
		$("#cover-spin").show();

                   			 
		$http({
        		    method: 'POST',
       	       	 	    url: '/VerifyandNotifyBeneficiary',
        		    data: data
       		 }).then(function successCallback(response) {
           		 if (response.data.success==true && response.status == 200) {
             			   $("#cover-spin").hide();
            			   console.log(response);
				   $('.bd-example-modal-lg').modal('hide');
				   $scope.getAllPatientform();
				   $.notify({
                   			     icon: "far fa-handshake",
                		             title: "Success !!",
        		                     message: "record successfully updated with tx id : "+response.data.verifyandNotifyBeneficiaryRecordDetails.transactionId
               				 }, {
                                        offset:{
                                                x:15,
                                                y:200
                                        }
                                });
           		 } else {
				$("#cover-spin").hide();
               			$.notify({
                   		   	 icon: "fas fa-exclamation-triangle",
                       			 title: "Error !!",
                       			 message: "Please try again or contact system admin."
               			},{
		                        type: "danger",
                		        offset:{
                               			 x:15,
                          		         y:200
                       			 }
               			 });

           		 }
       		 });

		
  	}

	$scope.Beneficiaryupdate = function(data) {
	
		console.log(data.pid+" "+data.fhid);
		$("#cover-spin").show();
	
		data = {
                        "$class": "org.aetna.insurance.Beneficiaryupdate",
                        "patientform": "resource:org.aetna.insurance.Patientform#"+data.pid,
                        "funeralhome": "resource:org.aetna.insurance.Funeralhome#"+data.fhid
                }

                $http({
                            method: 'POST',
                            url: '/Beneficiaryupdate',
                            data: data
                 }).then(function successCallback(response) {
                         if (response.data.success==true && response.status == 200) {
                                   $("#cover-spin").hide();
                                   console.log(response);
                                   
				   $.notify({
                                             icon: "far fa-handshake",
                                             title: "Success !!",
                                             message:"Record successfully updated with tx id : "+response.data.RecordDetails.transactionId
                                         }, {
                                        offset:{
                                                x:15,
                                                y:200
                                        }
                                });
				   $scope.getAllPatientform();
                         } else {
				$("#cover-spin").hide();
				$.notify({
                   			     icon: "fas fa-exclamation-triangle",
                        		     title: "Error !!",
                     			     message: "Please try again or contact system admin."
               				 },{
                		        	type: "danger",
		                	        	offset:{
                                				x:15,
                                				y:200
                        			}
                			});

                       }
                 });


        }
	
	$scope.providecert = function(data) {
		
		console.log(data.pid);
		$("#cover-spin").show();
		
		data = {
                       "$class": "org.aetna.insurance.providecert",
                        "patientform": "resource:org.aetna.insurance.Patientform#"+data.pid,
                }


                $http({
                            method: 'POST',
                            url: '/providecert',
                            data: data
                 }).then(function successCallback(response) {
                         if (response.data.success==true && response.status == 200) {
                                   $("#cover-spin").hide();
                                   console.log(response);
				   $scope.getAllPatientform();
				   $.notify({
                                             icon: "far fa-handshake",
                                             title: "Success !!",
                                             message: "record successfully updated with tx id : "+response.data.RecordDetails.transactionId
                                         }, {
                                        offset:{
                                                x:15,
                                                y:200
                                        }
                                });
                         } else {
				$("#cover-spin").hide();
				$.notify({
                		        icon: "fas fa-exclamation-triangle",
                 		        title: "Error !!",
                  		        message: "Please try again or contact system admin."
               			 },{
                                                type: "danger",
                                                        offset:{
                                                                x:15,
                                                                y:200
                                                }
                                        });
                         }
                 });
		

        }
	
	$scope.claiminitiation = function(data) {
	
		var pid = data.pid;
	
		var bname = $('#bname'+pid).html();
		
		$("#cover-spin").show();

		data = {
                       "$class": "org.aetna.insurance.claiminitiation",
                        "patientform": "resource:org.aetna.insurance.Patientform#"+data.pid,
			"bname": bname
                }


                $http({
                            method: 'POST',
                            url: '/claiminitiation',
                            data: data
                 }).then(function successCallback(response) {
                         if (response.data.success==true && response.status == 200) {
                                   $("#cover-spin").hide();
                                   console.log(response);
                               
				   $scope.getAllPatientform();
				   $.notify({
                                             icon: "far fa-handshake",
                                             title: "Success !!",
                                             message: "record successfully updated with tx id : "+response.data.RecordDetails.transactionId
                                         }, {
                                        offset:{
                                                x:15,
                                                y:200
                                        }
                                });
				  $('.'+pid).modal('hide')
                         } else {
				$("#cover-spin").hide();
				$('.'+pid).modal('hide')
				$.notify({
                   			     icon: "fas fa-exclamation-triangle",
                 		             title: "Error !!",
                    			     message: "Please try again or contact system admin."
            			       },{
                                                type: "danger",
                                                        offset:{
                                                                x:15,
                                                                y:200
                                                }
                                        });
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
                         if (response.data.success==true && response.status == 200) {
                                   $("#cover-spin").hide();
                                   console.log(response);
				   $scope.getAllPatientform();
				   $.notify({
                                             icon: "far fa-handshake",
                                             title: "Success !!",
                                             message: "record successfully updated with tx id : "+response.data.RecordDetails.transactionId
                                         }, {
                                        offset:{
                                                x:15,
                                                y:200
                                        }
                                });
				$scope.fHomeSearchPaitentRecord = '';
                         } else {
				$("#cover-spin").hide();
				$.notify({
                                             icon: "fas fa-exclamation-triangle",
                                             title: "Error !!",
                                             message: "Please try again or contact system admin."
                                    },{
                                                type: "danger",
                                                        offset:{
                                                                x:15,
                                                                y:200
                                                }
                                        });
                         }
                 });

        }
	
	$scope.getPolicyDetails = function(data) {
		
	
	var policyId = {
			"data":data.Policyno
		}
	
	
		$("#cover-spin").show();
	
		$http({
                            method: 'POST',
                            url: '/getPolicyDetails',
                            data: policyId
                 }).then(function successCallback(response) {
                         if (response.data.status == 200) {
                                   $("#cover-spin").hide();
                                   console.log(response);

				$scope.insuranceBName = { 'bid':response.data.bid,'bname':response.data.bname}
			

                                   $.notify({
                                             icon: "far fa-handshake",
                                             title: "Success !!",
                                             message: "Successfully verified given policy no."
                                         }, {
                                        offset:{
                                                x:15,
                                                y:200
                                        }
                                });
				$('.'+data.pid).modal('show');
				
                         } else {
                                $("#cover-spin").hide();
                                $.notify({
                                             icon: "fas fa-exclamation-triangle",
                                             title: "Error !!",
                                             message: "No record found with given Policy no : "+data.Policyno+"."
                                    },{
                                                type: "danger",
                                                        offset:{
                                                                x:15,
                                                                y:200
                                                }
                                        });
                         }
                 });
		
	}


	$scope.BeneficiaryIdProofupdate = function(data){

		if(data.newbid==undefined || data.newbid==" "){alert("Please enter unique id");return null;}
		                
		data = 
			{
  				"$class": "org.aetna.insurance.updateBenificiaryIdentityProof",
				"patientform": "resource:org.aetna.insurance.Patientform#"+data.pid,
  				"bid": data.newbid
			}	 
		
		console.log(data);

                $("#cover-spin").show();
		

                $http({
                            method: 'POST',
                            url: '/BeneficiaryIdProofupdate',
                            data: data
                 }).then(function successCallback(response) {
                         if (response.data.success) {
                                   $("#cover-spin").hide();
                       	           console.log(response);
				   $scope.getAllPatientform();
                                   $.notify({
                                             icon: "far fa-handshake",
                                             title: "Success !!",
                                             message: "Unique updated successfully with tx no. :"+response.data.RecordDetails.transactionId
                                         },{
						offset: {
							x:15,
							y: 200
						}
					});
			

                         } else {
                                $("#cover-spin").hide();
                                $.notify({
                                             icon: "fas fa-exclamation-triangle",
                                             title: "Error !!",
                                             message: "Please try again or contact system admin."
                                      },{
                                                type: "danger",
                                                        offset:{
                                                                x:15,
                                                                y:200
                                                }
                                        });
                         }
                 });

        }

});	
