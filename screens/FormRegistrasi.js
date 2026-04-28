import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// ── Pindahkan InputField ke LUAR komponen agar tidak di-remount setiap render
// (jika didefinisikan di dalam, React menganggapnya komponen baru setiap kali
//  state berubah → unmount → keyboard menutup)
const InputField = ({
  label,
  field,
  inputRef,
  nextRef,
  isLast,
  errors,
  touched,
  formValue,
  onChangeText,
  onBlur,
  ...props
}) => (
  <View style={styles.fieldWrapper}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      ref={inputRef}
      style={[
        styles.input,
        errors[field] && touched[field] && styles.inputError,
      ]}
      value={formValue}
      onChangeText={onChangeText}
      onBlur={onBlur}
      // ── Poin 4: returnKeyType & onSubmitEditing ──────────────────────────
      returnKeyType={isLast ? 'done' : 'next'}
      onSubmitEditing={() => {
        if (nextRef && nextRef.current) nextRef.current.focus();
      }}
      blurOnSubmit={!!isLast}
      // ────────────────────────────────────────────────────────────────────
      {...props}
    />
    {errors[field] && touched[field] && (
      <Text style={styles.errorTeks}>{errors[field]}</Text>
    )}
  </View>
);

export default function FormRegistrasi() {
  const [form, setForm] = useState({
    nama: '',
    email: '',
    password: '',
    konfirmasi: '',
    noHp: '',
  });
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});

  // ── Poin 4: useRef untuk navigasi fokus antar input ─────────────────────
  const refEmail      = useRef(null);
  const refPassword   = useRef(null);
  const refKonfirmasi = useRef(null);
  const refNoHp       = useRef(null);
  // ─────────────────────────────────────────────────────────────────────────

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Hapus error saat user mulai mengetik ulang
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  // Tandai field sudah disentuh saat onBlur
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, form[field]);
  };

  // Validasi satu field
  const validateField = (field, value) => {
    let pesan = '';
    switch (field) {
      case 'nama':
        if (!value.trim()) pesan = 'Nama tidak boleh kosong';
        else if (value.trim().length < 3) pesan = 'Nama minimal 3 karakter';
        break;
      case 'email':
        if (!value) pesan = 'Email tidak boleh kosong';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          pesan = 'Format email tidak valid';
        break;
      case 'password':
        if (!value) pesan = 'Password tidak boleh kosong';
        else if (value.length < 8) pesan = 'Password minimal 8 karakter';
        else if (!/[A-Z]/.test(value)) pesan = 'Password harus mengandung huruf kapital';
        else if (!/[0-9]/.test(value)) pesan = 'Password harus mengandung angka';
        break;
      case 'konfirmasi':
        if (!value) pesan = 'Konfirmasi password tidak boleh kosong';
        else if (value !== form.password) pesan = 'Password tidak cocok';
        break;
      case 'noHp':
        if (!value) pesan = 'Nomor HP tidak boleh kosong';
        else if (!/^08[0-9]{8,11}$/.test(value))
          pesan = 'Format: 08xxxxxxxxxx (10-13 digit)';
        break;
    }
    setErrors(prev => ({ ...prev, [field]: pesan }));
    return pesan === '';
  };

  // Validasi semua field saat submit
  const validateAll = () => {
    const fields = ['nama', 'email', 'password', 'konfirmasi', 'noHp'];
    let valid = true;
    fields.forEach(field => {
      if (!validateField(field, form[field])) valid = false;
    });
    return valid;
  };

  const handleSubmit = () => {
    // Tandai semua field sebagai touched agar error tampil
    setTouched({ nama: true, email: true, password: true, konfirmasi: true, noHp: true });
    if (!validateAll()) return;
    Alert.alert('Berhasil', `Registrasi berhasil!\nSelamat datang, ${form.nama}!`);
  };

  // ── Poin 5: Hitung kekuatan password ────────────────────────────────────
  const hitungKekuatan = (pass) => {
    let skor = 0;
    if (pass.length >= 8)            skor++;
    if (/[A-Z]/.test(pass))         skor++;
    if (/[0-9]/.test(pass))         skor++;
    if (/[^A-Za-z0-9]/.test(pass))  skor++;
    return skor; // 0–4
  };
  const kekuatan      = hitungKekuatan(form.password);
  const labelKekuatan = ['', 'Lemah', 'Cukup', 'Kuat', 'Sangat Kuat'][kekuatan];
  const warnaKekuatan = ['', '#D32F2F', '#F57C00', '#388E3C', '#1B5E20'][kekuatan];
  // ─────────────────────────────────────────────────────────────────────────

  return (
    // ── Poin 3: KeyboardAvoidingView ─────────────────────────────────────
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps='handled'
      >
        <Text style={styles.judul}>Buat Akun Baru</Text>

        {/* ── Poin 4: setiap input dihubungkan dengan ref & nextRef ──── */}
        <InputField
          label='Nama Lengkap'
          field='nama'
          nextRef={refEmail}
          placeholder='Nama lengkap Anda'
          autoCapitalize='words'
          errors={errors}
          touched={touched}
          formValue={form.nama}
          onChangeText={(val) => updateForm('nama', val)}
          onBlur={() => handleBlur('nama')}
        />
        <InputField
          label='Email'
          field='email'
          inputRef={refEmail}
          nextRef={refPassword}
          placeholder='nama@email.com'
          keyboardType='email-address'
          autoCapitalize='none'
          errors={errors}
          touched={touched}
          formValue={form.email}
          onChangeText={(val) => updateForm('email', val)}
          onBlur={() => handleBlur('email')}
        />
        <InputField
          label='Password'
          field='password'
          inputRef={refPassword}
          nextRef={refKonfirmasi}
          placeholder='Min. 8 karakter, ada kapital & angka'
          secureTextEntry
          errors={errors}
          touched={touched}
          formValue={form.password}
          onChangeText={(val) => updateForm('password', val)}
          onBlur={() => handleBlur('password')}
        />

        {/* ── Poin 5: Indikator kekuatan password ─────────────────────── */}
        {form.password.length > 0 && (
          <View style={{ flexDirection: 'row', gap: 4, marginTop: 6 }}>
            {[1, 2, 3, 4].map((i) => (
              <View
                key={i}
                style={{
                  flex: 1,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: i <= kekuatan ? warnaKekuatan : '#DDD',
                }}
              />
            ))}
          </View>
        )}
        {form.password.length > 0 && (
          <Text style={{ color: warnaKekuatan, fontSize: 12, marginTop: 4 }}>
            {labelKekuatan}
          </Text>
        )}
        {/* ──────────────────────────────────────────────────────────────── */}

        <InputField
          label='Konfirmasi Password'
          field='konfirmasi'
          inputRef={refKonfirmasi}
          nextRef={refNoHp}
          placeholder='Ulangi password'
          secureTextEntry
          errors={errors}
          touched={touched}
          formValue={form.konfirmasi}
          onChangeText={(val) => updateForm('konfirmasi', val)}
          onBlur={() => handleBlur('konfirmasi')}
        />
        <InputField
          label='Nomor HP'
          field='noHp'
          inputRef={refNoHp}
          isLast
          placeholder='08xxxxxxxxxx'
          keyboardType='phone-pad'
          errors={errors}
          touched={touched}
          formValue={form.noHp}
          onChangeText={(val) => updateForm('noHp', val)}
          onBlur={() => handleBlur('noHp')}
        />

        <TouchableOpacity style={styles.tombol} onPress={handleSubmit}>
          <Text style={styles.tombolTeks}>Daftar Sekarang</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
    // ─────────────────────────────────────────────────────────────────────
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  judul:        { fontSize: 24, fontWeight: 'bold', color: '#1F4E79', marginBottom: 24 },
  fieldWrapper: { marginBottom: 4 },
  label:        { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 6 },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
  },
  inputError:  { borderColor: '#D32F2F', borderWidth: 2 },
  errorTeks:   { color: '#D32F2F', fontSize: 12, marginTop: 4 },
  tombol: {
    backgroundColor: '#1F4E79',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  tombolTeks: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
