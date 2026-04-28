import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

// ─────────────────────────────────────────────────────────────────────────────
// Poin 3: TOTAL_LANGKAH = 4  (langkah 4 = halaman ringkasan)
// ─────────────────────────────────────────────────────────────────────────────
const TOTAL_LANGKAH = 4;

// ── Input didefinisikan di LUAR komponen agar tidak di-remount setiap render
//    (jika di dalam, React menganggap komponen baru → keyboard menutup)
const Input = ({ label, field, form, errors, updateForm, ...props }) => (
  <View style={{ marginBottom: 4 }}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, errors[field] && styles.inputError]}
      value={form[field]}
      onChangeText={val => updateForm(field, val)}
      placeholderTextColor="#AAA"
      {...props}
    />
    {errors[field] && (
      <Text style={styles.errorTeks}>{errors[field]}</Text>
    )}
  </View>
);

// ── DateInput: auto-format DD/MM/YYYY saat mengetik ─────────────────────────
const formatTanggal = (text) => {
  // Hapus semua karakter selain angka
  const digits = text.replace(/\D/g, '');
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return digits.slice(0, 2) + '/' + digits.slice(2);
  return digits.slice(0, 2) + '/' + digits.slice(2, 4) + '/' + digits.slice(4, 8);
};

const DateInput = ({ label, field, form, errors, updateForm }) => {
  const handleChange = (text) => {
    // Jika user menghapus (backspace), biarkan apa adanya
    const prev = form[field];
    // Jika teks baru lebih pendek dan diakhiri '/', hapus juga angka sebelumnya
    let raw = text;
    if (text.length < prev.length && prev.endsWith('/')) {
      raw = text.slice(0, -1);
    }
    updateForm(field, formatTanggal(raw));
  };

  return (
    <View style={{ marginBottom: 4 }}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          errors[field] && styles.inputError,
        ]}
      >
        <TextInput
          style={styles.inputDalamWrapper}
          value={form[field]}
          onChangeText={handleChange}
          placeholder="DD/MM/YYYY"
          placeholderTextColor="#AAA"
          keyboardType="numeric"
          maxLength={10}
        />
        <Text style={styles.ikonKalender}>📅</Text>
      </View>
      {errors[field] && (
        <Text style={styles.errorTeks}>{errors[field]}</Text>
      )}
    </View>
  );
};


// ── ProgressBar didefinisikan di LUAR agar tidak di-remount ─────────────────
const ProgressBar = ({ langkah, total }) => (
  <View style={styles.progressContainer}>
    {Array.from({ length: total }, (_, i) => i + 1).map(i => (
      <View key={i} style={styles.progressWrapper}>
        <View
          style={[
            styles.progressLingkaran,
            i <= langkah && styles.progressAktif,
          ]}
        >
          <Text
            style={[
              styles.progressAngka,
              i <= langkah && styles.progressAngkaAktif,
            ]}
          >
            {i}
          </Text>
        </View>
        {i < total && (
          <View
            style={[
              styles.progressGaris,
              i < langkah && styles.progressGarisAktif,
            ]}
          />
        )}
      </View>
    ))}
  </View>
);

// ─────────────────────────────────────────────────────────────────────────────
export default function FormRegistrasiWizard() {
  const [langkah, setLangkah] = useState(1);

  // ── Poin 2: State opacity untuk animasi fade antar langkah ───────────────
  const [opacity, setOpacity] = useState(1);

  const [form, setForm] = useState({
    // Langkah 1: Data Diri
    nama: '',
    tglLahir: '',
    jenisKelamin: '',
    // Langkah 2: Akun
    email: '',
    password: '',
    konfirmasi: '',
    // Langkah 3: Kontak
    noHp: '',
    alamat: '',
    kota: '',
  });
  const [errors, setErrors] = useState({});

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  // ── Poin 2: Fungsi animasi fade — opacity 0 → ganti langkah → opacity 1 ──
  const animasiGantiLangkah = (fn) => {
    setOpacity(0);
    setTimeout(() => {
      fn();
      setOpacity(1);
    }, 180);
  };

  // ── Validasi per langkah ─────────────────────────────────────────────────
  const validasiLangkah = (step) => {
    const err = {};
    if (step === 1) {
      if (!form.nama.trim()) err.nama = 'Nama tidak boleh kosong';
      // Validasi format DD/MM/YYYY dan kelengkapan tanggal
      if (!form.tglLahir) {
        err.tglLahir = 'Tanggal lahir wajib diisi';
      } else if (form.tglLahir.length < 10) {
        err.tglLahir = 'Tanggal belum lengkap (DD/MM/YYYY)';
      } else {
        const [d, m, y] = form.tglLahir.split('/').map(Number);
        const tgl = new Date(y, m - 1, d);
        const valid =
          tgl.getFullYear() === y &&
          tgl.getMonth() === m - 1 &&
          tgl.getDate() === d &&
          y >= 1900 &&
          y <= new Date().getFullYear();
        if (!valid) err.tglLahir = 'Tanggal tidak valid';
      }
    }
    if (step === 2) {
      if (!form.email) err.email = 'Email tidak boleh kosong';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        err.email = 'Format email tidak valid';
      if (form.password.length < 8)
        err.password = 'Password minimal 8 karakter';
      if (form.password !== form.konfirmasi)
        err.konfirmasi = 'Password tidak cocok';
    }
    if (step === 3) {
      if (!form.noHp) err.noHp = 'Nomor HP tidak boleh kosong';
      if (!form.alamat) err.alamat = 'Alamat tidak boleh kosong';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleLanjut = () => {
    if (validasiLangkah(langkah)) {
      animasiGantiLangkah(() => setLangkah(prev => prev + 1));
    }
  };

  const handleKembali = () => {
    animasiGantiLangkah(() => setLangkah(prev => prev - 1));
  };

  const handleSubmit = () => {
    console.log('Data form:', form);
    // Kirim ke API di pertemuan berikutnya
    Alert.alert('Berhasil! 🎉', `Akun berhasil dibuat.\nSelamat datang, ${form.nama}!`);
  };

  const judulLangkah = {
    1: 'Data Diri',
    2: 'Akun',
    3: 'Kontak',
    4: 'Konfirmasi',
  };

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.judul}>Registrasi Akun</Text>
      <ProgressBar langkah={langkah} total={TOTAL_LANGKAH} />
      <Text style={styles.subjudul}>
        Langkah {langkah} dari {TOTAL_LANGKAH}:{' '}
        <Text style={{ fontWeight: 'bold', color: '#1F4E79' }}>
          {judulLangkah[langkah]}
        </Text>
      </Text>

      {/* ── Poin 2: key={langkah} memaksa re-render saat langkah berubah,
           dikombinasikan dengan opacity untuk efek fade ───────────────── */}
      <View key={langkah} style={{ opacity }}>

        {/* Langkah 1 — Data Diri */}
        {langkah === 1 && (
          <View>
            <Input
              label="Nama Lengkap"
              field="nama"
              form={form}
              errors={errors}
              updateForm={updateForm}
              placeholder="Nama sesuai KTP"
              autoCapitalize="words"
            />
            <DateInput
              label="Tanggal Lahir"
              field="tglLahir"
              form={form}
              errors={errors}
              updateForm={updateForm}
            />
            <Input
              label="Jenis Kelamin"
              field="jenisKelamin"
              form={form}
              errors={errors}
              updateForm={updateForm}
              placeholder="Laki-laki / Perempuan"
            />
          </View>
        )}

        {/* Langkah 2 — Akun */}
        {langkah === 2 && (
          <View>
            <Input
              label="Email"
              field="email"
              form={form}
              errors={errors}
              updateForm={updateForm}
              placeholder="nama@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Password"
              field="password"
              form={form}
              errors={errors}
              updateForm={updateForm}
              placeholder="Min. 8 karakter"
              secureTextEntry
            />
            <Input
              label="Konfirmasi Password"
              field="konfirmasi"
              form={form}
              errors={errors}
              updateForm={updateForm}
              placeholder="Ulangi password"
              secureTextEntry
            />
          </View>
        )}

        {/* Langkah 3 — Kontak */}
        {langkah === 3 && (
          <View>
            <Input
              label="Nomor HP"
              field="noHp"
              form={form}
              errors={errors}
              updateForm={updateForm}
              placeholder="08xxxxxxxxxx"
              keyboardType="phone-pad"
            />
            <Input
              label="Alamat"
              field="alamat"
              form={form}
              errors={errors}
              updateForm={updateForm}
              placeholder="Jalan, nomor, RT/RW"
            />
            <Input
              label="Kota"
              field="kota"
              form={form}
              errors={errors}
              updateForm={updateForm}
              placeholder="Nama kota"
            />
          </View>
        )}

        {/* ── Poin 3: Langkah 4 — Halaman Ringkasan sebelum submit ──────── */}
        {langkah === 4 && (
          <View style={styles.ringkasan}>
            <Text style={styles.ringkasanJudul}>Konfirmasi Data</Text>
            <Text style={styles.ringkasanSub}>
              Pastikan data berikut sudah benar sebelum mendaftar.
            </Text>
            {Object.entries({
              Nama: form.nama,
              Email: form.email,
              'Tgl. Lahir': form.tglLahir,
              'Jenis Kelamin': form.jenisKelamin,
              'No. HP': form.noHp,
              Alamat: form.alamat,
              Kota: form.kota,
            }).map(([key, val]) => (
              <View key={key} style={styles.ringkasanBaris}>
                <Text style={styles.ringkasanLabel}>{key}</Text>
                <Text style={styles.ringkasanNilai}>{val || '-'}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Tombol Navigasi Antar Langkah */}
      <View style={styles.tombolWrapper}>
        {langkah > 1 && (
          <TouchableOpacity
            style={styles.tombolKembali}
            onPress={handleKembali}
          >
            <Text style={styles.tombolKembaliTeks}>← Kembali</Text>
          </TouchableOpacity>
        )}
        {langkah < TOTAL_LANGKAH ? (
          <TouchableOpacity
            style={styles.tombolLanjut}
            onPress={handleLanjut}
          >
            <Text style={styles.tombolLanjutTeks}>Lanjut →</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.tombolSubmit}
            onPress={handleSubmit}
          >
            <Text style={styles.tombolSubmitTeks}>✅ Daftar Sekarang</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  judul: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F4E79',
    marginBottom: 16,
    marginTop: 8,
  },
  subjudul: {
    fontSize: 15,
    color: '#666',
    marginBottom: 20,
  },
  // ── Progress Bar ──────────────────────────────────────────────────────────
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  progressLingkaran: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  progressAktif: {
    borderColor: '#1F4E79',
    backgroundColor: '#1F4E79',
  },
  progressAngka: {
    fontWeight: 'bold',
    color: '#CCC',
    fontSize: 13,
  },
  progressAngkaAktif: {
    color: '#FFF',
  },
  progressGaris: {
    flex: 1,
    height: 2,
    backgroundColor: '#CCC',
  },
  progressGarisAktif: {
    backgroundColor: '#1F4E79',
  },
  // ── Input ─────────────────────────────────────────────────────────────────
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    color: '#333',
  },
  inputError: {
    borderColor: '#D32F2F',
    borderWidth: 2,
  },
  errorTeks: {
    color: '#D32F2F',
    fontSize: 12,
    marginTop: 4,
  },
  // ── DateInput wrapper ─────────────────────────────────────────────────────
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 14,
  },
  inputDalamWrapper: {
    flex: 1,
    paddingVertical: 11,
    fontSize: 15,
    color: '#333',
  },
  ikonKalender: {
    fontSize: 18,
    paddingLeft: 6,
  },
  // ── Poin 3: Ringkasan ─────────────────────────────────────────────────────
  ringkasan: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    marginTop: 4,
  },
  ringkasanJudul: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F4E79',
    marginBottom: 4,
  },
  ringkasanSub: {
    fontSize: 12,
    color: '#888',
    marginBottom: 14,
  },
  ringkasanBaris: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  ringkasanLabel: {
    fontSize: 13,
    color: '#888',
    flex: 1,
  },
  ringkasanNilai: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    flex: 2,
    textAlign: 'right',
  },
  // ── Tombol Navigasi ───────────────────────────────────────────────────────
  tombolWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    marginBottom: 40,
    gap: 12,
  },
  tombolKembali: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#2E75B6',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  tombolKembaliTeks: {
    color: '#2E75B6',
    fontWeight: 'bold',
    fontSize: 15,
  },
  tombolLanjut: {
    flex: 1,
    backgroundColor: '#2E75B6',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  tombolLanjutTeks: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  tombolSubmit: {
    flex: 1,
    backgroundColor: '#1F4E79',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  tombolSubmitTeks: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
