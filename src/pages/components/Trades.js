import React, { Component } from 'react';
import {getTradesData} from '../../utils/api';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import '../../assets/css/footer.css';
import '../../assets/css/chart.css';

import moment from 'moment';
import 'moment/locale/nb';

class Trades extends Component {

    constructor() {
        super()

        this.state = {
            trades: [],
            pair: 'USDT_BTC'
        };

    }
    componentDidMount() {
        setInterval(() => {
            this.getTrades();
        }, 60000);
    }

    componentWillReceiveProps(props) {
        if (props.pair !== this.state.pair) {
            this.setState({ pair: props.pair });
            this.getTrades();
        }
    }

    getTrades(){
        getTradesData(this.state.pair, Math.round(new Date().getTime() / 1000) - (168 * 3600), 9999999999).then(trades=>Object.values(trades)).then((trades) => {
            this.setState({ trades: trades });
        });
    }

    render() {
        let trades = this.state.trades;
        for (var i = 0; i < trades.length; i++) {
             trades[i].date = new Date(trades[i].date);
             trades[i].time_readable = moment(trades[i].date).fromNow();
             trades[i].rate = parseFloat(trades[i].rate).toFixed(2);
             trades[i].amount = parseFloat(trades[i].amount).toFixed(5);
        }

        return (

            <div className="trades">
                <h4 className="sub-title">Trades latest week</h4>
                <hr/>
                <BootstrapTable
                    data={trades}
                    striped={true}
                    hover={true}
                >

                    <TableHeaderColumn dataField="type" dataSort={true} isKey={true}>Type</TableHeaderColumn>
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