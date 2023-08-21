(function () {
    var myChart = echarts.init(document.querySelector(".table_one_content_leftDown_right"));
    var years = ['2022', '2023']; // 两年的标签
    var dataByYear = [
      [8, 12, 6, 8, 13, 7, 6, 14, 14, 14, 17], // 数据数组，第一年的数据
      [12, 15, 10, 9, 18, 11, 9, 18, 16, 16, 20] // 数据数组，第二年的数据
    ];
    var colors = ['#ffd700', '#137249']; // 每年的颜色
    var currentYearIndex = 0;
    function updateChart() {
    var option = {
      color: ['#ffd700'], // 设置黄色
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
          interval: 1, // 间隔显示所有标签
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
        name: '数量',
        type: 'line', // 设置为折线图
        data: dataByYear[currentYearIndex],
        itemStyle: {
          color: colors[currentYearIndex], // 设置折线颜色为黄色
          borderColor: colors[currentYearIndex] // 设置折线边框颜色为黄色
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: colors[currentYearIndex] },
            { offset: 1, color: '#02366000' } // 透明色，以下填充
          ])
        },
        lineStyle: {
          color: colors[currentYearIndex] // 设置折线颜色为黄色
        },
        symbol: 'circle', // 设置折线节点样式为圆圈
        symbolSize: 8, // 设置折线节点圆圈大小
        smooth: true // 设置折线平滑显示
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
  