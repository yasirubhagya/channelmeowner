
import { Mutation, Query } from "react-apollo";
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { ADD_FieldOfConsultant, UPDATE_FieldOfConsultant, DELETE_FieldOfConsultant, GET_FieldOfConsultant } from '../../gql';


const ConsultantTypeStyles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        margin: theme.spacing.unit * 2,

    },
    selectionRoot: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formRoot: {
        flexGrow: 1,
        textAlign: 'center'
    },
    formControl: {
        margin: theme.spacing.unit,
        height: '54px',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '46%',
        },

        [theme.breakpoints.up('md')]: {
            width: '30%',
        },
        [theme.breakpoints.up('lg')]: {
            width: '22%',
        },
    },

    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },

});


class ConsultantType extends Component {

    state = {
        ConsultantType: {
            _id: '',
            name: '',
            createdById: ''
        },
        userId: '5ca98800c9e29b2794447d29',
        editMode: false
    }



    theme = createMuiTheme({
        palette: {
            primary: { main: lightGreen['A400'] }, // Purple and green play nicely together.
            secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
        },
        typography: { useNextVariants: true },
    });


    handleNameChange = (event) => {
        this.setState({ ConsultantType: { ...this.state.ConsultantType, name: event.target.value } });
    };




    render() {

        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={this.theme}>
                {!this.state.editMode ?
                    <Mutation mutation={ADD_FieldOfConsultant} onCompleted={(data) => alert(data + " is added success fully")}>
                        {(addConsultantType, { loading, error, data }) => (
                            <Paper className={classes.root} elevation={2}>
                                <div className={classes.selectionRoot}>
                                    <form className={classes.formRoot} onSubmit={e => {
                                        e.preventDefault();
                                        addConsultantType({
                                            variables: {
                                                name: this.state.ConsultantType.name,
                                                createdById: this.state.userId,
                                            },
                                            refetchQueries: [{ query: GET_FieldOfConsultant }]

                                        })
                                            .catch(error => { console.log(error) });
                                        this.setState({
                                            ConsultantType: {
                                                name: '',
                                                createdById: '',
                                            }
                                        });

                                    }} autoComplete="off">
                                        <FormControl className={classes.formControl} variant="outlined" color="primary">
                                            <TextField
                                                id="outlined-with-placeholder"
                                                label="Field Of Consulting"
                                                placeholder="Enter Name"
                                                variant="outlined"
                                                fullWidth={true}
                                                value={this.state.ConsultantType.name}
                                                onChange={this.handleNameChange}
                                            />
                                        </FormControl>

                                        <Button type='submit' variant="outlined" color="primary" className={classes.formControl}>Add</Button>
                                    </form>
                                </div>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :{String(error).toString()}</p>}


                            </Paper>
                        )}

                    </Mutation>
                    :
                    <Mutation mutation={UPDATE_FieldOfConsultant} onCompleted={(data) => alert(data + " is updated success fully")}>
                        {(updateConsultantType, { loading, error, data }) => (
                            <Paper className={classes.root} elevation={2}>
                                <div className={classes.selectionRoot}>
                                    <form className={classes.formRoot} onSubmit={e => {
                                        e.preventDefault();
                                        updateConsultantType({
                                            variables: {
                                                _id: this.state.ConsultantType._id,
                                                name: this.state.ConsultantType.name,
                                            },
                                            refetchQueries: [{ query: GET_FieldOfConsultant }]

                                        })
                                            .catch(error => { console.log(error) });


                                    }} autoComplete="off">
                                        <FormControl className={classes.formControl} variant="outlined" color="primary">
                                            <TextField
                                                id="outlined-with-placeholder"
                                                label="Field Of Consulting"
                                                placeholder="Enter Name"
                                                variant="outlined"
                                                fullWidth={true}
                                                value={this.state.ConsultantType.name}
                                                onChange={this.handleNameChange}
                                            />
                                        </FormControl>

                                        <Button type='submit' variant="outlined" color="primary" className={classes.formControl}>Update</Button>
                                    </form>
                                </div>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :{String(error).toString()}</p>}


                            </Paper>
                        )}

                    </Mutation>

                }
                <Paper className={classes.root}>

                    <Query query={GET_FieldOfConsultant}>

                        {({ loading, error, data }) => {
                            if (loading) return "Loading...";
                            if (error) return `Error! ${error.message}`;
                            return (
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="center">Edit/Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            data.consultantType.map(consultantType => (
                                                <TableRow key={consultantType._id}>
                                                    <TableCell component="th" scope="row">
                                                        {consultantType.name}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Tooltip title="Edit">
                                                            <IconButton aria-label="Edit" onClick={() => {
                                                                this.setState({ ConsultantType: { ...consultantType } });
                                                                this.setState({ editMode: true });
                                                            }
                                                            }>
                                                                <CreateIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Mutation mutation={DELETE_FieldOfConsultant}>
                                                            {(deleteFieldOfConsultant, { loading, error, data }) => (
                                                                <Tooltip title="Delete">
                                                                    <IconButton aria-label="Delete" onClick={() => {
                                                                        deleteFieldOfConsultant({ variables: { _id: consultantType._id }, refetchQueries: [{ query: GET_FieldOfConsultant }] })
                                                                    }}>
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            )}
                                                        </Mutation>

                                                    </TableCell>
                                                </TableRow>
                                            )
                                            )
                                        }

                                    </TableBody>
                                </Table>
                            )
                        }}

                    </Query>
                </Paper>

            </MuiThemeProvider>
        );
    }
}

export default withStyles(ConsultantTypeStyles)(ConsultantType);