<template>

    <div style="zoom: 90%" dir="rtl">
        <b-row>
            <b-col cols="12">
                <Statistics v-if="counts" :items="counts" :only="[ 'areas','projects','buildings', 'users' ]"
                            icon="TrendingUpIcon"></Statistics>
            </b-col>
        </b-row>
        <b-row>

            <b-col cols="6">
                <b-card>
                    <div class="d-flex">
                        <feather-icon size="21" class="mr-2" icon="UsersIcon"/>
                        <h4>عدد مساحين لكل منطقة</h4>
                    </div>
                    <pie-chart-category :label="['منطقة 1','منطقة 2','منطقة 3','منطقة 4','منطقة 5','منطقة 6','منطقة 7']"
                                        height="400"
                                        :data="[23,34,45,56,12,3,45]"/>
                </b-card>
            </b-col>


            <b-col cols="6">
                <b-card>
                    <div class="d-flex">
                        <feather-icon size="21" class="mr-2" icon="TrendingUpIcon"/>
                        <h4>عدد العقارات لكل منطقة</h4>
                    </div>
                    <chartjs-component-bar-chart :options="options" :height="400" :data="programs" v-if="programs"/>
                </b-card>
            </b-col>


            <b-col cols="6">
                <b-card>
                    <div class="d-flex">
                        <feather-icon size="21" class="mr-2" icon="CommandIcon"/>
                        <h4>نسبة الانجاز لكل منطقة</h4>
                    </div>
                    <chartjs-component-bar-chart :options="options" :height="400" :data="courses" v-if="courses"/>
                </b-card>
            </b-col>

            <b-col cols="6">
                <b-card>
                    <div class="d-flex">
                        <feather-icon size="21" class="mr-2" icon="UsersIcon"/>
                        <h4>عدد مساحين لكل مشروع</h4>
                    </div>
                    <pie-chart-category :label="['مشروع 1','مشروع 2','مشروع 3','مشروع 4','مشروع 5','مشروع 6','مشروع 7']"
                                        height="400"
                                        :data="[23,34,45,56,12,3,45]"/>
                </b-card>
            </b-col>

        </b-row>
        <b-row>
                        <b-col cols="12">
                            <b-card>
                                <div class="d-flex">
                                    <feather-icon size="21" class="mr-2" icon="CommandIcon"/>
                                    <!--            <feather-icon size="21"  icon="DollarSignIcon"/>-->
                                    <h4>نسب الانجاز التراكمية خلال الشهور </h4>
                                </div>
                                          <chartjs-component-bar-chart :options="options" :height="400" :data="mixedChart"  />
                            </b-card>
                        </b-col>
            <!--            <b-col cols="12">-->
            <!--                <b-card>-->
            <!--                    <div class="d-flex">-->
            <!--                        &lt;!&ndash;            <feather-icon size="21"  icon="TrendingUpIcon"/>&ndash;&gt;-->
            <!--                        <h4>Users Activities</h4>-->
            <!--                    </div>-->
            <!--                    <chartjs-component-line-chart :options="options" :height="310" :data="ActivitiesData"-->
            <!--                                                  v-if="activities"/>-->
            <!--                </b-card>-->
            <!--            </b-col>-->
        </b-row>
    </div>
</template>

<script>
    import {
        BCard,
        BCardHeader,
        BCardTitle,
        BCardText,
        BCardBody,
        BCol,
        BRow,
        BImg,
        BButton,
        BMedia,
        BMediaAside,
        BAvatar,
        BMediaBody
    } from 'bootstrap-vue';

    import pieChartCategory from '@/views/dashboard/component/pieChart.vue';
    import ChartjsComponentBarChart from '@/views/components/charts-components/ChartjsComponentBarChart.vue';
    import ChartjsComponentLineChart from '@/views/components/charts-components/ChartjsComponentLineChart.vue';
    import Statistics from '@/views/components/info/statistics';


    import {$themeColors} from '@themeConfig';
    // colors
    const chartColors = {
        mainColor: '#054978',
        primaryColorShade: '#836AF9',
        yellowColor: '#ffe800',
        successColorShade: '#28dac6',
        warningColorShade: '#ffe802',
        warningLightColor: '#FDAC34',
        infoColorShade: '#299AFF',
        greyColor: '#4F5D70',
        blueColor: '#2c9aff',
        blueLightColor: '#84D0FF',
        greyLightColor: '#EDF1F4',
        tooltipShadow: 'rgba(0, 0, 0, 0.25)',
        lineChartPrimary: '#666ee8',
        lineChartDanger: '#ff4961',
        labelColor: '#746D69',
        grid_line_color: 'rgba(200, 200, 200, 0.2)',
        second_color: '#f57f21',
    };

    export default {
        components: {
            BCard,
            BCol,
            BImg,
            BRow,
            BCardHeader,
            BCardTitle,
            BCardText,
            BCardBody,
            BButton,
            BMedia,
            BMediaAside,
            BAvatar,
            BMediaBody,
            Statistics,
            ChartjsComponentBarChart,
            pieChartCategory,
            ChartjsComponentLineChart,
        },
        data() {
            return {
                data: null,
                options: {
                    elements: {
                        rectangle: {
                            borderWidth: 2,
                            borderSkipped: 'bottom',
                        },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    responsiveAnimationDuration: 500,
                    legend: {
                        display: false,
                    },
                    tooltips: {
                        // Updated default tooltip UI
                        shadowOffsetX: 1,
                        shadowOffsetY: 1,
                        shadowBlur: 8,
                        shadowColor: chartColors.tooltipShadow,
                        backgroundColor: $themeColors.light,
                        titleFontColor: $themeColors.dark,
                        bodyFontColor: $themeColors.dark,
                    },
                    scales: {
                        xAxes: [
                            {
                                display: true,
                                gridLines: {
                                    display: true,
                                    color: chartColors.grid_line_color,
                                    zeroLineColor: chartColors.grid_line_color,
                                },
                                scaleLabel: {
                                    display: false,
                                },
                                ticks: {
                                    fontColor: chartColors.labelColor,
                                },
                            },
                        ],
                        yAxes: [
                            {
                                display: true,
                                gridLines: {
                                    color: chartColors.grid_line_color,
                                    zeroLineColor: chartColors.grid_line_color,
                                },
                                ticks: {
                                    stepSize: 1,

                                    fontColor: chartColors.labelColor,
                                },
                            },
                        ],
                    },
                },
            };
        },
        computed: {
            counts() {
                return {
                    areas: 50,
                    projects: 100,
                    buildings: 1000,
                    users: 300
                }
            },
            mixedChart() {
                return {
                    labels: ["يناير","فبراير"," سبتمبر", " اكتوبر", " نوفمبر", " ديسمبر"],
                    datasets: [
                        {
                            type: "line",
                            label: "الفعلى التراكمى ",
                            data: [10, 12, 20, 30,45,50],
                            fill: false,
                            borderColor: "pink",
                        },
                        {
                            type: "line",
                            label: "المخطط التراكمى ",
                            data: [20, 23, 30, 40,60,80],
                            fill: false,
                            borderColor: "#836AF9",
                        },
                        {
                            type: "bar",
                            label: "الفعلى ",
                            data: [40, 50, 60, 70,80,90],
                            backgroundColor: chartColors.second_color,
                        },
                        {
                            type: "bar",
                            label: "المخطط ",
                            data: [50, 55, 60, 75, 85,98],
                            backgroundColor: "#054978",
                        },
                    ],
                };
                //  }
            },
            programs() {
                return {
                    labels: ['المنطقة الاولى ', 'المنطقة الثانية ', 'المنطقة الثالثة ', 'المنطقة الرابعة ', 'المنطقة الخامسة '],
                    datasets: [
                        {
                            data: [10, 20, 40, 20, 15],
                            backgroundColor: chartColors.second_color,
                            borderColor: 'transparent',
                        },
                    ],
                };
            },
            courses() {
                return {
                    labels: ['المنطقة الاولى ', 'المنطقة الثانية ', 'المنطقة الثالثة ', 'المنطقة الرابعة ', 'المنطقة الخامسة '],
                    datasets: [
                        {
                            label: "فعلى",
                            data: [40, 59, 30,20,34],
                            backgroundColor: chartColors.second_color,
                            borderColor: "transparent",
                        },
                        {
                            label: "مخطط ",
                            data: [80, 70, 30,14,78],
                            backgroundColor: "#eee",
                            borderColor: "transparent",
                        },
                    ],
                };
            },

        },
        methods: {},
        mounted() {

        },
    };
</script>
