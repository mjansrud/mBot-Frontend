import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'moment/locale/nb';

class PairsTab extends Component {


    constructor() {
        super()

        this.options = {
            defaultSortName: 'name',
            defaultSortOrder: 'asc',
            expandRowBgColor: 'white'
        };

    }

    onRowSelect(row) {
        this.props.onClick(row.selector);
    }

    isExpandableRow(row) {
        return true;
    }

    expandComponent(row) {

        let expandData = [];

        Object.keys(row).map((key, value) => {
            let object = [];
            var name =
            object["name"] = key.charAt(0).toUpperCase() + key.slice(1);
            object["value"] = row[key];
            expandData.push(object)
            return false;
        });

        const cellEditProp = {
            mode: 'click'
        };

        return (
            <div className="tickers-table-tr">
                <BootstrapTable
                    data={expandData}
                    trClassName='tickers-table-tr'
                    striped={true}
                    hover={true}
                    cellEdit={ cellEditProp }
                >
                    <TableHeaderColumn dataField="name" dataSort={true} isKey={true}>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="value">Value</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );

    }

    expandColumnComponent({ isExpandableRow, isExpanded }) {
        let content = '';

        if (isExpandableRow) {
            content = (isExpanded ? '(-)' : '(+)' );
        } else {
            content = ' ';
        }
        return (
            <div> { content } </div>
        );
    }

    render() {

        let session = this;
        let selectRowProp = {
            mode: 'radio',
            bgColor: '#ffccc6',
            onSelect: function(row) {
                session.props.onClick(row.pair);
            },

            clickToExpand:true,
            selected:[this.props.selected]
        };

        return (
            <BootstrapTable
                data={this.props.data}
                options={ this.options }
                expandableRow={ this.isExpandableRow }
                expandComponent={ this.expandComponent }
                trClassName='tickers-table-tr'
                tableContainerClass='tickers-table-body'
                expandColumnOptions={ {
                    expandColumnVisible: true,
                    expandColumnComponent: this.expandColumnComponent
                } }
                striped={true}
                hover={true}
                selectRow={ selectRowProp }
                pagination
            >
                <TableHeaderColumn dataField="name" dataSort={true} isKey={true}>Pair</TableHeaderColumn>
                <TableHeaderColumn dataField="change" dataSort={true} >Change</TableHeaderColumn>
                <TableHeaderColumn dataField="price" dataSort={true} >Price</TableHeaderColumn>
            </BootstrapTable>
        );

    }
}

PairsTab.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    selected: React.PropTypes.string.isRequired,
    data: React.PropTypes.array.isRequired,
};


export default PairsTab;
