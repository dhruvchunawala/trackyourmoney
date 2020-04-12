import Form from './Form';
import React, { Component } from 'react';
import Summary from './Summary';
import Table from './Table';
import * as RecordsAPI from '../utils/RecordsAPI';
import { Navbar, Nav, FormControl, But } from 'react-bootstrap';
import '../App.css';
class App extends Component {
    constructor() {
        super();
        this.state = {
            isLoaded: false,
            error: null,
            records: []
        }
    }

    componentDidMount() {
        RecordsAPI.getAll()
            .then(
                response => this.setState({
                    records: response.data,
                    isLoaded: true
                })
            ).catch(
                error => this.setState({
                    isLoaded: true,
                    error: error
                })
            )
    }

    addRecord(r) {
        let newRecords = [...this.state.records, r];
        this.setState({
            records: newRecords
        });
    }

    deleteRecord(r) {
        const recordIndex = this.state.records.indexOf(r);
        const newRecords = this.state.records.filter((record, index) => index !== recordIndex);

        this.setState({
            records: newRecords
        });
    }

    updateRecord(oldNew) {
        const recordIndex = this.state.records.indexOf(oldNew.old);
        let newRecords = this.state.records.map(
            (record, index) => {
                if (index === recordIndex) {
                    return oldNew.new;
                } else {
                    return record;
                }
            }
        );

        this.setState({
            records: newRecords
        });
    }

    credits() {
        let c = this.state.records.reduce((preVal, curItem) => {
            if (curItem.amount > 0) {
                return preVal += curItem.amount;
            } else {
                return preVal;
            }
        }, 0);
        return c;
    }

    debits() {
        return this.state.records.reduce((preVal, curItem) => {
            if (curItem.amount < 0) {
                return preVal += curItem.amount;
            } else {
                return preVal;
            }
        }, 0);
    }

    balance() {
        return this.credits() + this.debits();
    }



    render() {
        const { isLoaded, error, records } = this.state;
        let TablePlaceholder;
        if (error) {
            TablePlaceholder = <div className="alert alert-danger" role="alert"> Error: {error.message} </div>;
        } else if (!isLoaded) {
            TablePlaceholder = <div className="alert alert-primary" role="alert">Loading...</div>;
        } else {
            TablePlaceholder = <Table entries={records}
                handleUpdateRecord={this.updateRecord.bind(this)}
                handleDeleteRecord={this.deleteRecord.bind(this)} />;
        }

        return (
            <div className="container">
                <h1 className="elegantshadow">Track Your Money</h1>



                <br />
                <div className="div2">
                    <Summary text="Credit" type="success" amount={this.credits()} />
                    <Summary text="Debit" type="danger" amount={this.debits()} />
                    <Summary text="Balance" type="info" amount={this.balance()} />
                </div>

                <br /> <br /> <br /> <br />
                <Form handleAddRecord={this.addRecord.bind(this)} />

                <hr />
                <br />

                {TablePlaceholder}
            </div >
        );
    }
}

export default App;
