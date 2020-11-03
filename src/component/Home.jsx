import React, {Component} from 'react';
import {Card, Row, Col, Divider, Input} from 'antd';
import {Doughnut, Bar,Line} from "react-chartjs-2";
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/geo';
import Advicebox from './Advicebox';
import Toggle from './Toggle';
import Slider from './Slider';
import '../css/Home.css';


class Index extends Component {

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    state = {
        key: '2020',
        noTitleKey: 'app',
        counties: [],
        allCountyTotal: 0,
        service: [],
        selectedCounties: [],
        selectedMap: "Ireland",
    };
    serviceMap = {
        'Cork university hospital Wilton, Cork': [51.883458, -8.509836],
        'Beaumont hospital Hospital Rd, Beaumont, Dublin': [53.390584, -6.223336],
        'St.Joseph’s Hospital Raheny Spingdale Rd, Dublin': [53.382773, -6.181604],
        'Saint Joseph’s Hosptal 3 Mulgrave St, Limerick': [52.657686, -8.613193],
        'The Leukaemia Trust University College Hospital Galway': [53.277077, -9.066101],
        'University Hospital Kerry Ratass Tralee, Co.Kerry': [52.265408, -9.688579],
    }
    rows = [
        "County,20-29,30-39,40-49,50-54,55-59,60-64,65-69,70-74,75-79,80-84,85+,\"Male (rate: 246.2/100,000)\",\"Female (rate: 175.1/100,000)\",\"Total people with PD (rate: 210.1/100,000)\"",
        "Carlow,0,0,1,2,4,7,12,16,17,15,12,70,50,120",
        "Dublin,4,11,27,51,90,153,254,353,398,373,297,1621,1210,2831",
        "Kildare,0,2,5,9,15,25,40,51,46,38,32,272,195,467",
        "Kilkenny,0,1,2,4,8,13,22,31,32,30,25,122,86,208",
        "Laois,0,1,2,3,6,10,16,22,21,20,16,105,73,178",
        "Longford,0,0,1,2,3,6,10,13,12,13,10,51,35,86",
        "Louth,0,1,3,5,9,15,26,36,37,33,26,157,114,271",
        "Meath,0,1,4,8,13,22,36,48,45,39,32,238,172,410",
        "Offaly,0,1,2,3,6,10,17,23,25,23,18,96,68,164",
        "Westmeath,0,1,2,4,6,11,18,25,27,25,19,109,78,187",
        "Wexford,0,1,3,7,12,20,35,50,53,46,34,182,132,314",
        "Wicklow,0,1,3,6,11,18,31,43,42,36,28,173,126,299",
        "Clare,0,1,3,5,9,17,30,39,39,35,29,145,105,250",
        "Cork,1,4,11,23,40,69,116,161,173,165,126,661,480,1141",
        "Kerry,0,1,3,7,13,23,41,56,57,51,40,180,130,310",
        "Limerick,0,1,4,8,15,26,45,61,64,57,43,240,169,409",
        "Tipperary,0,1,3,7,13,23,38,53,56,55,43,196,139,335",
        "Waterford,0,1,2,5,9,16,28,39,41,38,28,142,102,244",
        "Galway,1,2,5,10,19,34,55,76,80,76,64,314,228,542",
        "Leitrim,0,0,1,1,3,5,8,11,12,12,11,40,28,68",
        "Mayo,0,1,3,6,11,21,37,49,52,50,42,160,114,274",
        "Roscommon,0,0,1,3,5,10,16,23,24,25,22,80,56,136",
        "Sligo,0,0,1,3,5,10,17,23,24,23,20,80,58,138",
        "Cavan,0,1,2,3,6,10,17,22,23,24,20,94,66,160",
        "Donegal,0,1,3,7,12,22,39,56,59,52,44,195,139,334",
        "Monaghan,0,0,1,3,5,8,14,18,19,20,16,76,53,129",
        "Ireland,6,35,98,195,348,604,1018,1398,1478,1374,1097,5799,4206,10005"
    ];

    option = {
        title: {
            // text: 'Mapping Parkinson\'s Disease in Ireland',
            subtext: 'Ireland',
            // sublink: 'http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c} (Cases)'
        },
        toolbox: {
            show: false,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: {
                    title: 'data view',
                    readOnly: false
                },
                restore: {
                    title: 'restore'
                },
                saveAsImage: {
                    title: 'save as Image'
                }
            }
        },
        visualMap: {
            min: 50,
            max: 2900,
            text: ['High', 'Low'],
            // realtime: false,
            calculable: true,
            seriesIndex: [1],
            left: 'right',
            inRange: {
                color: ['#c7e9c0', '#31a354', '#006d2c']
            }
        },
        geo: {
            map: 'Ireland',
        },
        series: [
            {
                type: 'scatter',
                coordinateSystem: 'geo',
                data: Object.keys(this.serviceMap).map(item => ({
                    name: item,
                    value: this.serviceMap[item].reverse().concat(1111)
                })),
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}'
                },
                // toolbox: {
                //     show: true,
                //     orient: 'vertical',
                //     left: 'right',
                //     top: 'center',
                // },
                encode: {
                    value: 2
                },
                symbolSize: 10,
                // symbol: 'path://M 917.333 810.667 H 810.667 v -384 a 42.6667 42.6667 0 0 0 -42.6667 -42.6667 h -42.6667 V 170.667 a 42.6667 42.6667 0 0 0 -42.6667 -42.6667 H 341.333 a 42.6667 42.6667 0 0 0 -42.6667 42.6667 v 213.333 H 256 a 42.6667 42.6667 0 0 0 -42.6667 42.6667 v 384 H 106.667 a 21.3333 21.3333 0 0 0 -21.3333 21.3333 v 42.6667 a 21.3333 21.3333 0 0 0 21.3333 21.3333 h 810.667 a 21.3333 21.3333 0 0 0 21.3333 -21.3333 v -42.6667 a 21.3333 21.3333 0 0 0 -21.3333 -21.3333 Z m -554.667 0 h -42.6667 a 21.3333 21.3333 0 0 1 -21.3333 -21.3333 v -42.6667 a 21.3333 21.3333 0 0 1 21.3333 -21.3333 h 42.6667 a 21.3333 21.3333 0 0 1 21.3333 21.3333 v 42.6667 a 21.3333 21.3333 0 0 1 -21.3333 21.3333 Z m 0 -170.667 h -42.6667 a 21.3333 21.3333 0 0 1 -21.3333 -21.3333 v -42.6667 a 21.3333 21.3333 0 0 1 21.3333 -21.3333 h 42.6667 a 21.3333 21.3333 0 0 1 21.3333 21.3333 v 42.6667 a 21.3333 21.3333 0 0 1 -21.3333 21.3333 Z m 170.667 170.667 h -42.6667 a 21.3333 21.3333 0 0 1 -21.3333 -21.3333 v -42.6667 a 21.3333 21.3333 0 0 1 21.3333 -21.3333 h 42.6667 a 21.3333 21.3333 0 0 1 21.3333 21.3333 v 42.6667 a 21.3333 21.3333 0 0 1 -21.3333 21.3333 Z m 0 -170.667 h -42.6667 a 21.3333 21.3333 0 0 1 -21.3333 -21.3333 v -42.6667 a 21.3333 21.3333 0 0 1 21.3333 -21.3333 h 42.6667 a 21.3333 21.3333 0 0 1 21.3333 21.3333 v 42.6667 a 21.3333 21.3333 0 0 1 -21.3333 21.3333 Z m 85.3333 -261.12 h -69.12 v 69.12 a 21.3333 21.3333 0 0 1 -21.3333 21.3333 h -32.4267 a 21.3333 21.3333 0 0 1 -21.3333 -21.3333 V 378.88 H 405.333 a 21.3333 21.3333 0 0 1 -21.3333 -21.3333 v -32.4267 a 21.3333 21.3333 0 0 1 21.3333 -21.3333 h 69.12 V 234.667 a 21.3333 21.3333 0 0 1 21.3333 -21.3333 h 32.4267 a 21.3333 21.3333 0 0 1 21.3333 21.3333 v 69.12 h 69.12 a 21.3333 21.3333 0 0 1 21.3333 21.3333 v 32.4267 a 21.3333 21.3333 0 0 1 -21.3333 21.3333 Z m 85.3333 431.787 h -42.6667 a 21.3333 21.3333 0 0 1 -21.3333 -21.3333 v -42.6667 a 21.3333 21.3333 0 0 1 21.3333 -21.3333 h 42.6667 a 21.3333 21.3333 0 0 1 21.3333 21.3333 v 42.6667 a 21.3333 21.3333 0 0 1 -21.3333 21.3333 Z m 0 -170.667 h -42.6667 a 21.3333 21.3333 0 0 1 -21.3333 -21.3333 v -42.6667 a 21.3333 21.3333 0 0 1 21.3333 -21.3333 h 42.6667 a 21.3333 21.3333 0 0 1 21.3333 21.3333 v 42.6667 a 21.3333 21.3333 0 0 1 -21.3333 21.3333 Z',
                // symbol:'https://cs1.ucc.ie/~lh18/PD/pics/dibiao.png',

                label: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                itemStyle: {
                    color: 'black'
                },
                emphasis: {
                    label: {
                        show: false
                    }
                }
            },
            {
                // name: 'Mapping Parkinson\'s Disease in Ireland',
                type: 'map',
                mapType: 'Ireland',
                label: {
                    show: true
                },
                data: [
                    {name: 'Carlow', value: 120},
                    {name: 'Dublin', value: 2831},
                    {name: 'Kildare', value: 467},
                    {name: 'Kilkenny', value: 208},
                    {name: 'Laois', value: 178},
                    {name: 'Longford', value: 86},
                    {name: 'Louth', value: 271},
                    {name: 'Meath', value: 410},
                    {name: 'Offaly', value: 164},
                    {name: 'Westmeath', value: 187},
                    {name: 'Wexford', value: 314},
                    {name: 'Wicklow', value: 299},
                    {name: 'Clare', value: 250},
                    {name: 'Cork', value: 1141},
                    {name: 'Kerry', value: 310},
                    {name: 'Limerick', value: 409},
                    {name: 'Tipperary', value: 335},
                    {name: 'Waterford', value: 244},
                    {name: 'Galway', value: 542},
                    {name: 'Leitrim', value: 68},
                    {name: 'Mayo', value: 274},
                    {name: 'Roscommon', value: 136},
                    {name: 'Sligo', value: 138},
                    {name: 'Cavan', value: 160},
                    {name: 'Donegal', value: 334},
                    {name: 'Monaghan', value: 129},
                    {name: 'Ireland', value: 10005}
                ]
            }
        ]
    };

    selectedMap = [];

    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({[type]: key});
    };

    componentDidMount() {
        const counties = [];
        const service = [];

        let allCountyTotal = 0;

        var rows = this.rows;
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i].split(",");
            const countyName = row[0];
            const atwenty = Number(row[1]);
            const athirty = Number(row[2]);
            const afourty = Number(row[3]);
            const afifty1 = Number(row[4]);
            const afifty2 = Number(row[5]);
            const asixty1 = Number(row[6]);
            const asixty2 = Number(row[7]);
            const aseventy1 = Number(row[8]);
            const aseventy2 = Number(row[9]);
            const aeighty1 = Number(row[10]);
            const aeighty2 = Number(row[11]);
            const malenum = Number(row[12]);
            const femalenum = Number(row[13]);
            const total = Number(row[14]);
            const serviceName = row[15]
            console.log(aeighty1);

            if (countyName !== "" && serviceName !== "") {
                counties.push({
                    name: countyName,
                    total: total,
                    female: femalenum,
                    male: malenum,
                    twenty: atwenty,
                    thirty: athirty,
                    fourty: afourty,
                    fifty1: afifty1,
                    fifty2: afifty2,
                    sixty1: asixty1,
                    sixty2: asixty2,
                    seventy1: aseventy1,
                    seventy2: aseventy2,
                    eighty1: aeighty1,
                    eighty2: aeighty2,
                    service: serviceName,
                });
            }
            allCountyTotal += total;
        }

        this.setState({
            counties: counties,
            allCountyTotal: allCountyTotal,
            service: service,
        });

        echarts.registerMap('Ireland', require('../data/Ireland.json'));
        echarts.registerMap('Galway', require('../data/Galway.json'));
        echarts.registerMap('Carlow', require('../data/Carlow.json'));
        echarts.registerMap('Dublin', require('../data/Dublin.json'));
        echarts.registerMap('Kildare', require('../data/Kildare.json'));
        echarts.registerMap('Kilkenny', require('../data/Kilkenny.json'));
        echarts.registerMap('Laois', require('../data/Laois.json'));
        echarts.registerMap('Longford', require('../data/Longford.json'));
        echarts.registerMap('Louth', require('../data/Louth.json'));
        echarts.registerMap('Meath', require('../data/Meath.json'));
        echarts.registerMap('Offaly', require('../data/Offaly.json'));
        echarts.registerMap('Westmeath', require('../data/Westmeath.json'));
        echarts.registerMap('Wexford', require('../data/Wexford.json'));
        echarts.registerMap('Wicklow', require('../data/Wicklow.json'));
        echarts.registerMap('Clare', require('../data/Clare.json'));
        echarts.registerMap('Cork', require('../data/Cork.json'));
        echarts.registerMap('Kerry', require('../data/Kerry.json'));
        echarts.registerMap('Limerick', require('../data/Limerick.json'));
        echarts.registerMap('Tipperary', require('../data/Tipperary.json'));
        echarts.registerMap('Waterford', require('../data/Waterford.json'));
        echarts.registerMap('Leitrim', require('../data/Leitrim.json'));
        echarts.registerMap('Mayo', require('../data/Mayo.json'));
        echarts.registerMap('Roscommon', require('../data/Roscommon.json'));
        echarts.registerMap('Sligo', require('../data/Sligo.json'));
        echarts.registerMap('Cavan', require('../data/Cavan.json'));
        echarts.registerMap('Donegal', require('../data/Donegal.json'));
        echarts.registerMap('Monaghan', require('../data/Monaghan.json'));

        this.selectedMap = "Ireland";
        const myChart = echarts.init(document.getElementById('main'));
        const this1 = this;
        let option = this.option

        myChart.setOption(option);
        myChart.on('click', function (params) {
            console.log(params);
            if (params.seriesType === "scatter") return
            var selectCountry = {};
            this1.state.counties.forEach(x => {
                if (x.name === params.name) {
                    selectCountry = x;
                    x.selected = true;
                } else {
                    x.selected = null;
                }
            })
            this1.setState({
                selectedCounties: [selectCountry]
            });
            console.log(selectCountry);
            if (params.data === undefined || params.data === null || params.data.name === this1.selectedMap) {
                myChart.setOption(option);
                this1.selectedMap = "Ireland";
                this1.state.counties.forEach(x => {
                    x.selected = null;
                })
                this1.setState({
                    selectedCounties: [], selectedMap: "Ireland"
                });
            } else {
                myChart.setOption({
                    title: {
                        // text: 'Mapping Parkinson\'s Disease in Ireland',
                        subtext: params.data.name,
                        // sublink: 'http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12'
                    },
                    visualMap: {
                        min: 50,
                        max: 2900,
                        text: ['High', 'Low'],
                        // realtime: false,
                        calculable: true,
                        left: 'right',
                        inRange: {
                            color: ['#c7e9c0', '#31a354', '#006d2c']
                        }
                    },
                    series: [
                        {
                            name: 'PD cases in each county',
                            type: 'map',
                            mapType: params.data.name, // 自定义扩展图表类型
                            label: {
                                show: true
                            },
                            data: [
                                {name: params.data.name, value: params.data.value}
                            ]
                        },
                    ]
                }, true);
                this1.selectedMap = params.data.name;
                this1.setState({
                    selectedMap: params.data.name
                });
                // var selectCountry = {};
                // this1.state.counties.forEach(x => {
                //     if (x.name === params.data.name) {
                //         selectCountry = x;
                //         x.selected = true;
                //     } else {
                //         x.selected = null;
                //     }
                // })
                // this1.setState({
                //     selectedCounties: [selectCountry]
                // });
                // console.log(this1.state)
            }
        });
    }


    render() {


        const tabList = [
            {
                key: '2020',
                tab: '2020',
            },
            {
                key: '2036',
                tab: '2036',
            },
            {
                key: '2051',
                tab: '2051',
            },
        ];
        const data = {
            labels: ['Female cases', 'Male cases'],
            datasets: [
                {
            
                    data:
                        [
                            this.state.selectedCounties.map((county) => county.female),
                            this.state.selectedCounties.map((county) => county.male),
                        ],
                    backgroundColor: colors,
                }
            ]
        };
        if(data.datasets[0].data[0].length===0){
            data.datasets[0].data=[[5799],[4206]]
        }
console.log(123,data);
        const data1 = {
            labels: ['20-29', '30-39', '40-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80-84', '85+'],
            datasets: [{
                    label: 'Different age cases',
                    data:
                        [
                            this.state.selectedCounties.map((county) => county.twenty),
                            this.state.selectedCounties.map((county) => county.thirty),
                            this.state.selectedCounties.map((county) => county.forty),
                            this.state.selectedCounties.map((county) => county.fifty1),
                            this.state.selectedCounties.map((county) => county.fifty2),
                            this.state.selectedCounties.map((county) => county.sixty1),
                            this.state.selectedCounties.map((county) => county.sixty2),
                            this.state.selectedCounties.map((county) => county.seventy1),
                            this.state.selectedCounties.map((county) => county.seventy2),
                            this.state.selectedCounties.map((county) => county.eighty1),
                            this.state.selectedCounties.map((county) => county.eighty2)
                        ],
                    backgroundColor: color2,
                }
            ]
        };
        if(data1.datasets[0].data[0].length===0){
            data1.datasets[0].data=[[6],[35],[98],[195],[348],[604],[1018],[1398],[1478],[1374],[1097]]
        }
        const contentList2020 = {
            2020: <p>
                <font style={{fontSize: '66px', color:'#122748'}}>{this.state.selectedCounties.map((county) => county.name).join()||'Ireland'}
                </font>
                <br/>
                <br/>
                <font
                style={{fontSize:'60px',color:'#122748'}}>{this.state.selectedCounties.map((county) => county.total).join() || '10,005'}</font>
            </p>,
        };
        const contentList = {
            2020: <p>
                 {/* Year: <font style={{color: '#2E93FF', fontWeight: 'bold', fontSize:'30px'}}>2020</font>
                <br/> */}
                Total Cases: <font style={{fontWeight: 'bold', fontSize:'30px'}}>10,005</font>
                <br/>
                Male Cases: <font
                style={{fontWeight: 'bold', fontSize:'30px'}}>5,799</font>
                <br/>
                Female Cases: <font
                style={{fontWeight: 'bold', fontSize:'30px'}}>4,206</font>

            </p>,

            2036: <p>
                {/* Year: <font style={{color: '#2E93FF', fontWeight: 'bold', fontSize:'30px'}}>2036</font>
                <br/> */}
                Total Cases: <font style={{fontWeight: 'bold', fontSize:'30px'}}>14,068</font>
                <br/>
                Male Cases: <font style={{fontWeight: 'bold', fontSize:'30px'}}>8,573</font>
                <br/>
                Female Cases: <font style={{fontWeight: 'bold', fontSize:'30px'}}>5,531</font>


            </p>,


            2051: <p>
                {/* Year: <font style={{color: '#2E93FF', fontWeight: 'bold', fontSize:'30px'}}>2051</font>
                <br/> */}
                Total Cases: <font style={{fontWeight: 'bold', fontSize:'30px'}}>19,322</font>
                <br/>
                Male Cases: <font style={{fontWeight: 'bold' , fontSize:'30px'}}>11,764</font>
                <br/>
                Female Cases: <font style={{fontWeight: 'bold', fontSize:'30px'}}>7,676</font>

            </p>,

        };
        // const {TextArea} = Input;

        return (
                <div style={{width: '100%'}}>
                    <Row gutter={16} justify="space-around" className="firstName">
                        <Col className="gutter-row" sm={24} md={12}>
                            <div>
                                <b><h1>Mapping Parkinson's in Ireland</h1></b>
                                <b><h3>Data from the Mapping Parkinson's Disease Project</h3></b>
                                <b><h3>University College Cork</h3></b>
                                <b><h3>Last Update: 16th September 2020 </h3></b>
                            </div>
                        
                        </Col>
                        <Col className="gutter-row shareButtons" sm={24} md={12}>
                            <div >

                                <a href="http://www.facebook.com/sharer.php?u=https://simplesharebuttons.com">
                                    <img className="shareImg"
                                         src="https://simplesharebuttons.com/images/somacro/facebook.png"
                                         alt="Facebook"/>
                                </a>

                                <a href="https://plus.google.com/share?url=https://simplesharebuttons.com">
                                    <img className="shareImg"
                                         src="https://simplesharebuttons.com/images/somacro/google.png"
                                         alt="Google"/>
                                </a>

                                <a href="https://twitter.com/share?url=https://simplesharebuttons.com&amp;text=Simple%20Share%20Buttons&amp;hashtags=simplesharebuttons">
                                    <img className="shareImg"
                                         src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter"/>
                                </a>

                                <a href="http://www.linkedin.com/shareArticle?mini=true&amp;url=https://simplesharebuttons.com">
                                    <img className="shareImg"
                                         src="https://simplesharebuttons.com/images/somacro/linkedin.png"
                                         alt="LinkedIn"/>
                                </a>

                                <a href="mailto:?Subject=Simple Share Buttons&amp;Body=I%20saw%20this%20and%20thought%20of%20you!%20 https://simplesharebuttons.com">
                                    <img className="shareImg"
                                         src="https://simplesharebuttons.com/images/somacro/email.png"
                                         alt="Email"/>
                                </a>

                                <a href="http://www.tumblr.com/share/link?url=https://simplesharebuttons.com&amp;title=Simple Share Buttons">
                                    <img className="shareImg"
                                         src="https://simplesharebuttons.com/images/somacro/tumblr.png"
                                         alt="Tumblr"/>
                                </a>

                            </div>
                        </Col>
                        <div>
                            <Slider/>
                        </div>
                    </Row>
                    
                    
                    <div className='map'>
                        <Row gutter={16} align="middle" justify="space-around">
                            <Col className="gutter-row" sm={24} md={8}>
                                {/* <Card className='pbox'
                                      style={{marginLeft: 36, marginRight: 36}}
                                      title="Projected PD cases in Ireland"
                                      tabList={tabList}
                                      activeTabKey={this.state.key}
                                      onTabChange={key => {
                                          this.onTabChange(key, 'key');
                                      }}
                                >
                                    {contentList[this.state.key]}
                                </Card> */}

                            <h2>{contentList2020[this.state.key]}</h2>
                            </Col>
                            <Col className="gutter-row" sm={24} md={12}>
                                <div id="main" style={{minWidth: 400, height: 600, marginTop: 24}}/>
                            </Col>
                        </Row>

                       


                        {/* <Divider/> */}
                        <Row gutter={16} align="middle" justify="space-around">
                            <Col className="gutter-row" sm={24} md={11}>
                                <Doughnut
                                    data={data}
                                    options={{
                                        title: {
                                            display: true,
                                            text: 'Cases In Gender Breakdown',
                                            fontSize: 20
                                        },
                                    }}
                                />
                            </Col>
                          
                            <Col className="gutter-row" sm={24} md={11}>
                                <Line
                                    data={data1}
                                    options={{
                                        title: {
                                            display: true,
                                            text: 'Cases In Age Breakdown',
                                            fontSize: 20
                                        },
                                        scales: {
                                            yAxes: [{
                                                // display: true,
                                                ticks: {
                                                    max:1500,
                                                    min: 0,
                                                    stepSize: 100,
                                                }
                                            }]
                                        }
                                    }}
                                />
                            </Col>
                        </Row>
                    </div>

                    <div className='box'>
                        <Row gutter={26} align="middle" justify="space-around">
                            <Col className="gutter-row" sm={24} md={{span: 8, offset: 1}}>
                                <div>
                                <h2>Available Specialist Health Services for PD</h2>
                                <table>
                                <thead >
                                    <tr>
                                        <th>County</th>
                                        <th>Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Cork</td>
                                    <td>Cork university hospital Wilton, Cork</td>
                                    </tr>
                                    <tr>
                                    <td>Dublin</td>
                                    <td>Beaumont hospital Hospital Rd, Beaumont, Dublin</td>
                                    </tr>
                                    <tr>
                                        <td>Dublin</td>
                                    <td>St.Joseph’s Hospital Raheny Spingdale Rd, Dublin'</td>
                                    </tr>
                                    <tr>
                                        <td>Limerick</td>
                                    <td>Saint Joseph’s Hosptal 3 Mulgrave St, Limerick</td>
                                    </tr>
                                    <tr>
                                    <td>Galway</td>
                                    <td>The Leukaemia Trust University College Hospital Galway</td>
                                    </tr>
                                    <tr>
                                        <td>Kerry</td>
                                    <td>University Hospital Kerry Ratass Tralee, Co.Kerry</td>
                                    </tr>
                                </tbody>                  
                             </table> 

                                </div>
                                <br/>
                              
                            </Col>
                            <Divider type="vertical"/>
                            <Col className="gutter-row" sm={24} md={11}>
                                <div>
                                <h2>Projected PD cases in Ireland</h2>
                                <Card className='pbox'
                                      style={{marginLeft: 36, marginRight: 36}}
                                      
                                      tabList={tabList}
                                      activeTabKey={this.state.key}
                                      onTabChange={key => {
                                          this.onTabChange(key, 'key');
                                      }}
                                >
                                    {contentList[this.state.key]}
                                </Card>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

);
}

}

                   
{/* 
                    <Divider/>
                    <div className='box'>
                        <Row gutter={26} align="middle" justify="space-around">
                            <Col className="gutter-row" sm={24} md={{span: 8, offset: 1}}>
                                <div>
                                    <h1 style={{color: '#3c624b'}}>SHARING</h1>
                                    <h2>Your experience to help others</h2>
                                    <h2>know more about PD</h2>
                                </div>
                                <br/>
                                <div>
                                    <h1 style={{color: '#3c624b'}}>SUGGESTIONS</h1>
                                    <h2>We'd welcome your feedback</h2>
                                    <h2>Together we can make a difference</h2>
                                </div>
                            </Col>
                            <Divider type="vertical"/>
                            <Col className="gutter-row" sm={24} md={11}>
                                <div>
                                    <h2>Tell us anything you want to share</h2>
                                 
                        
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

        );
    }

} */}

let colors = [
    '#a6bddb',
    '#1c9099'
];
let color2 = [
    "#807dba",
    "#807dba",
    "#807dba",
    "#807dba",
    "#807dba",
    "#807dba",
    "#807dba",
    "#807dba",
    "#807dba",
    "#807dba",
    "#807dba"
];
export default Index;
