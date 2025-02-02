// import { StyleSheet } from 'react-native';
// import { Text, View } from '../../components/Themed';

// export default function NewPostScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>New Posts</Text>
      
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const candidateRequirementForm = ({recruiter_id}) => {
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [experience, setExperience] = useState('');
  const [ctc, setCtc] = useState('');
  const [location, setLocation] = useState('');
  const [noticePeriod, setNoticePeriod] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    { label: 'Manager', value: 'Manager' },
    { label: 'Event Coordinator', value: 'Event Coordinator' },
    { label: 'Hospitality Manager', value: 'Hospitality Manager' },
  ];

  const handleSubmit = async () => {
    if (!role || !experience || ctc) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postName: 'whislisht update ' })
  };

  
      try {
          await fetch(
              'https://bids-api-945018261442.us-central1.run.app', requestOptions)
              .then(response => {
                  response.json()
                      .then(data => {
                          console.log("Post created at : ", 
                          data.createdAt);
                      });
              })
      }
      catch (error) {
          console.error(error);
      }
    

    // Handle form submission (e.g., send data to an API)
    const postData = {
      role,
      experience,
      ctc,
      location,
      noticePeriod,
      message,
      recruiter_id
    };

    console.log('Post Data:', postData);

    // Reset form fields
    setRole('');
    setExperience('');
    setCtc('');
    setLocation('');
    setNoticePeriod('');
    setMessage('');

    Alert.alert('Success', 'Your post has been submitted!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text value={recruiter_id}>{recruiter_id}</Text>
      <Text style={styles.label}>Role*</Text>
      <RNPickerSelect
        onValueChange={(role) => setSelectedRole(role)}
        items={roles}
        placeholder={{ label: 'Select a Role...', value: null }}
        value={selectedRole}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Role"
        value={role}
        onChangeText={setRole}
        placeholderTextColor="#999"
      /> */}

      <Text style={styles.label}>Experience*</Text>
      <TextInput
        style={styles.input}
        placeholder="5+ years"
        value={experience}
        onChangeText={setExperience}
        placeholderTextColor="#999"

      />
      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Dubai"
        value={location}
        onChangeText={setLocation}
        placeholderTextColor="#999"
      />
      <Text style={styles.label}>CTC*</Text>
      <TextInput
        style={styles.input}
        placeholder="AED 150,000/year"
        value={ctc}
        onChangeText={setCtc}
        placeholderTextColor="#999"
      />
      <Text style={styles.label}>Notice Period</Text>
      <TextInput
        style={styles.input}
        placeholder="60 days"
        value={noticePeriod}
        onChangeText={setNoticePeriod}
        placeholderTextColor="#999"
      />
      <Text style={styles.label}>Additional Requirements</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Conversational & Intuitive
"
        value={message}
        onChangeText={setMessage}
        placeholderTextColor="#999"
        multiline
        numberOfLines={4}
      />

      <Button title="Post Requirement " onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
    color: '#000',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
      marginBottom: 16,
      
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'gray',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
      marginBottom: 16,
    
    },
    placeholder: {
        color: '#999', // Custom placeholder color
      },
  });

export default candidateRequirementForm;
