(function () {
  var h = React.createElement;
  var useState = React.useState;

  /* =====================================================
     DATA – EDIT BAGIAN INI SAJA
     Simpan gambar di folder "images" di sebelah index.html
     ===================================================== */
  var PROFILE = {
    name: "Zam Zami Sihombing",
    role: "Information Systems | Administration | Data",
    intro: "Lulusan S1 Sistem Informasi dengan kemampuan dalam administrasi, pengolahan data, pengembangan sistem, dan analisis menggunakan Microsoft Excel.",
    photo: "images/fobes.jpeg",
    about: [
      "Halo! Saya lulusan Sistem Informasi yang berfokus pada administrasi proyek, pengolahan data, dan pengembangan sistem digital. Memiliki pengalaman dalam mengelola dokumen, rekapan data, serta membangun sistem administrasi surat digital.",
      "Saya memiliki kemampuan analisis yang kuat, teliti, dan siap mendukung kelancaran operasional proyek melalui pengelolaan data dan administrasi yang terstruktur."
    ],
    skills: [
      ["Microsoft Excel (Pivot & VLOOKUP)", "Mahir"],
      ["Data Entry & Management", "Mahir"],
      ["CodeIgniter / PHP / Laravel", "Menengah"],
      ["Black Box Testing & SDLC", "Menengah"],
      ["MySQL / Database Management / Python", "Dasar"]
    ],
    email: "zamzamisihombing@gmail.com",
    links: [
      ["GitHub", "https://github.com/zamzamis"],
      ["LinkedIn", "www.linkedin.com/in/zam-zami-sihombing-b198a7276"]
    ]
  };

  var PROJECTS = [
    { 
      title: "ADBIRA", 
      type: "Web", 
      image: "images/adbira.png",
      desc: "Sistem informasi surat masuk dan surat keluar untuk membantu pengelolaan administrasi surat.",
      tags: ["CodeIgniter", "MySQL"] 
    },
    { 
      title: "Dashboard Admin & API", 
      type: "Web", 
      image: "images/laravel.png",
      desc: "Dashboard untuk mengelola user dan kategori serta REST API sebagai backend untuk aplikasi SIPUPUK.",
      tags: ["Laravel", "REST API", "MySQL"] 
    },
    { 
      title: "Aplikasi Penjualan Pupuk", 
      type: "Mobile", 
      image: "images/android.png",
      desc: "Aplikasi penjualan pupuk berbasis Android yang dikembangkan sebagai proyek tugas akhir.",
      tags: ["Kotlin", "Jetpack Compose", "Laravel"] 
    },
    { 
      title: "Dashboard Penjualan", 
      type: "Excel", 
      image: "images/excel.png",
      desc: "Dashboard analisis penjualan menggunakan Pivot dan Slicer untuk melihat performa penjualan sekaligus tugas untuk mendapat sertifikat excel.",
      tags: ["Microsoft Excel", "Pivot Table", "Slicer"] 
    }
];

  /* =====================================================
     KOMPONEN
     ===================================================== */

  // Menampilkan gambar; jika file belum ada, tampil kotak penanda.
  function Img(props) {
    var s = useState(false), gagal = s[0], setGagal = s[1];
    if (gagal) {
      return h("div", { className: "img-empty", role: "img", "aria-label": props.alt },
        "Letakkan gambar di " + props.src);
    }
    return h("img", {
      className: "img", src: props.src, alt: props.alt, loading: "lazy",
      onError: function () { setGagal(true); }
    });
  }

  function Nav() {
    return h("header", { className: "nav" }, h("div", { className: "wrap" },
      h("a", { className: "logo", href: "#atas" }, PROFILE.name),
      h("nav", null,
        h("a", { href: "#proyek" }, "Proyek"),
        h("a", { href: "#tentang" }, "Tentang"),
        h("a", { href: "#kontak" }, "Kontak"))));
  }

  function Hero() {
    return h("div", { className: "hero wrap", id: "atas" },
      h("div", null,
        h("h1", null, PROFILE.name),
        h("p", null, PROFILE.role + ". " + PROFILE.intro),
        h("a", { className: "btn ", href: "#proyek" }, "Lihat proyek"),
        h("a", { className: "btn ghost", href: "#kontak" }, "Hubungi saya")),
      h("div", { className: "photo" },
        h(Img, { src: PROFILE.photo, alt: "Foto " + PROFILE.name })));
  }

  function Projects() {
    var types = ["Semua"].concat(
      PROJECTS.map(function (p) { return p.type; })
              .filter(function (t, i, a) { return a.indexOf(t) === i; })
    );
    var s = useState("Semua"), aktif = s[0], setAktif = s[1];
    var tampil = PROJECTS.filter(function (p) { return aktif === "Semua" || p.type === aktif; });

    return h("section", { id: "proyek" }, h("div", { className: "wrap" },
      h("h2", null, "Proyek"),
      h("div", { className: "tabs", role: "group", "aria-label": "Filter proyek" },
        types.map(function (t) {
          return h("button", {
            key: t, className: "tab", "aria-pressed": String(t === aktif),
            onClick: function () { setAktif(t); }
          }, t);
        })),
      h("div", { className: "grid" },
        tampil.map(function (p) {
          return h("article", { className: "card", key: p.title },
            h("div", { className: "thumb" }, h(Img, { src: p.image, alt: "Tampilan proyek " + p.title })),
            h("div", { className: "body" },
              h("h3", null, p.title),
              h("p", null, p.desc),
              h("div", { className: "tags" },
                p.tags.map(function (t) { return h("span", { className: "tag", key: t }, t); }))));
        }))));
  }

  function About() {
    return h("section", { id: "tentang" }, h("div", { className: "wrap about" },
      h("div", null,
        h("h2", null, "Tentang saya"),
        PROFILE.about.map(function (t, i) { return h("p", { key: i }, t); })),
      h("div", null,
        h("h2", null, "Keahlian"),
        h("ul", { className: "skills" },
          PROFILE.skills.map(function (s) {
            return h("li", { key: s[0] }, s[0], h("span", null, s[1]));
          })))));
  }

  function Contact() {
    return h("section", { id: "kontak", className: "contact" }, h("div", { className: "wrap" },
      h("h2", null, "Mari bekerja sama"),
      h("a", { className: "big", href: "mailto:" + PROFILE.email }, PROFILE.email),
      h("p", { style: { marginTop: 24 } },
        PROFILE.links.map(function (l) {
          return h("a", { key: l[0], href: l[1], target: "_blank", rel: "noopener", style: { marginRight: 20 } }, l[0]);
        }))));
  }

  function App() {
    return h(React.Fragment, null,
      h(Nav),
      h("main", null, h(Hero), h(Projects), h(About), h(Contact)),
      h("footer", null, h("div", { className: "wrap" }, "© " + new Date().getFullYear() + " " + PROFILE.name)));
  }

  ReactDOM.createRoot(document.getElementById("root")).render(h(App));
})();
