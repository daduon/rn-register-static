import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable
} from "react-native";
import auth from './json/auth.json';
 
export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalFail, setModalFail] = useState(false);
  
  function register(){
    var emailValid = false;
    var passwordValid = false;

    if(email.length == 0){
        setEmailError("Email is required");
    }        
    else if(email.length < 6){
        setEmailError("Email should be minimum 6 characters");
    }      
    else if(email.indexOf(' ') >= 0){        
        setEmailError('Email cannot contain spaces');                          
    }    
    else{
        setEmailError("")
        emailValid = true
    }
    if(password.length == 0){
        setPasswordError("Password is required");
    }        
    else if(password.length < 6){
        setPasswordError("Password should be minimum 6 characters");
    }      
    else if(password.indexOf(' ') >= 0){        
        setPasswordError('Password cannot contain spaces');                          
    }    
    else{
        setPasswordError("")
        passwordValid = true
    }   
    
    if( emailValid && passwordValid && email == auth.email && auth.password == password && password == confirm){
      setModalSuccess(true)
    }else{
      setModalFail(true)
    }   
  }
  
 
  return (
    <View style={styles.container}>
      <View>
        <Modal
          visible={modalSuccess}
          onRequestClose={() => setModalSuccess(false)}>
          <Pressable style={styles.outsideModal}
            onPress={(event) => { if (event.target == event.currentTarget) { setModalSuccess(false); } }} >
            <View style={styles.modal}>
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderContent}>
                  <Text>Success Register</Text>
                </View>
                <TouchableOpacity onPress={() => setModalSuccess(false)}>
                  <Text style={styles.modalHeaderCloseText}>Close</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalContent}>
                <Text>Your account:</Text>
                <Text>Email: {auth.email} </Text>
                <Text>Password: {auth.password} </Text>
              </View>
            </View>
          </Pressable>
        </Modal>
        <Modal
          visible={modalFail}
          onRequestClose={() => setModalFail(false)}>
          <Pressable style={styles.outsideModal}
            onPress={(event) => { if (event.target == event.currentTarget) { setModalFail(false); } }} >
            <View style={styles.modal}>
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderContent}>
                  <Text>Fail Register</Text>
                </View>
                <TouchableOpacity onPress={() => setModalFail(false)}>
                  <Text style={styles.modalHeaderCloseText}>Close</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalContent}>
                <Text>Email or Password or confirm password has something wrong</Text>
              </View>
            </View>
          </Pressable>
        </Modal>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
      </View>
      {emailError.length > 0 &&
        <Text>{emailError}</Text>
      }
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(confirm) => setConfirm(confirm)}
        />
      </View>
      {passwordError.length > 0 &&
        <Text>{passwordError}</Text>
      }
      <TouchableOpacity onPress={register} style={styles.registerBtn}>
        <Text  style={styles.loginText}>REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "80%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  registerBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  modal: {
    flex: 1,
    margin: 50,
    padding: 5,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  /* The content of the modal takes all the vertical space not used by the header. */
  modalContent: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black"
  },
  modalHeader: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "black"
  },
  /* The header takes up all the vertical space not used by the close button. */
  modalHeaderContent: {
    flexGrow: 1,
  },
  modalHeaderCloseText: {
    textAlign: "center",
    paddingLeft: 5,
    paddingRight: 5
  },
  outsideModal: {
    backgroundColor: "rgba(1, 1, 1, 0.2)",
    flex: 1,
  }
});