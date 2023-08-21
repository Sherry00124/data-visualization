(function () {
  var myChart = echarts.init(document.querySelector(".table_one_content_pie_1"));
  var trafficWay = [
    {
      name: "大红谷",
      value: 20,
    },
    {
      name: "敖谷8000",
      value: 10,
    },
    {
      name: "大金苗",
      value: 30,
    },
    {
      name: "金苗K1",
      value: 20,
    },
    {
      name: "其他",
      value: 20,
    },
  ];

  var data = [];
  var color = [
    "#00ffff",
    "#00cfff",
    "#006ced",
    "#ffe000",
    "#ffa800",
    "#ff5b00",
    "#ff3000",
  ];
  for (var i = 0; i < trafficWay.length; i++) {
    data.push(
      {
        value: trafficWay[i].value,
        name: trafficWay[i].name,
        itemStyle: {
          normal: {
            borderWidth: 5,
            shadowBlur: 20,
            borderColor: color[i],
            shadowColor: color[i],
          },
        },
      },
      {
        value: 2,
        name: "",
        itemStyle: {
          normal: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            color: "rgba(0, 0, 0, 0)",
            borderColor: "rgba(0, 0, 0, 0)",
            borderWidth: 0,
          },
        },
      }
    );
  }
  var seriesOption = [
    {
      name: "",
      type: "pie",
      clockWise: false,
      radius: [190, 210],
      hoverAnimation: false,
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: "outside",
            color: "#ddd",
            textStyle: {
              fontSize: 35,
            },
            formatter: function (params) {
              var percent = 0;
              var total = 0;
              for (var i = 0; i < trafficWay.length; i++) {
                total += trafficWay[i].value;
              }
              percent = ((params.value / total) * 100).toFixed(0);
              if (params.name !== "") {
                return (
                  "种类：" +
                  params.name +
                  "\n" +
                  "\n" +
                  "占百分比：" +
                  percent +
                  "%"
                );
              } else {
                return "";
              }
            },
          },
          labelLine: {
            length: 30,
            length2: 100,
            show: true,
            color: "#00ffff",
            lineStyle: {
              width: 2, // 调整这里的值来增加线条的粗细
            },
          },
        },
      },
      data: data,
    },
  ];
  option = {
    color: color,
    title: {
      text: "26.5%",
      subtext: "数据类型",
      top: "45%",
      textAlign: "center",
      left: "50%",
      textStyle: {
        color: "#f2f2f2",
        fontSize: 50,
      },
      subtextStyle: {
        fontSize: 40,
        color: ["#ff9d19"],
      },
    },
    graphic: {
      elements: [
        {
          type: "image",
          z: 3,
          style: {
            width: 178,
            height: 178,
          },
          left: "center",
          top: "center",
          position: [100, 100],
        },
      ],
    },
    tooltip: {
      show: false,
    },
    legend: {
      icon: "circle",
      orient: "vertical",
      data: ["大红谷", "敖谷8000", "大金苗", "金苗K1","其他"],
      top: 'middle',
      right: 0,
      itemWidth: 40,
      itemHeight: 40,
      align: "left",
      textStyle: {
        color: "#fff",
        fontSize:35,
      },
      itemGap: 50,
    },
    toolbox: {
      show: false,
    },
    series: seriesOption,
  };

  myChart.setOption(option);
  window.addEventListener('resize', function () {
    myChart.resize();
  });
})();
