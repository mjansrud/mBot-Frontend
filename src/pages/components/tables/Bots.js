import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'moment/locale/nb';

class Dashboard extends Component {

    render() {

        return (
            <div>
                <h4 className="sub-title">Bots</h4>
                <hr/>
                <BootstrapTable
                    data={[]}
                >
                    <TableHeaderColumn dataField="name" dataSort={true} isKey={true}>Pair</TableHeaderColumn>
                    <TableHeaderColumn dataField="change" dataSort={true} >Change</TableHeaderColumn>
                    <TableHeaderColumn dataField="price" dataSort={true} >Price</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default Dashboard;
