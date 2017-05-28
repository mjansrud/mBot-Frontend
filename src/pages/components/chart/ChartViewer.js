import React, { Component } from 'react';
import {getChartData, getTradesData} from '../../../utils/api';
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
            trades: [],
            pair: 'USDT_BTC',
            initiated: false
        };
    }

    componentDidMount() {

        this.getPeriods(this.state.pair);
        this.interval = setInterval(() => {
            this.getPeriods(this.state.pair);
        }, 120000);

    }

    componentWillUnmount(){
        clearInterval(this.interval);

    }

    componentWillReceiveProps(props) {
        if(this.state.initiated) {
            this.getPeriods(props.pair);
        }
    }

    getPeriods(pair){
        let start = Math.round(new Date().getTime() / 1000) - (24 * 3600);
        let end = 9999999999
        getChartData(pair,900, start, end).then(periods=>Object.values(periods)).then((periods) => {
            getTradesData(pair, start, end).then(trades=>Object.values(trades)).then((trades) => {
                this.setState({ periods: periods, trades: trades, initiated: true});
            });
        });
    }

    render() {
        let periods = this.state.periods;
        let trades = this.state.trades;

        if(periods.length){

            trades.forEach((d, i) => {
                d.date = new Date(d.date);
            });

            periods.forEach((d, i) => {
                d.date = new Date(d.date * 1000);
                d.open = +d.open;
                d.high = +d.high;
                d.low = +d.low;
                d.close = +d.close;
                d.volume = +d.volume;
                d.trades = trades;
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