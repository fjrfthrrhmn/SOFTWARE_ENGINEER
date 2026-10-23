# Functional Requirement — FR-XX

<!-- Gunakan template ini untuk menjelaskan fitur apa yang dapat dilakukan oleh pengguna, bagaimana alurnya, data apa yang dibutuhkan, dan apa yang terjadi setelah fitur digunakan. -->
<!-- Ganti semua bagian [ ... ] dengan informasi sesuai fitur yang dibuat. -->
<!-- Gunakan bahasa sederhana dan mudah dipahami -->
<!-- Tidak perlu menuliskan hal teknis seperti kode program atau struktur database di bagian ini. -->
<!-- Buat satu file untuk satu FR. OUTPUT: docs/functional-requirements/<domain>/<ID_DOMAIN_NAME_FITUR.md> -->

> **Status:** FINAL
> **Aktor:** [Mahasiswa / Dosen / Admin]
> **Fitur:** [Nama fitur]
> **Domain:** [Absensi  / Materi / Pengguna / Jadwal ]
> **Prioritas:** [High / Medium / Low]
> **Related FR:** [FR-XX jika ada]
> **Tujuan File:** Template untuk mendokumentasikan satu Functional Requirement (FR)
> **OUTPUT:** file markdown `docs/functional-requirements/<domain>/<ID_DOMAIN_NAME_FITUR.md>`

---

# 1. Deskripsi

### Functional Requirement

**FR-XX — [Nama Fitur]**

**Deskripsi:**

> [Jelaskan secara singkat apa yang dapat dilakukan user melalui fitur ini.]

### Tujuan

[Jelaskan tujuan fitur dalam 1–2 kalimat.]

### Contoh

> Mahasiswa dapat melihat daftar tugas yang diberikan dosen pada mata kuliah yang diikuti.

---

# 2. User Flow

## 2.1 Alur Utama

Tuliskan alur dari awal sampai selesai.

```text
[User membuka fitur]
        ↓
[System menampilkan data]
        ↓
[User melakukan action]
        ↓
[System memproses action]
        ↓
[System menampilkan hasil]
```

### Detail Flow

| Step | Aktor    | Aktivitas                    | Hasil               |
| ---- | -------- | ---------------------------- | ------------------- |
| 1    | [User]   | [Apa yang dilakukan user?]   | [Apa yang terjadi?] |
| 2    | [User]   | [Apa yang dilakukan user?]   | [Apa yang terjadi?] |
| 3    | [System] | [Apa yang dilakukan system?] | [Apa yang terjadi?] |
| 4    | [User]   | [Apa yang dilakukan user?]   | [Apa yang terjadi?] |
| 5    | [System] | [Apa hasil akhirnya?]        | [Final result]      |

---

# 3. Kondisi dan Aturan

## 3.1 Kondisi Sebelum Fitur Digunakan

* [ ] User sudah login.
* [ ] User memiliki akses ke fitur.
* [ ] Data yang dibutuhkan tersedia.
* [ ] [Kondisi lainnya jika diperlukan]

## 3.2 Aturan Fitur

Tuliskan aturan yang harus dipatuhi oleh fitur.

| No. | Aturan          |
| --- | --------------- |
| 1   | [Aturan bisnis] |
| 2   | [Aturan bisnis] |
| 3   | [Aturan bisnis] |

### Contoh

| No. | Aturan                                                                      |
| --- | --------------------------------------------------------------------------- |
| 1   | Mahasiswa hanya dapat mengubah tugas yang dikumpulkan oleh dirinya sendiri. |
| 2   | Tugas hanya dapat dikumpulkan sebelum deadline.                             |
| 3   | File yang dikumpulkan harus memiliki format yang diperbolehkan.             |

---

# 4. Fields & Validation

> Gunakan bagian ini jika fitur memiliki form atau membutuhkan input dari user.

## 4.1 Fields

| Field     | Tipe                         | Wajib    | Keterangan   | Contoh      |
| --------- | ---------------------------- | -------- | ------------ | ----------- |
| `[field]` | [text/file/number/date/etc.] | Ya/Tidak | [Penjelasan] | `[example]` |
| `[field]` | [type]                       | Ya/Tidak | [Penjelasan] | `[example]` |

## 4.2 Validation

| Field     | Aturan           | Pesan Error |
| --------- | ---------------- | ----------- |
| `[field]` | [Required]       | `[Pesan]`   |
| `[field]` | [Min/Max]        | `[Pesan]`   |
| `[field]` | [Format]         | `[Pesan]`   |
| `[field]` | [Aturan lainnya] | `[Pesan]`   |

### Contoh

| Field      | Aturan         | Pesan Error                 |
| ---------- | -------------- | --------------------------- |
| File tugas | Wajib diisi    | File tugas wajib diunggah.  |
| File tugas | Maksimal 10 MB | Ukuran file maksimal 10 MB. |
| File tugas | PDF/DOCX       | Format file tidak didukung. |

---

# 5. Response & Kondisi Setelah Action

Jelaskan apa yang terjadi setelah user melakukan action.

## 5.1 Jika Berhasil

**System:**

* [Data berhasil disimpan/diperbarui/dihapus.]
* [Halaman/dialog ditutup jika diperlukan.]
* [Data terbaru ditampilkan.]
* [Tampilkan pesan berhasil jika diperlukan.]

**Success Message:**

> [Contoh: Tugas berhasil dikumpulkan.]

---

## 5.2 Jika Input Tidak Valid

**System:**

* [Tampilkan pesan error.]
* [Tunjukkan field yang bermasalah.]
* [Pertahankan input user jika memungkinkan.]

**Error Message:**

> [Contoh: File tugas wajib diunggah.]

---

## 5.3 Jika Data Tidak Ditemukan

**System:**

* [Tampilkan empty/not found state.]
* [Berikan action yang sesuai jika diperlukan.]

**Message:**

> [Contoh: Belum ada tugas yang tersedia.]

---

## 5.4 Jika Terjadi Kesalahan Sistem

**System:**

* [Tampilkan pesan kesalahan yang mudah dipahami.]
* [Berikan tombol coba lagi jika diperlukan.]

**Message:**

> [Contoh: Terjadi kesalahan. Silakan coba lagi.]

---

# 7. Acceptance Criteria

Fitur dianggap selesai apabila:

### Functional

* [ ] User dapat mengakses fitur sesuai hak aksesnya.
* [ ] User dapat melakukan action utama.
* [ ] System menghasilkan hasil sesuai flow.
* [ ] Data berhasil tersimpan/diperbarui jika diperlukan.

### Validation

* [ ] Input wajib tidak boleh kosong.
* [ ] Input yang tidak sesuai aturan ditolak.
* [ ] Pesan error ditampilkan dengan jelas.

### Error Handling

* [ ] Kondisi data kosong memiliki tampilan yang jelas.
* [ ] Kesalahan sistem memiliki pesan yang jelas.
* [ ] User dapat mencoba kembali jika diperlukan.

### UI

* [ ] Loading state tersedia.
* [ ] Empty state tersedia jika diperlukan.
* [ ] Error state tersedia.
* [ ] Success feedback tersedia jika diperlukan.

---

# 8. Related Features

### Functional Requirement Terkait

* [FR-XX] — [Nama fitur]
* [FR-XX] — [Nama fitur]

### Flow yang Berhubungan

```text
[FR sebelumnya]
      ↓
[FR ini]
      ↓
[FR berikutnya]
```

---

# 9. Status Dokumentasi

| Item           | Status                                  |
| -------------- | --------------------------------------- |
| Requirement    | [DRAFT / APPROVED]                      |
| User Flow      | [DRAFT / APPROVED]                      |
| UI             | [DRAFT / APPROVED]                      |
| Validation     | [DRAFT / APPROVED]                      |
| Implementation | [NOT STARTED / IN PROGRESS / COMPLETED] |

**Last Updated:** `YYYY-MM-DD`

**Author:** `[Name]`
