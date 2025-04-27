const diagram_makro = document.getElementById("diagramMakro").getContext("2d");

let diagramMakroBulat = new Chart(diagram_makro, {
  type: "doughnut",
  data: {
    labels: ["Karbohidrat", "Protein", "Lemak"],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ["#A2E8D5", "#C3A2E8", "#FFB8B8"],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}%`;
          },
        },
      },
      datalabels: {
        formatter: (value, context) => {
          return value + "%";
        },
        color: "#fff",
        font: {
          family: "Poppins",
          weight: "bold",
          size: 12,
        },
      },
    },
  },
  plugins: [ChartDataLabels],
});

function hitungMakro() {
  const karbohidrat =
    parseFloat(document.getElementById("karbohidrat_value").value) || 0;
  const protein =
    parseFloat(document.getElementById("protein_value").value) || 0;
  const lemak = parseFloat(document.getElementById("lemak_value").value) || 0;

  const totalKalori = karbohidrat * 4 + protein * 4 + lemak * 9;

  const persenKarbo = Math.round(((karbohidrat * 4) / totalKalori) * 100);
  const persenProtein = Math.round(((protein * 4) / totalKalori) * 100);
  const persenLemak = Math.round(((lemak * 9) / totalKalori) * 100);

  let statusInfo = "";
  const info_makro = document.getElementById("infoMakro");
  const info_kalori = document.getElementById("totalKalori");
  const info_teks = document.getElementById("infoTeks");
  const info_kaloris = document.getElementById("kaloriInfo");
  const info_bar = document.getElementById("bar");

  if (
    persenKarbo >= 45 &&
    persenKarbo <= 55 &&
    persenProtein >= 15 &&
    persenProtein <= 25 &&
    persenLemak >= 25 &&
    persenLemak <= 35
  ) {
    statusInfo = `Keseimbangan makronutrien kamu mendekati asupan yang direkomendasikan. 
                            <br />
                            Rincian Anda :
                            <span class="bold_text">
                            ${persenKarbo}% Karbohidrat, ${persenProtein}% Protein, ${persenLemak}% Lemak.
                            </span>`;
    info_makro.className = "info_result rekomendasi";
    info_teks.className = "info_teks rekomendasi";
    info_kaloris.className = "kalori_info rekomendasi";
    info_bar.className = "bar rekomendasi";
  } else {
    statusInfo = `Keseimbangan makronutrien kamu berbeda dari yang direkomendasikan (50% Karbohidrat, 20% Protein, 30% Lemak).
                            <br />
                            Rincian Anda :
                            <span class="bold_text">
                            ${persenKarbo}% Karbohidrat, ${persenProtein}% Protein, ${persenLemak}% Lemak.
                            </span>`;

    if (persenKarbo > 60 || persenProtein > 30 || persenLemak > 40) {
      info_makro.className = "info_result sangatRendah";
      info_teks.className = "info_teks sangatRendah";
      info_kaloris.className = "kalori_info sangatRendah";
      info_bar.className = "bar sangatRendah";
    } else if (persenKarbo < 40 || persenProtein < 15 || persenLemak < 20) {
      info_makro.className = "info_result rendah";
      info_teks.className = "info_teks rendah";
      info_kaloris.className = "kalori_info rendah";
      info_bar.className = "bar rendah";
    } else {
      info_makro.className = "info_result rendah";
      info_teks.className = "info_teks rendah";
      info_kaloris.className = "kalori_info rendah";
      info_bar.className = "bar rendah";
    }
  }

  info_makro.innerHTML = `${statusInfo}`;
  info_kalori.innerHTML = `${totalKalori} kkal`;

  diagramMakroBulat.data.datasets[0].data = [
    persenKarbo,
    persenProtein,
    persenLemak,
  ];
  diagramMakroBulat.update();
}

window.onload = function () {
  hitungMakro();
};
