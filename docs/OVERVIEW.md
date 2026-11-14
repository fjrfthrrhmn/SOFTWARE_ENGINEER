# Project Overview — StudentConnect

**Dokumen:** Project Overview
**Status:** Final
**Tujuan:** Memberikan gambaran umum mengenai sistem dan tujuan Project StudentConnect.

---

## 1. Overview Project

**StudentConnect** adalah platform informasi akademik sederhana yang membantu mahasiswa dan dosen dalam mengakses informasi perkuliahan secara terpusat.
Platform ini memungkinkan mahasiswa, dosen, dan admin untuk mengakses serta mengelola informasi akademik sesuai dengan hak akses masing-masing.
StudentConnect berfokus pada pengelolaan **data pengguna, jadwal perkuliahan, dan materi pembelajaran**.

---

## 2. Latar Belakang

Aktivitas perkuliahan membutuhkan akses terhadap informasi seperti jadwal perkuliahan dan materi pembelajaran. Apabila informasi tersebut dikelola secara terpisah, pengguna dapat mengalami kesulitan dalam memperoleh informasi yang dibutuhkan.
StudentConnect dikembangkan sebagai sistem terpusat yang menyediakan akses terhadap informasi perkuliahan berdasarkan peran pengguna.
Melalui sistem ini, mahasiswa dapat melihat jadwal perkuliahan yang diikuti serta mengakses materi pembelajaran. Dosen dapat melihat jadwal mengajar dan mengelola materi pembelajaran pada mata kuliah yang diampu. Sementara itu, admin bertanggung jawab terhadap pengelolaan data pengguna dan jadwal perkuliahan dalam sistem.

---

## 3. Tujuan Project

StudentConnect dikembangkan dengan tujuan:

- Menyediakan informasi perkuliahan secara terpusat.
- Memudahkan mahasiswa dalam melihat jadwal perkuliahan.
- Memudahkan mahasiswa dalam mengakses materi pembelajaran.
- Memudahkan dosen dalam melihat jadwal mengajar.
- Memudahkan dosen dalam menambahkan, mengubah, dan menghapus materi pembelajaran.
- Memudahkan admin dalam mengelola data pengguna.
- Memudahkan admin dalam mengelola jadwal perkuliahan.
- Menyediakan sistem dengan hak akses berdasarkan peran pengguna.

---

## 4. Output yang Diharapkan

Hasil yang diharapkan dari pengembangan StudentConnect adalah sebuah platform informasi akademik sederhana yang dapat:

- Menyediakan informasi perkuliahan secara terpusat.
- Menyediakan akses jadwal berdasarkan peran pengguna.
- Menyediakan materi pembelajaran yang dapat diakses mahasiswa dan dikelola dosen.
- Menyediakan pengelolaan data pengguna oleh admin.
- Menyediakan pengelolaan jadwal perkuliahan oleh admin.
- Menerapkan pembatasan akses berdasarkan peran pengguna.

---

## 5. Project Specification

| Komponen      | Teknologi / Spesifikasi       | Deskripsi                                                                                                                                  |
| ------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Nama Proyek   | StudentConnect                | Perangkat lunak berbasis web sebagai pusat informasi akademik                                                                              |
| Arsitektur    | Monolith                      | Seluruh komponen utama aplikasi.                                                                                                           |
| Frontend      | Next.js (React), Tailwind CSS | Digunakan untuk membangun antarmuka pengguna (UI)                                                                                          |
| Backend       | Next.js (Node.js)             | Menangani logika bisnis, pemrosesan permintaan, autentikasi, otorisasi, serta komunikasi antara frontend dan database.                     |
| Database      | Neon PostgreSQL               | Digunakan untuk menyimpan dan mengelola data.                                                                                              |
| Deployment    | Vercel                        | Platform untuk melakukan hosting dan deployment aplikasi agar dapat diakses secara online melalui browser.                                 |
| Platform      | PWA (Progressive Web App)     | Memungkinkan aplikasi diakses melalui browser dan dapat dipasang (install) pada perangkat pengguna layaknya aplikasi.                      |
| Layout        | Mobile Only                   | Antarmuka aplikasi dirancang khusus untuk penggunaan pada perangkat mobile dengan mengutamakan kemudahan navigasi dan kenyamanan pengguna. |
| Maximum Width | 640px                         | Membatasi lebar maksimum konten aplikasi hingga 640 piksel agar tampilan tetap konsisten dan nyaman digunakan pada berbagai ukuran layar.  |

---

## 6. Software Architecture Characteristics

| Komponen        | Fokus Utama                                                                           |
| --------------- | ------------------------------------------------------------------------------------- |
| Performance     | Kecepatan sistem dalam memproses permintaan dan menampilkan informasi.                |
| Security        | Menggunakan `bcryptjs`, `jose`, Next.js `cookies()` dan Custom middleware/DAL.                                  |
| Maintainability | Kemudahan dalam pemeliharaan dan perbaikan sistem.                                    |
| Reliability     | Keandalan sistem dalam menjalankan fungsi secara konsisten.                           |
| Testability     | Kemudahan sistem untuk diuji guna memastikan setiap fungsi berjalan sesuai kebutuhan. |

---

## 7. Referensi

| Dokumen                     | Link                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| Index Dokumentasi           | [README](README.md)                                                                        |
| Roadmap Pengembangan        | [ROADMAP](ROADMAP.md)                                                                      |
| Arsitektur Sistem           | [ARCHITECTURE](ARCHITECTURE.md)                                                            |
| Modul Sistem                | [MODULES](MODULES.md)                                                                      |
| Data Model                  | [DATA_MODEL](DATA_MODEL.md)                                                                |
| Keputusan dan Pertanyaan    | [OPEN_QUESTIONS](OPEN_QUESTIONS.md)                                                        |
| Functional Requirement      | [FUNCTIONAL REQUIREMENT](01-functional-requirements/FUNCTIONAL%20REQUIREMENT.md)           |
| Non Functional Requirement  | [NON FUNCTIONAL REQUIREMENT](01-functional-requirements/NON%20FUNCTIONAL%20REQUIREMENT.md) |
| Use Case                    | [USE CASES](02-usecase-diagram/USE%20CASES.md)                                             |
| Class Diagram               | [CLASS_DIAGRAM](03-class-diagram/CLASS_DIAGRAM.plantUML)                                   |
| Entity Relationship Diagram | [ERD](04-entity-relationship-diagram/ERD.xml)                                              |
| Activity Diagram            | [Activity Diagram](05-activity-diagram/Activity%20-%20Diagram.webp)                        |
| Sequence Diagram            | [SEQUANCE DIAGRAM](06-sequence-diagram/SEQUANCE%20DIAGRAM.md)                              |
| Rencana                     | [00-plan](00-plan/)                                                                        |
