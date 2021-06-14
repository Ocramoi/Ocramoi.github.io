/**
 * Dica para desenvolvimento, para ter autocomplete, documentação e dicas de digitação,
 * instale o pacote @type/chart.js (`npm install @types/chart.js -D`), ou rode `npm install`
 */

// Contextos para DOMs canvas
const ctx1 = document.getElementById("graf1"),
      ctx2 = document.getElementById("graf2"),
      ctx3 = document.getElementById("graf3"),
      ctx4 = document.getElementById("graf4"),

      // Dados para exibição, para implementação troque os dados pela resposta da API
      dataPoints1 = [67, 55, 57, 2],
      dataPoints2 = [[95], [50]],
      dataPoints3 = [60, 30],
      dataPoints4 = [
          [90, 80, 70, 40],
          [70, 60, 50, 60]
      ],

      // Monta informação de cada dataset
      dataSet1 = [{
          // Legenda da área do gráfico (mesmo para todos os datasets)
          label: "# de alunos",
          // Cor de área para cada conjunto de dados do gráfico
          backgroundColor: "rgb(139, 233, 253)",
          // Cor da borda da legenda de área do gráafico
          borderColor: "rgb(98, 114, 164)",
        data: dataPoints1
      }],
      dataSet2 = [{
          label: "# de alunos",
          backgroundColor: ["rgb(139, 233, 253)", "rgb(255, 85, 85)"],
          borderColor: ["rgb(98, 114, 164)", "rgb(189, 147, 249)"],
          data: dataPoints2
      }],
      dataSet3 = [{
          label: "Adimplência",
          backgroundColor: ["rgb(139, 233, 253)", "rgb(255, 85, 85)"],
          borderColor: ["rgb(98, 114, 164)", "rgb(189, 147, 249)"],
          data: dataPoints3
      }],
      dataSet4 = [{
          label: "Aproveitamento de 70% a 100% do curso (nota)",
          backgroundColor: "rgb(139, 233, 253)",
          borderColor: "rgb(98, 114, 164)",
          data: dataPoints4[0]
      }, {
          label: "Aproveitamento de 0% a 100% do curso (nota)",
          backgroundColor: "rgb(98, 114, 164)",
          borderColor: "rgb(40, 42, 54)",
          data: dataPoints4[1]
      }],

      // Conjuntos de informação completos para cada gráfico
      data1 = {
          // Títulos por barra/grupo
          labels: [
              "Ano 1",
              "Ano 2",
              "Ano 3",
              "Ano 4"
          ],
          // Dataset referente
          datasets: dataSet1
      },
      data2 = {
          labels: ["Número de membros", "Número de não membros"],
          datasets: dataSet2
      },
      data3 = {
          labels: [`Alunos adimplentes - ${dataPoints3[0].toString()} alunos`,
                   `Alunos inadimplentes - ${dataPoints3[1].toString()} alunos`],
          datasets: dataSet3
      },
      data4 = {
          labels: [
              "Hospital Socor",
              "Hospital LeFort",
              "Hospital Santa Rita",
              "Hospital Life Center"
          ],
          datasets: dataSet4
      };

// Gera gráfico para cada elemento DOM referente com base nas informações estabelecidas
let graf1 = new Chart(ctx1, {
    // Tipo de gráfico
    type: 'bar',
    // Informação respectiva
    data: data1,
    // Configuração de gráfico
    options: {
        // Configuração de título
        // title: {
        //     display: true,
        //     text: "Total de alunos por ano",
        //     fontSize: 28
        // },
        // Configuração de 'grid'
        scales: {
            // Exibe eixo de dados com início em 0, mostrando todo o espaço amostral
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true
                }
            }],
            // Configuração de legenda de dados (eixo x)
            xAxes: [{
                ticks: {
                    fontSize: 22
                }
            }]
        },
        // Configuração de legenda de área
        legend: {
            display: false,
            labels: {
                fontSize: 18
            },
            position: "bottom"
        },
        // Habilita design responsivo
        resposive: true
    }
});

let graf2 = new Chart(ctx2, {
    type: 'bar',
    data: data2,
    options: {
        // title: {
        //     display: true,
        //     text: "Total de alunos membros e não membros",
        //     fontSize: 28
        // },
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                ticks: {
                    fontSize: 22
                }
            }]
        },
        legend: {
            display: false,
            labels: {
                fontSize: 18
            },
            position: "bottom"
        },
        resposive: true
    }
});

let graf3 = new Chart(ctx3, {
    type: 'doughnut',
    data: data3,
    options: {
        // title: {
        //     display: true,
        //     text: "Adimplência de alunos",
        //     fontSize: 28
        // },
        legend: {
            display: false,
            labels: {
                fontSize: 18
            },
            position: "bottom"
        },
        resposive: true,
        cutoutPercentage: 70
    }
});

let graf4 = new Chart(ctx4, {
    type: "horizontalBar",
    data: data4,
    options: {
        // title: {
        //     display: true,
        //     text: "Número de alunos por serviço",
        //     fontSize: 28
        // },
        scales: {
            xAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true
                }
            }],
            yAxes: [{
                ticks: {
                    fontSize: 18
                }
            }]
        },
        legend: {
            display: false,
            labels: {
                fontSize: 18
            },
            position: "bottom"
        },
        resposive: true
    }
});
