import React from 'react';
 
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {belgavi: []};
        this.headers = [
            { key: 'F.no', label: 'F.no'},
            { key: 'Farmer name', label: 'Farmer name' },
            { key: 'Requirement', label: 'Requirement' },
            { key: 'Quantity', label: 'Quantity' },
            { key: 'Status', label: 'Status' },
            { key: 'Ph.no', label: 'Ph.no' }
        ];
        this.state = { checkedBoxes: [] };
        this.deletebelgavi = this.deletebelgavi.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
    }
     
    deletebelgavi = (event) => {
        event.preventDefault();
        if(window.confirm('Are you sure, want to delete the selected farmer detail?')) {
            alert(this.state.checkedBoxes + " Succesfully Deleted");
        }
    }
     
    toggleCheckbox = (e, item) => {      
        if(e.target.checked) {
            let arr = this.state.checkedBoxes;
            arr.push(item.id);
             
            this.setState = { checkedBoxes: arr};
        } else {            
            let items = this.state.checkedBoxes.splice(this.state.checkedBoxes.indexOf(item.id), 1);
             
            this.setState = {
                checkedBoxes: items
            }
        }       
        console.log(this.state.checkedBoxes);
    }
     
    componentDidMount() {
        fetch('hhttp://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=detail&table=belagavi').then(response => {
            console.log(response);
            return response.json();
          }).then(result => {
            // Work with JSON data here
            console.log(result);
            this.setState({
                belgavi_rs:result
            }); 
          }).catch(err => {
            // Do something for an error here
            console.log("Error Reading data " + err);
          });
    }
         
    render() {
        const belgaviFound = this.state.employee_rs && this.state.employee_rs.length;
        if(employeeFound) {
            return (
                <div className="container"><h1>ReactJS Fetch Data from Database with PHP Mysql</h1>
                    <div id="msg"></div>
                    <button type="button" className="btn btn-danger" onClick={this.deleteEmployees}>Delete Selected Employee(s)</button>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {
                                    this.headers.map(function(h) {
                                        return (
                                            <th key={h.key}>{h.label}</th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employee_rs.map(function(item, index) {
                                return (
                                    <tr key={index}>
                                      <td><input type="checkbox" className="selectsingle" value="{item.id}" checked={this.state.checkedBoxes.find((p) => p.id === item.id)} onChange={(e) => this.toggleCheckbox(e, item)}/>
                                        {item.id}
                                      </td>
                                      <td>{item.name}</td>
                                      <td>{item.position}</td>
                                      <td>{item.office}</td>
                                      <td>{item.age}</td>
                                      <td>{item.salary}</td>
                                    </tr>
                                )}.bind(this))
                            }
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (
                <div id="container">
                    No product found
                </div>
            )
        }
    }
}
export default App;