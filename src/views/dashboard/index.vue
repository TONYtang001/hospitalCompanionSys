<template>
    <div>
        <div id="pieChart" style="width: 100%; height: 400px;"></div>
        <div id="lineChart" style="width: 100%; height: 400px;"></div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { report } from '../../api';
import * as echarts from 'echarts';

onMounted(() => {
    report()
    .then(({data}) => {
        console.log(data, 'reportData');
        renderPieChart(data.data.types);
        renderLineChart(data.data.typeList);
    });
});

function renderPieChart(types) {
    const pieChart = echarts.init(document.getElementById('pieChart'));
    const option = {
        title: {
            text: '订单状态分布',
            subtext: '数据来源于后台统计',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: '状态',
                type: 'pie',
                radius: '50%',
                data: types.map(type => ({ value: type.num, name: type.state })),
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    pieChart.setOption(option);
}

function renderLineChart(typeList) {
    const lineChart = echarts.init(document.getElementById('lineChart'));
    const option = {
        title: {
            text: '订单金额趋势',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: typeList.map(item => item.date)
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '订单金额',
                type: 'line',
                data: typeList.map(item => item.order_money)
            }
        ]
    };
    lineChart.setOption(option);
}
</script>

<style scoped>
/* 你可以在这里添加样式 */
</style>