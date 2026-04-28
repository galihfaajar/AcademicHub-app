import React, { useState } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native'; 
  
const AKUN_DUMMY = [ 
  { id: '1', nama: 'Admin', email: 'admin@test.com', password: 'Admin123', role: 'admin' }, 
  { id: '2', nama: 'Mahasiswa', email: 'mhs@test.com', password: 'Mhs12345', role: 'user' }, 
]; 
  
export default function HalamanLogin({ onLoginBerhasil }) { 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [isLoading, setLoading] = useState(false); 
  
  const handleLogin = async () => { 
    if (!email || !password) { 
      Alert.alert('Gagal', 'Email dan password harus diisi'); 
      return; 
    } 
  
    setLoading(true); 
    // Simulasi delay jaringan 
    await new Promise(r => setTimeout(r, 1000)); 
    setLoading(false); 
  
    const user = AKUN_DUMMY.find(u => u.email === email && u.password === password); 
  
    if (user) { 
      // Siapkan data session dengan timestamp 
      const userData = { ...user, loginAt: new Date().toISOString() }; 
      onLoginBerhasil(userData); 
    } else { 
      Alert.alert('Login Gagal', 'Email atau password salah'); 
    } 
  }; 
  
  return ( 
    <View style={styles.container}> 
      <Text style={styles.judul}>Login Sistem</Text> 
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        autoCapitalize="none" 
      /> 
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      /> 
      <TouchableOpacity style={styles.tombol} onPress={handleLogin} disabled={isLoading}> 
        {isLoading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.tombolTeks}>Masuk</Text>} 
      </TouchableOpacity> 
    </View> 
  ); 
} 
  
const styles = StyleSheet.create({ 
  container: { flex: 1, justifyContent: 'center', padding: 30, backgroundColor: '#F0F4F8' }, 
  judul:     { fontSize: 28, fontWeight: 'bold', color: '#1F4E79', marginBottom: 30, textAlign: 'center' }, 
  input:     { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 10, padding: 15, marginBottom: 15 }, 
  tombol:    { backgroundColor: '#1F4E79', borderRadius: 10, padding: 18, alignItems: 'center' }, 
  tombolTeks:{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }, 
});
