import React, { Component } from 'react';
import {getChartData} from '../../../utils/api';
import ChartMACD from './ChartMACD';
import ChartRSI from './ChartRSI';

import 'moment/locale/nb';

import '../../../assets/css/footer.css';
import '../../../assets/css/chart.css';

class ChartViewer extends Component {

    interval;

    constructor() {
        super()

        this.state = {
            periods: [],
            pair: 'USDT_BTC'
        };
    }

    componentDidMount() {

        this.getPeriods();
        this.interval = setInterval(() => {
            this.getPeriods();
        }, 120000);

    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    componentWillReceiveProps(props) {
        if (props.pair !== this.state.pair) {
            this.setState({ pair: props.pair });
            this.getPeriods();
        }
    }

    getPeriods(){
        getChartData(this.state.pair, 300, Math.round(new Date().getTime() / 1000) - (24 * 3600), 9999999999).then(periods=>Object.values(periods)).then((periods) => {
            this.setState({ periods: periods });
        });
    }

    /*
    getPeriods(){
        let from =  Math.round(new Date().getTime() / 1000) - (24 * 3600);
        let to = 9999999999;
        getChartData(this.state.pair, 300, from, to).then(periods=>Object.values(periods)).then((periods) => {
            getTradesData(this.state.pair, from, to).then(trades=>Object.entries(trades)).then((trades) => {
                this.setState({ trades: trades, periods: periods });
            });
        });
    }
    */

    render() {
        let periods = this.state.periods;

        if(periods.length){

            periods.forEach((d, i) => {
                d.date = new Date(d.date * 1000);
                d.open = +d.open;
                d.high = +d.high;
                d.low = +d.low;
                d.close = +d.close;
                d.volume = +d.volume;
                //console.log(d);
            });

            return (
                <div className="chart-container center-block">
                    <ChartMACD type="hybrid" data={periods} />
                    <ChartRSI type="hybrid" data={periods} />
                </div>
            )
        }

        return (
            <div className="chart-container loading">
                Loading chart ...
            </div>
        )

    }
}



ChartViewer.propTypes = {
    pair: React.PropTypes.string.isRequired
};

export default ChartViewer;