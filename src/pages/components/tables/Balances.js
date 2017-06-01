import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {getBalancesData} from '../../../utils/api';
import 'moment/locale/nb';

class Balances extends Component {

    interval;

    constructor() {
        super()

        this.state = {
            balances: []
        };

    }

    componentDidMount() {
        this.getBalances();
        this.interval = setInterval(() => {
            this.getBalances();
        }, 50000);
    }

    getBalances() {
        getBalancesData().then(balanes=>Object.entries(balanes)).then((balanes) => {
            this.setState({balances: balanes});
        });
    }

    render() {

        let allBalances = this.state.balances;
        let myBalances = [];

        // Transfer the collection into an array with objects
        for (var i = 0; i < allBalances.length; i++) {

            let balance = []
            balance.pair = allBalances[i][0];
            balance.amount = allBalances[i][1];
            balance.usdt = allBalances[i][1];

            if(balance.amount > 0){
                myBalances.push(balance);
            }

        }

        return (
            <div>
                <h4 className="sub-title">Balances</h4>
                <hr/>
                <BootstrapTable
                    data={myBalances}
                >
                    <TableHeaderColumn dataField="pair" dataSort={true} isKey={true}>Pair</TableHeaderColumn>
                    <TableHeaderColumn dataField="amount" dataSort={true} >Amount</TableHeaderColumn>
                    <TableHeaderColumn dataField="usdt" dataSort={true} >USDT</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default Balances;
