
import { Mutation, Query } from "react-apollo";
import React, { Component } from 'react';
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
import MenuItem from '@material-ui/core/MenuItem';
import { REMOVE_DoctorFromannelCenter,ADD_DoctorTOChannelCenter, GET_Doctors, GET_ChannelCenter } from '../../gql';
import Select from './SelectComponent';

const Styles = theme => ({
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


class DoctorsOfChannelCenter extends Component {

    state = {
        doctor: {
            _id: '',
        }

    }



    theme = createMuiTheme({
        palette: {
            primary: { main: lightGreen['A400'] }, // Purple and green play nicely together.
            secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
        },
        typography: { useNextVariants: true },
    });


    handleNameChange = (option) => {
        this.setState({ doctor: { _id: option ? option.value : '' } });
    };




    render() {

        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={this.theme}>

                <Mutation mutation={ADD_DoctorTOChannelCenter} onCompleted={(data) => alert(data + " is added success fully")}>
                    {(addDoctor, { loading, error, data }) => (
                        <Paper className={classes.root} elevation={2}>
                            <div className={classes.selectionRoot}>
                                <form className={classes.formRoot} onSubmit={e => {
                                    e.preventDefault();
                                    addDoctor({
                                        variables: {
                                            doctorId: this.state.doctor._id,
                                        },
                                        refetchQueries: [{ query: GET_ChannelCenter }]

                                    })
                                        .catch(error => { console.log(error) });


                                }} autoComplete="off">
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <Query query={GET_Doctors}>
                                            {({ loading, error, data }) => {
                                                if (loading) return <p>Loading...</p>;
                                                if (error) return <MenuItem value=''>Error...</MenuItem>;
                                                let options = data.doctors.map(item => ({
                                                    value: item._id,
                                                    label: item.name,
                                                }));
                                                return (
                                                    <Select placeholder='Doctor' options={options} handleChange={this.handleNameChange} />
                                                )
                                            }}
                                        </Query>
                                    </FormControl>

                                    <Button type='submit' variant="outlined" color="primary" className={classes.formControl}>Add</Button>
                                </form>
                            </div>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error :{String(error).toString()}</p>}


                        </Paper>
                    )}

                </Mutation>



                <Paper className={classes.root}>

                    <Query query={GET_ChannelCenter}>

                        {({ loading, error, data }) => {
                            if (loading) return "Loading...";
                            if (error) return `Error! ${error.message}`;
                            console.log(data)
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
                                            data.channelCenter.doctors.map(item => (
                                                <TableRow key={item._id}>
                                                    <TableCell component="th" scope="row">
                                                        {item.name}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Mutation mutation={REMOVE_DoctorFromannelCenter}>
                                                            {(removeDoctor, { loading, error, data }) => (
                                                                <Tooltip title="Delete">
                                                                    <IconButton aria-label="Delete" onClick={() => {
                                                                        removeDoctor({ variables: { doctorId: item._id }, refetchQueries: [{ query: GET_ChannelCenter }] })
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

export default withStyles(Styles)(DoctorsOfChannelCenter);