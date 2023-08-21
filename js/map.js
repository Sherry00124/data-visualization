var myChart = echarts.init(document.querySelector(".center-map"));
myChart.showLoading();

var uploadedDataURL = "./asset/data.json";
myChart.showLoading();
$.getJSON(uploadedDataURL, function (geoJson) {
  echarts.registerMap("jiangxi", geoJson);
  myChart.hideLoading();
  var geoCoordMap = {
    新惠镇: [119.9 , 42.3],
    
  };
  var data = [
    { name: "新惠镇", value: 500 },
  ];
  var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord = geoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value),
        });
      }
    }
    return res;
  };

  option = {

    tooltip: {//鼠标悬浮
      trigger: "item",
      formatter: function (params) {
        if (typeof params.value[2] == "undefined") {
          return params.name 
        } else {
          return params.name 
        }
      },
      textStyle:{
        fontSize:50,
        fontWeight:'bold'
      }
    },
    grid: {
      left: '0%',
      top: '0',
      right: '0%', // 增加右边距
      bottom: '4%',
      containLabel: true
    },
    layoutCenter: ['15%', '50%'],//显地图示位置
    geo: {
      show: true,
      map: "jiangxi",
      label: {
        normal: {
          show: true,
          textStyle:{
            fontSize:70,
            fontWeight:'bold',
            color:"gray"
          },
        },
        
        emphasis: {
          show: false,
        },
      },
      // roam: true,
      itemStyle: {
        normal: {
          areaColor: {
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 2,
            colorStops: [
              {
                offset: 0,
                color: "rgba(0, 38, 66, 1)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(0, 38, 66, 0.1)", // 100% 处的颜色
              },
            ],
            globalCoord: false, // 缺省为 false
          },
          // borderColor: "#3fdaff",//修改边框颜色
          // borderWidth: 2,
          // shadowColor: "rgba(63, 218, 255, 0.5)",
          // shadowBlur: 30,
          borderColor: "rgba(147, 235, 248, 1)",
          borderWidth: 1,
          shadowColor: "rgba(128, 217, 248, 1)",
          // shadowColor: 'rgba(255, 255, 255, 1)',
          shadowOffsetX: 0,
          shadowOffsetY: 15,
          shadowBlur: 10,
        },
        emphasis: {
          borderColor: "#FFF",
          borderWidth: "2",
          shadowColor: "rgba(255, 255, 255, 0.5)",
          shadowBlur: 5,
          label: {
            show: true,
            textStyle: {
              color: "#FFF",
              fontSize: 16,
            },
          },
          areaColor: {
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 2,
            colorStops: [
              {
                offset: 0,
                color: "rgba(0, 38, 66, 1)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(0, 38, 66, 0.1)", // 100% 处的颜色
              },
            ],
            globalCoord: false, // 缺省为 false
          },
        },
      },
    },
    series: [
      {
        name: "light",
        type: "scatter",//数据系列的类型，这里是散点图。
        coordinateSystem: "geo",//geo 表示地理坐标系。
        data: convertData(data),
        symbolSize: function (val) {//用于设置散点的大小，这里通过函数来设置。val 是数据中的一个值，通过除以 10 来决定散点的大小。
          return val[2] / 10;
        },
      },
      {
        name: "Top 5",
        type: "effectScatter",
        coordinateSystem: "geo",
        data: convertData(
          data
            .sort(function (a, b) {
              return b.value - a.value;
            })
            .slice(0, 5)
        ),
        symbolSize: function (val) {
          return val[2] / 10;
        },
        showEffectOn: "render",
        rippleEffect: {
          brushType: "fill",//指定涟漪特效的配置 涟漪的绘制类型，这里设置为 "stroke"。
        },
        hoverAnimation: true,//鼠标悬停动画
        label: {
          normal: {
            formatter: "{b}",
            position: "right",
            show: true,
            textStyle:{
              fontSize:50,
              fontWeight:'bold',
              color:'#fff',
            }
          },
        },
        itemStyle: {
          normal: {
            color: "#F4E925",
            shadowBlur: 10,
            shadowColor: "#05C3F9",
          },
        },
        zlevel: 1,//绘制图形的 z 层级，越大越靠前绘制
      },
    ],
  };
  myChart.setOption(option);
});
window.addEventListener('resize', function () {
  myChart.resize();
});