(function () {
    var myChart = echarts.init(document.querySelector(".table_one_content_leftDown_left"));
     var years = ['第一年', '第二年']; // 两年的标签
  var dataByYear = [
    [8, 12, 6, 8, 13, 7, 6, 14, 14, 14, 17], // 数据数组，第一年的数据
    [12, 15, 10, 9, 18, 11, 9, 18, 16, 16, 20] // 数据数组，第二年的数据
  ];

  var colors = ['#2f89cf', '#fc29e7']; // 每年的颜色
  var currentYearIndex = 0;
  function updateChart() {
    var option = {
      color: ['#2f89cf'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '0%',
        top: '10px',
        right: '10%', // 增加右边距
        bottom: '4%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ["新惠镇", "四家子镇", "长胜镇", "贝子府镇", "四道湾子镇", "下洼镇", "兴隆沟镇","金厂沟梁镇","黄洋洼镇","木头营子乡","牛古土镇"],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          color: "rgba(255,255,255,0.8)",
          fontSize: 20,
          // rotate: -45, // 旋转角度
          interval:1, // 间隔显示所有标签
          margin: 12 // 调整标签与轴线的距离，使其稍微延伸出去
        },
        axisLine: {
          show: false
        },
        boundaryGap: true, // 添加 boundaryGap 属性
        min: -0.5, // 手动设置 x 轴的最小值
        max: 10.5 // 手动设置 x 轴的最大值
      }],
      yAxis: [{
        type: 'value',
        axisLabel: {
          color: "rgba(255,255,255,0.6)",
          fontSize: 20
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,0.6)",
            width: 2
          }
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,0.1)"
          }
        }
      }],
      series: [{
        name: '面积',
        type: 'bar',
        barWidth: '35%',
        data: dataByYear[currentYearIndex],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: colors[currentYearIndex] },
            { offset: 1, color: '#02366076' }
          ]),
          barBorderRadius: 5
        }
      }]
    };
  
    myChart.setOption(option);
  }
    updateChart();

    setInterval(function () {
      currentYearIndex = (currentYearIndex + 1) % years.length;
      updateChart();
    }, 2000); // 每2秒切换一次年份
    window.addEventListener('resize', function () {
      myChart.resize();
    });
  })();
  