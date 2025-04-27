const diagram_kalori = document
  .getElementById("diagramKalori")
  .getContext("2d");

let diagramKaloriBatang = new Chart(diagram_kalori, {
  type: "bar",
  data: {
    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
    datasets: [
      {
        label: "Asupan Kalori (kkal)",
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: ["#C3A2E8"],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Kalori (kkal)",
        },
      },
    },
  },
});

function hitungKaloris() {
  const usia = parseInt(document.getElementById("usia").value) || 0;
  const tinggi_badan = parseInt(document.getElementById("usia").value) || 0;
  const berat_badan = parseInt(document.getElementById("usia").value) || 0;
  const kelamin = document.getElementById("kelamin").value;
  const tingkat_aktifitas = document.getElementById("aktifitas").value;
  const kalori_today =
    parseInt(document.getElementById("kalori_today").value) || 0;

  let bmr;
  if (kelamin === "laki") {
    bmr = 10 * berat_badan + 6.25 * tinggi_badan - 5 * usia + 5;
  } else {
    bmr = 10 * berat_badan + 6.25 * tinggi_badan - 5 * usia - 161;
  }

  let jumlahAktivitas;
  switch (tingkat_aktifitas) {
    case "kurangAktif":
      jumlahAktivitas = 1.2;
      break;
    case "ringanAktif":
      jumlahAktivitas = 1.375;
      break;
    case "sedangAktif":
      jumlahAktivitas = 1.55;
      break;
    case "sangatAktif":
      jumlahAktivitas = 1.725;
      break;
    default:
      jumlahAktivitas = 1.375;
  }

  const tdee = Math.round(bmr * jumlahAktivitas);

  const rangeRendah = Math.round(tdee * 0.9);
  const rangeBagus = Math.round(tdee * 1.1);

  const days = [
    "senin_kalori",
    "selasa_kalori",
    "rabu_kalori",
    "kamis_kalori",
    "jumat_kalori",
    "sabtu_kalori",
    "minggu_kalori",
  ];
  const kaloriPerharian = days.map(
    (day) => parseInt(document.getElementById(day).value) || 0
  );

  let statusInfo = "";
  const info_kalori = document.getElementById("infoKalori");
  const info_container = document.getElementById("infoContainer");
  const info_kaloriBox = document.getElementById("infoKaloriBox");
  const total_kalori7 = document.getElementById("totalKalori7");

  if (kalori_today < rangeRendah) {
    statusInfo = `Asupan kalori Anda di bawah rentang yang direkomendasikan (${rangeRendah}-${rangeBagus} kkal untuk profil Anda).`;
    info_kalori.className = "status_teks tidakRekomendasi";
    info_container.className = "status_container tidakRekomendasi";
    info_kaloriBox.className = "status_kalori tidakRekomendasi";
  } else if (kalori_today > rangeBagus) {
    statusInfo = `Asupan kalori Anda di atas rentang yang direkomendasikan (${rangeRendah}-${rangeBagus} kkal untuk profil Anda).`;
    info_kalori.className = "status_teks tidakRekomendasi";
    info_container.className = "status_container tidakRekomendasi";
    info_kaloriBox.className = "status_kalori tidakRekomendasi";
  } else {
    statusInfo = `Asupan kalori Anda dalam rentang yang direkomendasikan (${rangeRendah}-${rangeBagus} kkal untuk profil Anda).`;
    info_kalori.className = "status_teks rekomendasi";
    info_container.className = "status_container rekomendasi";
    info_kaloriBox.className = "status_kalori rekomendasi";
  }

  const total_kalori_seminggu = kaloriPerharian.reduce(
    (total, kalori) => total + kalori,
    0
  );

  info_kalori.innerHTML = `${statusInfo}`;
  total_kalori7.innerHTML = `${total_kalori_seminggu} Kkal`;

  diagramKaloriBatang.data.datasets[0].data = kaloriPerharian;

  diagramKaloriBatang.update();
}

window.onload = function () {
  hitungKaloris();
};
