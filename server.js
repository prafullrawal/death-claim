var express = require('express');
var path = require('path');
var fs = require("fs");
var bodyParser = require('body-parser');
var port = process.env.PORT || process.env.VCAP_APP_PORT || '3000';
var nano = require('nano')('http://localhost:'+port);var app = express();
var axios = require("axios");


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', express.static(__dirname + '/'));
app.use('/', express.static(__dirname + '/registration'));

app.get('/', function(req, res) {
    console.log("Open index page");
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port);
console.log("server is up on port : "+port);



app.post('/verifyBeneficiary', function (req, res) {

    var data = {};

    var headers = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
	

    var url = 'http://ec2-54-205-134-49.compute-1.amazonaws.com:8080/api/org.aetna.insurance.Beneficiary/'+req.body.bid;

   verifyBeneficiary(url, headers).then(function (data) {
        if (data.success) {
            res.json({
                success: true,
                record: data.response
            });
	console.log(data);
        } else res.json({
            success: false,
            message: data
        });
    });


});

var verifyBeneficiary = async (url, headers) => {
    try {
        var Beneficiary = await axios.get(url, headers);

        console.log("Data fetched succesfully");
        return ({
            success: true,
            response: Beneficiary.data
        });
    } catch (error) {
        return ({
            success: false,
            message: error.toString()
        });
    }
}


app.post('/searchPatient', function (req, res) {

    var data = {};

    var headers = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    var url = 'http://ec2-54-205-134-49.compute-1.amazonaws.com:8080/api/org.aetna.insurance.Patientform/'+req.body.pid;
	
	
   searchPatient(url, headers).then(function (data) {
        if (data.success) {
            res.json({
                success: true,
                record: data.response
            });
        } else res.json({
            success: false,
            message: data
        });
    });


});

var searchPatient = async (url, headers) => {
    try {
        var Paitent = await axios.get(url, headers);

        console.log("Data fetched succesfully");
        return ({
            success: true,
            response: Paitent.data
        });
    } catch (error) {
        return ({
            success: false,
            message: error.data
        });
    }
}


app.post('/getAllBeneficiary', function (req, res) {

    var data = {};

    var headers = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    var url = 'http://ec2-54-205-134-49.compute-1.amazonaws.com:8080/api/org.aetna.insurance.Beneficiary';

    getAllBeneficiary(url, headers).then(function (data) {
        if (data.success) {
            res.json({
                success: true,
                beneficiaryDetails: data.response
            });
        } else res.json({
            success: false,
            message: data
        });
    });


});

var getAllBeneficiary = async (url, headers) => {
    try {
        var allBeneficiary = await axios.get(url, headers);
        console.log("Data fetched succesfully");
        return ({
            success: true,
            response: allBeneficiary.data
        });
    } catch (error) {
        return ({
            success: false,
            message: error
        });
    }
}



app.post('/getAllCertprovider', function (req, res) {

    var data = {};

    var headers = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    var url = 'http://ec2-54-205-134-49.compute-1.amazonaws.com:8080/api/org.aetna.insurance.Certprovider';

    getAllCertprovider(url, headers).then(function (data) {
        if (data.success) {
            res.json({
                success: true,
                certproviderDetails: data.response
            });
        } else res.json({
            success: false,
            message: data
        });
    });


});

var getAllCertprovider = async (url, headers) => {
    try {
        var certprovider = await axios.get(url, headers);
        console.log("Data fetched succesfully");
        return ({
            success: true,
            response: certprovider.data
        });
    } catch (error) {
        return ({
            success: false,
            message: error
        });
    }
}


app.post('/getAllFuneralhome', function (req, res) {

    var data = {};

    var headers = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    var url = 'http://ec2-54-205-134-49.compute-1.amazonaws.com:8080/api/org.aetna.insurance.Funeralhome';

    getAllFuneralhome(url, headers).then(function (data) {
        if (data.success) {
            res.json({
                success: true,
                funeralhomeDetails: data.response
            });
        } else res.json({
            success: false,
            message: data
        });
    });


});

var getAllFuneralhome = async (url, headers) => {
    try {
        var funeralhome = await axios.get(url, headers);
        console.log("Data fetched succesfully");
        return ({
            success: true,
            response: funeralhome.data
        });
    } catch (error) {
        return ({
            success: false,
            message: error
        });
    }
}


app.post('/getAllHospital', function (req, res) {

    var data = {};

    var headers = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    var url = 'http://ec2-54-205-134-49.compute-1.amazonaws.com:8080/api/org.aetna.insurance.Hospital';

    getAllHospital(url, headers).then(function (data) {
        if (data.success) {
            res.json({
                success: true,
                hospitalDetails: data.response
            });
        } else res.json({
            success: false,
            message: data
        });
    });


});

var getAllHospital = async (url, headers) => {
    try {
        var hospital = await axios.get(url, headers);
       
        console.log("Data fetched succesfully");
        return ({
            success: true,
            response: hospital.data
        });
    } catch (error) {
        return ({
            success: false,
            message: error
        });
    }
}


app.post('/getAllInsurer', function (req, res) {

    var data = {};

    var headers = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    var url = 'http://ec2-54-205-134-49.compute-1.amazonaws.com:8080/api/org.aetna.insurance.Insurer';

    getAllInsurer(url, headers).then(function (data) {
        if (data.success) {
            res.json({
                success: true,
                insurerDetails: data.response
            });
        } else res.json({
            success: false,
            message: data
        });
    });


});

var getAllInsurer = async (url, headers) => {
    try {
        var insurer = await axios.get(url, headers);
        console.log("Data fetched succesfully");
        return ({
            success: true,
            response: insurer.data
        });
    } catch (error) {
        return ({
            success: false,
            message: error
        });
    }
}


app.post('/getAllPatientform', function (req, res) {

    var data = {};

    var headers = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    var url = 'http://ec2-54-205-134-49.compute-1.amazonaws.com:8080/api/org.aetna.insurance.Patientform';

    getAllPatientform(url, headers).then(function (data) {
        if (data.success) {
            res.json({
                success: true,
                patientDetails: data.response
            });
        } else res.json({
            success: false,
            message: data
        });
    });


});

var getAllPatientform = async (url, headers) => {
    try {
        var patient = await axios.get(url, headers);
        console.log("Data fetched succesfully");
        return ({
            success: true,
            response: patient.data
        });
    } catch (error) {
        return ({
            success: false,
            message: error
        });
    }
}

app.post('/addDeathRecord', function (req, res) {

  var reqdata = req.body; 

   var headers = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

  var url = 'http://ec2-54-205-134-49.compute-1.amazonaws.com:8080/api/org.aetna.insurance.PatientRegistration';

    addDeathRecord(url, reqdata, headers).then(function (data) {
        if (data.success) {
            res.json({
                success: true,
                deathRecordDetails: data.response
            });
        } else res.json({
            success: false,
            message: data
        });
    });


});

var addDeathRecord = async (url, data, headers) => {
    
   try {
        var deathRecord = await axios.post(url,data);
        console.log("Data post succesfully");
        return ({
            success: true,
            response: deathRecord.data
        });
    } catch(error){
        return ({
            success: false,
            message: error
        });
    }
}

app.post('/VerifyandNotifyBeneficiary', function (req, res) {

  var reqdata = req.body;

   var headers = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

  var url = 'http://ec2-54-205-134-49.compute-1.amazonaws.com:8080/api/org.aetna.insurance.VerifyandNotifyBeneficiary';

    VerifyandNotifyBeneficiary(url, reqdata, headers).then(function (data) {
        if (data.success) {
            res.json({
                success: true,
                verifyandNotifyBeneficiaryRecordDetails: data.response
            });
        } else res.json({
            success: false,
            message: data
        });
    });
});

var VerifyandNotifyBeneficiary = async (url, data, headers) => {

   try {
        var verifyandNotifyBeneficiaryRecord = await axios.post(url,data);
        console.log("Data post succesfully");
        return ({
            success: true,
            response: verifyandNotifyBeneficiaryRecord.data
        });
    } catch(error){
        return ({
            success: false,
            message: error
        });
    }
}


app.post('/Beneficiaryupdate', function (req, res) {

  var reqdata = req.body;

   var headers = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

  var url = 'http://ec2-54-205-134-49.compute-1.amazonaws.com:8080/api/org.aetna.insurance.Beneficiaryupdate';

    Beneficiaryupdate(url, reqdata, headers).then(function (data) {
        if (data.success) {
            res.json({
                success: true,
                RecordDetails: data.response
            });
        } else res.json({
            success: false,
            message: data
        });
    });
});

var Beneficiaryupdate = async (url, data, headers) => {

   try {
        var Record = await axios.post(url,data);
        console.log("Data post succesfully");
        return ({
            success: true,
            response: Record.data
        });
    } catch(error){
        return ({
            success: false,
            message: error
        });
    }
}

app.post('/requestcert', function (req, res) {

  var reqdata = req.body;

   var headers = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

  var url = 'http://ec2-54-205-134-49.compute-1.amazonaws.com:8080/api/org.aetna.insurance.requestcert';

    requestcert(url, reqdata, headers).then(function (data) {
        if (data.success) {
            res.json({
                success: true,
                RecordDetails: data.response
            });
        } else res.json({
            success: false,
            message: data
        });
    });
});

var requestcert = async (url, data, headers) => {

   try {
        var Record = await axios.post(url,data);
        console.log("Data post succesfully");
        return ({
            success: true,
            response: Record.data
        });
    } catch(error){
        return ({
            success: false,
            message: error
        });
    }
}

app.post('/providecert' , function (req, res) {

  var reqdata = req.body;

   var headers = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

  var url = 'http://ec2-54-205-134-49.compute-1.amazonaws.com:8080/api/org.aetna.insurance.providecert';

    providecert(url, reqdata, headers).then(function (data) {
        if (data.success) {
            res.json({
                success: true,
                RecordDetails: data.response
            });
        } else res.json({
            success: false,
            message: data
        });
    });
});

var providecert = async (url, data, headers) => {

   try {
        var Record = await axios.post(url,data);
        console.log("Data post succesfully");
        return ({
            success: true,
            response: Record.data
        });
    } catch(error){
        console.log(error);
        return ({
            success: false,
            message: error
        });
    }
}


app.post('/claiminitiation' , function (req, res) {

  var reqdata = req.body;

   var headers = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

  var url = 'http://ec2-54-205-134-49.compute-1.amazonaws.com:8080/api/org.aetna.insurance.claiminitiation';

    requestcert(url, reqdata, headers).then(function (data) {
        if (data.success) {
            res.json({
                success: true,
                RecordDetails: data.response
            });
        } else res.json({
            success: false,
            message: data
        });
    });
});

var claiminitiation = async (url, data, headers) => {

   try {
        var Record = await axios.post(url,data);
        console.log("Data post succesfully");
        return ({
            success: true,
            response: Record.data
        });
    } catch(error){
        return ({
            success: false,
            message: error
        });
    }
}

app.post('/addParticipants' , function (req, res) {

  var reqdata = req.body.data;
  var url  = req.body.url;

  var headers = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

 addParticipants(url, reqdata, headers).then(function (data) {
        if (data.success) {
            res.json({
                success: true,
                RecordDetails: data.response
            });
        } else res.json({
            success: false,
            message: data
        });
    });
});

var addParticipants = async (url, data, headers) => {
   try {
        var Record = await axios.post(url,data);
        console.log("Data post succesfully");
        return ({
            success: true,
            response: Record.data
        });
    } catch(error){
        return ({
            success: false,
            message: error
        });
    }
}

