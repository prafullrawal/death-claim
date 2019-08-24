package main

/* Imports
* 4 utility libraries for handling bytes, reading and writing JSON,
formatting, and string manipulation
* 2 specific Hyperledger Fabric specific libraries for Smart Contracts
*/
import (
        "bytes"
        "encoding/json"
        "fmt"
        "time"

        "github.com/hyperledger/fabric/core/chaincode/shim"
        sc "github.com/hyperledger/fabric/protos/peer"
)

// Define the Smart Contract structure
type SmartContract struct {
}


type Patient struct {
        PatientId string `json:"PatientId"`
        PatientName  string `json:"PatientName"`
        Address string `json:"address"`
        Dod  string `json:"dod"`
        SSN  string `json:"ssn"`
        HospitalName string `json:"hospitalName"`
        Policyno  string `json:"policyno"`
        BeneficiaryId string `json:"beneficiaryId"`
        BeneficiaryName  string `json:"beneficiaryName"`
        Beneficiarynotified  string `json:"beneficiarynotified"`
        InsurerVerified string `json:"insurerVerified"`
        Claimstatus string `json:"claimstatus"`
        CertRequested string `json:"certRequested"`
        CertProvided  string `json:"certProvided"`
        BeneficiaryContactNo  string `json:"beneficiaryContactNo"`
        BeneficiaryEmail string `json:"beneficiaryEmail"`
        FHDirectorName string `json:"fHDirectorName"`
        FuneralHome  string `json:"funeralHome"`
        FuneralHomeNotify string `json:"funeralHomeNotify"`
        FuneralDate  string `json:"funeralDate"`
        InsurerName  string `json:"insurerName"`
        TransactionTime  string `json:"transactionTime"`
        TransactionId string `json:"transactionId"`
        ClaimStatusComment  string `json:"claimStatusComment"`
        TransacitonMessage string `json:"transactionMessage"`
}



/*
* The Init method *
  called when the Smart Contract "tuna-chaincode" is instantiated by the network
 * Best practice is to have any Ledger initialization in separate function
 -- see initLedger()
 */

func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
        return shim.Success(nil)
}

/*
 * The Invoke method *
 called when an application requests to run the Smart Contract "tuna-chaincode"
 The app also specifies the specific smart contract function to call with args
 */
func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

        // Retrieve the requested Smart Contract function and arguments
        function, args := APIstub.GetFunctionAndParameters()
        // Route to the appropriate handler function to interact with the ledger
        if function == "getAllPatientRecord" {
                return s.getAllPatientRecord(APIstub)
        }else if function == "getPatientRecord" {
                return s.getPatientRecord(APIstub , args)
        }else if function == "initLedger" {
                return s.initLedger(APIstub)
        }else if function == "addPatient" {
                return s.addPatient(APIstub, args)
        }else if function == "verifyandNotifyBeneficiary" {
                return s.verifyandNotifyBeneficiary(APIstub, args)
        }else if function == "funeralHomeUpdateByBeneficiary" {
                return s.funeralHomeUpdateByBeneficiary(APIstub, args)
        }else if function == "requestCertificate" {
                return s.requestCertificate(APIstub, args)
        }else if function == "provideCertificate" {
                return s.provideCertificate(APIstub, args)
        }else if function == "initiateClamination" {
                return s.initiateClamination(APIstub, args)
        }else if function == "getPatientHistory" {
                return s.getPatientHistory(APIstub, args)
        }

        return shim.Error("Invalid Smart Contract function name.")
}


/*
 * The initLedger method *
 */
func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {

        var txtime string
        var txid string

        txid = APIstub.GetTxID()

        txntmsp,errN := APIstub.GetTxTimestamp()
        if errN != nil {
               txtime = time.Unix(txntmsp.Seconds, int64(txntmsp.Nanos)).String()
        }

        txtime = time.Unix(txntmsp.Seconds, int64(txntmsp.Nanos)).String()


        patient := []Patient{
                Patient{
                                PatientId : "P00000001",
                                PatientName : "test",
                                Address : "test",
                                Dod : "test",
                                SSN : "test",
                                HospitalName : "test",
                                Policyno : "test",
                                BeneficiaryId : "test",
                                BeneficiaryName : "test",
                                Beneficiarynotified : "test",
                                InsurerVerified : "test",
                                Claimstatus : "test",
                                FuneralHome : "test",
                                CertRequested : "test",
                                CertProvided : "test",
                                BeneficiaryContactNo : "test",
                                BeneficiaryEmail : "test",
                                FHDirectorName : "test",
                                FuneralHomeNotify : "test",
                                FuneralDate : "test",
                                InsurerName : "test",
                                TransactionTime: txtime,
                                TransactionId: txid,
                                ClaimStatusComment: "test",
                                TransacitonMessage: "test",
                        },
        }

        i := 0
        for i < len(patient) {
                fmt.Println("i is ", i)
                patientAsBytes, _ := json.Marshal(patient[i])
                APIstub.PutState(patient[i].PatientId, patientAsBytes)
                fmt.Println("Added", patient[i])
                i = i + 1
        }

       return shim.Success(nil)
}

/*
 * The addPatient method *
 */
func (s *SmartContract) addPatient(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

        if len(args) != 9 {
                return shim.Error("Incorrect number of arguments. Expecting 9")
        }

        var txtime string
        var txid string
        txid = APIstub.GetTxID()

        txntmsp,errN := APIstub.GetTxTimestamp()
        if errN != nil {
               txtime = time.Unix(txntmsp.Seconds, int64(txntmsp.Nanos)).String()
        }

        txtime = time.Unix(txntmsp.Seconds, int64(txntmsp.Nanos)).String()

        var patient = Patient{
                                PatientId : args[0],
                                PatientName : args[1],
                                Address : args[2],
                                Dod : args[3],
                                SSN : args[4],
                                HospitalName : args[5],
                                Policyno : args[6],
                                InsurerName : args[7],
                                BeneficiaryId : " ",
                                BeneficiaryName : " ",
                                Beneficiarynotified : "No",
                                InsurerVerified : "No",
                                Claimstatus : "No",
                                FuneralHomeNotify : "No",
                                FuneralHome : " ",
                                CertRequested : "No",
                                CertProvided : "No",
                                BeneficiaryContactNo : " ",
                                BeneficiaryEmail : " ",
                                FHDirectorName : " ",
                                FuneralDate : " ",
                                TransactionTime: txtime,
                                TransactionId: txid,
                                ClaimStatusComment: " ",
                                TransacitonMessage:args[8],
                        }

        patientAsBytes, _ := json.Marshal(patient)
        err := APIstub.PutState(args[0], patientAsBytes)
        if err != nil {
                return shim.Error(fmt.Sprintf("Failed to record tuna catch: %s", args[0]))
        }

        return shim.Success(patientAsBytes)
}


/*
 * The getPatientRecord method *
Used to view the records of one particular Patient
It takes one argument -- the key for the Patient in question
 */
func (s *SmartContract) getPatientRecord(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

        if len(args) != 1 {
                return shim.Error("Incorrect number of arguments. Expecting 1")
        }

        patientAsBytes, _ := APIstub.GetState(args[0])
        if patientAsBytes == nil {
                return shim.Error("Could not locate any patient")
        }
        return shim.Success(patientAsBytes)
}


/*
 * The getAllPatientRecord method *
allows for assessing all the records added to the ledger(all Patient)
This method does not take any arguments. Returns JSON string containing results.
 */
func (s *SmartContract) getAllPatientRecord(APIstub shim.ChaincodeStubInterface) sc.Response {

        startKey := "0"
        endKey := "99999"

        resultsIterator, err := APIstub.GetStateByRange(startKey, endKey)
        if err != nil {
                return shim.Error(err.Error())
        }
        defer resultsIterator.Close()

        // buffer is a JSON array containing QueryResults
        var buffer bytes.Buffer
        buffer.WriteString("[")

        bArrayPatientAlreadyWritten := false
        for resultsIterator.HasNext() {
                queryResponse, err := resultsIterator.Next()
                if err != nil {
                        return shim.Error(err.Error())
                }
                // Add comma before array patients,suppress it for the first array patient
                if bArrayPatientAlreadyWritten == true {
                        buffer.WriteString(",")
                }
                buffer.WriteString("{\"Key\":")
                buffer.WriteString("\"")
                buffer.WriteString(queryResponse.Key)
                buffer.WriteString("\"")

                buffer.WriteString(", \"Record\":")
                // Record is a JSON object, so we write as-is
                buffer.WriteString(string(queryResponse.Value))
                buffer.WriteString("}")
                bArrayPatientAlreadyWritten = true
        }
        buffer.WriteString("]")

        fmt.Printf("- getAllPatientRecord:\n%s\n", buffer.String())

        return shim.Success(buffer.Bytes())
}



/*
 * The verifyandNotifyBeneficiary method *
The data in the world state can be updated with who has possession.
*/

func (s *SmartContract) verifyandNotifyBeneficiary(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

        if len(args) != 6 {
                return shim.Error("Incorrect number of arguments. Expecting 6")
        }


        patientAsBytes, _ := APIstub.GetState(args[0])
        if patientAsBytes == nil {
                return shim.Error("Could not locate item")
        }

        patient := Patient{}

        json.Unmarshal(patientAsBytes, &patient)

        // Normally check that the specified argument is a valid holder of tuna
        // we are skipping this check for this example

        var txid string
        txid = APIstub.GetTxID()

        var txtime string
        txntmsp,errN := APIstub.GetTxTimestamp()
        if errN != nil {
        }

        txtime = time.Unix(txntmsp.Seconds, int64(txntmsp.Nanos)).String()

        // updates patient points earned details

        patient.BeneficiaryId = args[1]
        patient.BeneficiaryName = args[2]
        patient.BeneficiaryContactNo = args[3]
        patient.BeneficiaryEmail = args[4]
        patient.TransacitonMessage = args[5]
        patient.Beneficiarynotified = "YES"
        patient.InsurerVerified = "YES"
        patient.TransactionTime = txtime
        patient.TransactionId = txid

        patientAsBytes, _ = json.Marshal(patient)
        err := APIstub.PutState(args[0], patientAsBytes)
        if err != nil {
                return shim.Error(fmt.Sprintf("Failed to change item status: %s", args[0]))
        }

        return shim.Success(patientAsBytes)
}


/*
 * The funeralHomeUpdateByBeneficiary method *
The data in the world state can be updated with who has possession.
*/

func (s *SmartContract) funeralHomeUpdateByBeneficiary(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

        if len(args) != 3 {
                return shim.Error("Incorrect number of arguments. Expecting 3")
        }


        patientAsBytes, _ := APIstub.GetState(args[0])
        if patientAsBytes == nil {
                return shim.Error("Could not locate item")
        }

        patient := Patient{}

        json.Unmarshal(patientAsBytes, &patient)
        // Normally check that the specified argument is a valid holder of tuna
        // we are skipping this check for this example

        var txid string
        txid = APIstub.GetTxID()


        var txtime string
        txntmsp,errN := APIstub.GetTxTimestamp()
        if errN != nil {
               txtime = time.Unix(txntmsp.Seconds, int64(txntmsp.Nanos)).String()
        }

        txtime = time.Unix(txntmsp.Seconds, int64(txntmsp.Nanos)).String()

        patient.FuneralHome = args[1]
        patient.TransacitonMessage = args[2]
        patient.FuneralHomeNotify = "YES"
        patient.TransactionTime = txtime
        patient.TransactionId = txid

        patientAsBytes, _ = json.Marshal(patient)
        errN = APIstub.PutState(args[0], patientAsBytes)
        if errN != nil {
                return shim.Error(fmt.Sprintf("Failed to change item status: %s", args[0]))
        }

        return shim.Success(patientAsBytes)
}


// requestCertificate particular patient

func (s *SmartContract) requestCertificate(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {


        if len(args) != 4 {
                return shim.Error("Incorrect number of arguments. Expecting 4")
        }


        patientAsBytes, _ := APIstub.GetState(args[0])
        if patientAsBytes == nil {
                return shim.Error("Could not locate item")
        }

        patient := Patient{}

        json.Unmarshal(patientAsBytes, &patient)
        // Normally check that the specified argument is a valid holder of tuna
        // we are skipping this check for this example
        var txid string
        txid = APIstub.GetTxID()

        var txtime string
        txntmsp,errN := APIstub.GetTxTimestamp()
        if errN != nil {
               txtime = time.Unix(txntmsp.Seconds, int64(txntmsp.Nanos)).String()
        }

        txtime = time.Unix(txntmsp.Seconds, int64(txntmsp.Nanos)).String()

        patient.FuneralDate = args[1]
        patient.FHDirectorName = args[2]
        patient.TransacitonMessage = args[3]
        patient.CertRequested = "YES"
        patient.TransactionTime = txtime
        patient.TransactionId = txid


        patientAsBytes, _ = json.Marshal(patient)
        errN = APIstub.PutState(args[0], patientAsBytes)
        if errN != nil {
                return shim.Error(fmt.Sprintf("Failed to change item status: %s", args[0]))
        }

        return shim.Success(patientAsBytes)
}

// provideCertificate particular patient

func (s *SmartContract) provideCertificate(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {


        if len(args) != 2 {
                return shim.Error("Incorrect number of arguments. Expecting 2")
        }


        patientAsBytes, _ := APIstub.GetState(args[0])
        if patientAsBytes == nil {
                return shim.Error("Could not locate item")
        }

        patient := Patient{}

        json.Unmarshal(patientAsBytes, &patient)
        // Normally check that the specified argument is a valid holder of tuna
        // we are skipping this check for this example
        var txid string
        txid = APIstub.GetTxID()

        var txtime string
        txntmsp,errN := APIstub.GetTxTimestamp()
        if errN != nil {
               txtime = time.Unix(txntmsp.Seconds, int64(txntmsp.Nanos)).String()
        }

        txtime = time.Unix(txntmsp.Seconds, int64(txntmsp.Nanos)).String()

        patient.CertProvided = "YES"
        patient.TransactionTime = txtime
        patient.TransactionId = txid
        patient.TransacitonMessage = args[1]


        patientAsBytes, _ = json.Marshal(patient)
        errN = APIstub.PutState(args[0], patientAsBytes)
        if errN != nil {
                return shim.Error(fmt.Sprintf("Failed to change item status: %s", args[0]))
        }

        return shim.Success(patientAsBytes)

}

// initiateClamination particular patient

func (s *SmartContract) initiateClamination(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {


        if len(args) != 4 {
                return shim.Error("Incorrect number of arguments. Expecting 4")
        }


        patientAsBytes, _ := APIstub.GetState(args[0])
        if patientAsBytes == nil {
                return shim.Error("Could not locate item")
        }

        patient := Patient{}

        json.Unmarshal(patientAsBytes, &patient)
        // Normally check that the specified argument is a valid holder of tuna
        // we are skipping this check for this example

        var txid string
        txid = APIstub.GetTxID()

        var txtime string
        txntmsp,errN := APIstub.GetTxTimestamp()
        if errN != nil {
               txtime = time.Unix(txntmsp.Seconds, int64(txntmsp.Nanos)).String()
        }

        txtime = time.Unix(txntmsp.Seconds, int64(txntmsp.Nanos)).String()

        patient.Claimstatus = args[1]
        patient.ClaimStatusComment = args[2]
        patient.TransacitonMessage = args[3]
        patient.TransactionTime = txtime
        patient.TransactionId = txid


        patientAsBytes, _ = json.Marshal(patient)
        errN = APIstub.PutState(args[0], patientAsBytes)
        if errN != nil {
                return shim.Error(fmt.Sprintf("Failed to change item status: %s", args[0]))
        }

        return shim.Success(patientAsBytes)

}


// get transaction hisory of particular key

func (s *SmartContract) getPatientHistory(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {


                if len(args) != 1 {
                        return shim.Error("Incorrect number of arguments. Expecting 1")
                }

                type AuditHistory struct {
                        TxId    string   `json:"txId"`
                        Value   Patient   `json:"value"`
                }

                var history []AuditHistory;
                var patient Patient

                patientId := args[0]
                fmt.Printf("- start getHistoryForpatient: %s\n", patientId)

                // Get History
                resultsIterator, err := APIstub.GetHistoryForKey(patientId)
                if err != nil {
                        return shim.Error(err.Error())
                }
                defer resultsIterator.Close()

                for resultsIterator.HasNext() {
                        historyData, err := resultsIterator.Next()
                        if err != nil {
                                return shim.Error(err.Error())
                        }

                        var tx AuditHistory
                        tx.TxId = historyData.TxId                     //copy transaction id over
                        json.Unmarshal(historyData.Value, &patient)     //un stringify it aka JSON.parse()
                        if historyData.Value == nil {                  //patient has been deleted
                                var emptyPatient Patient
                                tx.Value = emptyPatient                 //copy nil patient
                        } else {
                                json.Unmarshal(historyData.Value, &patient) //un stringify it aka JSON.parse()
                                tx.Value = patient                      //copy marble over
                        }
                        history = append(history, tx)              //add this tx to the list
                }
                fmt.Printf("- getHistoryForPatient returning:\n%s", history)

                //change to array of bytes
                historyAsBytes, _ := json.Marshal(history)     //convert to array of bytes
                return shim.Success(historyAsBytes)
}



/*
 * main function *
calls the Start function
The main function starts the chaincode in the container during instantiation.
 */
func main() {

        // Create a new Smart Contract
        err := shim.Start(new(SmartContract))
        if err != nil {
                fmt.Printf("Error creating new Smart Contract: %s", err)
        }
}
