import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { simpan } from "../utils/storage";

// ── Poin 2: Data akun dummy untuk simulasi login ───────────────────────────
const AKUN_DUMMY = [
  { email: "admin@test.com", password: "Admin123" },
  { email: "user@test.com", password: "User1234" },
];

// ── Komponen InputField didefinisikan di LUAR agar tidak di-remount ────────
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
      returnKeyType={isLast ? "done" : "next"}
      onSubmitEditing={() => {
        if (nextRef && nextRef.current) nextRef.current.focus();
      }}
      blurOnSubmit={!!isLast}
      {...props}
    />
    {errors[field] && touched[field] && (
      <Text style={styles.errorTeks}>{errors[field]}</Text>
    )}
  </View>
);

export default function FormLogin({ navigation }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // ── Poin 3: State untuk show/hide password ─────────────────────────────
  const [showPassword, setShowPassword] = useState(false);

  // ── Poin 4: State untuk loading saat submit ────────────────────────────
  const [isLoading, setLoading] = useState(false);

  const refPassword = useRef(null);

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, form[field]);
  };

  const validateField = (field, value) => {
    let pesan = "";
    switch (field) {
      case "email":
        if (!value) pesan = "Email tidak boleh kosong";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          pesan = "Format email tidak valid";
        break;
      case "password":
        if (!value) pesan = "Password tidak boleh kosong";
        else if (value.length < 6) pesan = "Password minimal 6 karakter";
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: pesan }));
    return pesan === "";
  };

  const validateAll = () => {
    const fields = ["email", "password"];
    let valid = true;
    fields.forEach((field) => {
      if (!validateField(field, form[field])) valid = false;
    });
    return valid;
  };

  // ── Poin 2 + 4: handleLogin dengan loading dan pengecekan akun dummy ────
  const handleLogin = async () => {
    setTouched({ email: true, password: true });
    if (!validateAll()) return;

    // Poin 4: Aktifkan loading dan simulasi delay jaringan 1.5 detik
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);

    // Poin 2: Cek akun dummy
    const akun = AKUN_DUMMY.find(
      (a) => a.email === form.email && a.password === form.password,
    );

    if (akun) {
      // Simpan session login agar tidak perlu login ulang
      await simpan("@session_login", { email: form.email });
      
      // Berhasil login — navigasi ke halaman utama
      // Catatan: navigation.replace() agar user tidak bisa kembali ke login
      navigation.replace("MainApp", { email: form.email });
    } else {
      setErrors({ submit: "Email atau password salah" });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>🎓</Text>
          <Text style={styles.judul}>Selamat Datang</Text>
          <Text style={styles.subjudul}>Masuk ke Aplikasi Mahasiswa</Text>
        </View>

        {/* Form */}
        <View style={styles.formKartu}>
          {/* Error submit */}
          {errors.submit ? (
            <View style={styles.alertError}>
              <Text style={styles.alertErrorTeks}>⚠️ {errors.submit}</Text>
            </View>
          ) : null}

          {/* Input Email */}
          <InputField
            label="Email"
            field="email"
            nextRef={refPassword}
            placeholder="nama@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            errors={errors}
            touched={touched}
            formValue={form.email}
            onChangeText={(val) => updateForm("email", val)}
            onBlur={() => handleBlur("email")}
          />

          {/* ── Poin 3: Input Password dengan tombol Show/Hide ──────────── */}
          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Password</Text>
            <View
              style={[
                styles.inputWrapper,
                errors.password && touched.password && styles.inputWrapperError,
              ]}
            >
              <TextInput
                ref={refPassword}
                style={styles.inputDalamWrapper}
                value={form.password}
                onChangeText={(val) => updateForm("password", val)}
                onBlur={() => handleBlur("password")}
                secureTextEntry={!showPassword}
                placeholder="Password"
                placeholderTextColor="#AAA"
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                blurOnSubmit={false}
              />
              <TouchableOpacity
                style={styles.ikonMata}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.ikonMataTeks}>
                  {showPassword ? "🙈" : "👁️"}
                </Text>
              </TouchableOpacity>
            </View>
            {errors.password && touched.password && (
              <Text style={styles.errorTeks}>{errors.password}</Text>
            )}
          </View>

          {/* ── Poin 4: Tombol Login dengan Loading Indicator ───────────── */}
          <TouchableOpacity
            style={[styles.tombol, isLoading && styles.tombolDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.tombolTeks}>Masuk</Text>
            )}
          </TouchableOpacity>

          {/* Tombol Daftar — navigasi ke FormRegistrasi */}
          <View style={styles.barisFooter}>
            <Text style={styles.footerTeks}>Belum punya akun? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Registrasi")}>
              <Text style={styles.footerLink}>Daftar di sini</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Info akun demo */}
        <View style={styles.kartuDemo}>
          <Text style={styles.demoJudul}>Akun Demo</Text>
          <Text style={styles.demoTeks}>📧 admin@test.com 🔑 Admin123</Text>
          <Text style={styles.demoTeks}>📧 user@test.com 🔑 User1234</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F4E79",
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 32,
  },
  logo: {
    fontSize: 56,
    marginBottom: 12,
  },
  judul: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  subjudul: {
    fontSize: 14,
    color: "#BDD7EE",
  },
  formKartu: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  alertError: {
    backgroundColor: "#FFEBEE",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#D32F2F",
  },
  alertErrorTeks: {
    color: "#C62828",
    fontSize: 13,
    fontWeight: "500",
  },
  fieldWrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#333",
  },
  inputError: {
    borderColor: "#D32F2F",
    borderWidth: 2,
  },
  // ── Poin 3: Wrapper input password dengan tombol mata ──
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 14,
  },
  inputWrapperError: {
    borderColor: "#D32F2F",
    borderWidth: 2,
  },
  inputDalamWrapper: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: "#333",
  },
  ikonMata: {
    padding: 4,
  },
  ikonMataTeks: {
    fontSize: 18,
  },
  errorTeks: {
    color: "#D32F2F",
    fontSize: 12,
    marginTop: 4,
  },
  // ── Poin 4: Tombol login dengan state disabled ──
  tombol: {
    backgroundColor: "#1F4E79",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  tombolDisabled: {
    backgroundColor: "#7FA8C9",
  },
  tombolTeks: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  barisFooter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerTeks: {
    color: "#666",
    fontSize: 14,
  },
  footerLink: {
    color: "#1F4E79",
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  kartuDemo: {
    backgroundColor: "rgba(255,255,255,0.12)",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  demoJudul: {
    color: "#F39C12",
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 6,
  },
  demoTeks: {
    color: "#BDD7EE",
    fontSize: 12,
    marginBottom: 3,
  },
});
