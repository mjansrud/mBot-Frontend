import React, { Component } from 'react';
import {getTradesData} from '../../../utils/api';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import '../../../assets/css/chart.css';

import moment from 'moment';
import 'moment/locale/nb';

class Trades extends Component {

    interval;

    constructor() {
        super()

        this.state = {
            trades: [],
            pair: 'all',
            initiated: false
        };

    }
    componentDidMount() {
        this.getTrades(this.state.pair);
        this.interval = setInterval(() => {
            this.getTrades(this.state.pair);
        }, 60000);
    }

    componentWillReceiveProps(props) {
        if(this.state.initiated){
            this.getTrades(props.pair);
        }
    }

    compnentWillUnmount(){
        clearInterval(this.interval);
    }

    getTrades(pair){
        getTradesData(pair, Math.round(new Date().getTime() / 1000) - (168 * 3600), 9999999999).then(trades=>Object.entries(trades)).then((trades) => {
            this.setState({ pair: pair, trades: trades, initiated: true });
        });
    }

    render() {
        let tradesCollection = this.state.trades;
        let tradesList = [];

        // Transfer the collection into an array with objects
        for (var i = 0; i < tradesCollection.length; i++) {
            if(this.state.pair === 'all'){
                for (var j = 0; j < tradesCollection[i][1].length; j++) {
                    var tradeAll = tradesCollection[i][1][j];
                    tradeAll.pair = tradesCollection[i][0];
                    tradeAll.date = new Date(tradesCollection[i][1][j].date);
                    tradeAll.time_readable = moment(tradesCollection[i][1][j].date).format('DD/MM HH:mm');
                    tradeAll.rate = parseFloat(tradesCollection[i][1][j].rate).toFixed(2);
                    tradeAll.amount = parseFloat(tradesCollection[i][1][j].amount).toFixed(5);
                    tradeAll.type = tradeAll.type;
                    tradeAll.trade = tradesList;
                    tradesList.push(tradeAll);
                }
            }else{
                var tradePair = tradesCollection[i][1];
                tradePair.pair = this.state.pair;
                tradePair.date = new Date(tradePair.date);
                tradePair.time_readable = moment(tradePair.date).format('DD/MM HH:mm');
                tradePair.rate = parseFloat(tradePair.rate).toFixed(2);
                tradePair.amount = parseFloat(tradePair.amount).toFixed(5);
                tradePair.trade = tradesList;
                tradesList.push(tradePair);
            }
        }

        return (

            <div className="trades">
                <h4 className="sub-title">Trades latest week</h4>
                <hr/>
                <BootstrapTable
                    data={tradesList}
                    striped={true}
                    hover={true}
                    pagination
                >

                    <TableHeaderColumn dataField="pair" dataSort={true} isKey={true}>Pair</TableHeaderColumn>
                    <TableHeaderColumn dataField="type" dataSort={true}>Type</TableHeaderColumn>
                    <TableHeaderColumn dataField="amount" dataSort={true} >Amount</TableHeaderColumn>
                    <TableHeaderColumn dataField="rate" dataSort={true} >Rate</TableHeaderColumn>
                    <TableHeaderColumn dataField="time_readable" dataSort={true} >Time </TableHeaderColumn>
                </BootstrapTable>
            </div>

        )

    }
}


Trades.propTypes = {
    pair: React.PropTypes.string.isRequired
};

export default Trades;