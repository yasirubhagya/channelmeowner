import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Paper from '@material-ui/core/Paper';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import { GET_Doctors, GET_Channels, ADD_Channels, DELETE_Channels,UPDATE_Channels } from '../../gql';
import { Query, Mutation } from "react-apollo";
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { InlineDatePicker, InlineTimePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";





const styles = theme => ({

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


    viewroot: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});


class Channels extends Component {
    state = {
        Channel: {
            _id: '',
            doctorId: '',
            timeFrom: new Date(),
            timeTo: new Date(),
            chitLimit: '',
            doctorFees: '',
            channelFees: '',
            tax: '',
            status:''
        },
        editMode: false,
        labelWidth: 0

    }



    theme = createMuiTheme({
        palette: {
            primary: { main: lightGreen['A400'] }, // Purple and green play nicely together.
            secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
        },
        typography: { useNextVariants: true },
    });

    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
        });
    }

    handleChange = (event) => {
        this.setState({ Channel: { ...this.state.Channel, doctorId: event.target.value } });

    };
    handleStatusChange=(event)=>{
        this.setState({ Channel: { ...this.state.Channel, status: event.target.value } });
    }
    handleDateChange = (date) => {
        console.log(date);
        let dt = new Date(date)
        this.setState({
            Channel: {
                ...this.state.Channel, timeFrom: new Date(this.state.Channel.timeFrom).setFullYear(dt.getFullYear(), dt.getMonth(), dt.getDate()),
                timeTo: new Date(this.state.Channel.timeTo).setFullYear(dt.getFullYear(), dt.getMonth(), dt.getDate())
            }
        });

    };
    handleTimeFromChange = (time) => {
        console.log(time);
        this.setState({ Channel: { ...this.state.Channel, timeFrom: new Date(time) } });
    };
    handleTimeToChange = (time) => {
        this.setState({ Channel: { ...this.state.Channel, timeTo: new Date(time) } });
    };

    handleChitLimitChange = (event) => {
        this.setState({ Channel: { ...this.state.Channel, chitLimit: parseInt(event.target.value) } });
    };
    handleDoctorFeeChange = (event) => {
        this.setState({ Channel: { ...this.state.Channel, doctorFees: parseFloat(event.target.value) } });
    };
    handleChannelFeeChange = (event) => {
        this.setState({ Channel: { ...this.state.Channel, channelFees: parseFloat(event.target.value) } });
    };
    handleTaxChange = (event) => {
        this.setState({ Channel: { ...this.state.Channel, tax: parseFloat(event.target.value) } });
    };


    render() {

        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={this.theme}>

                {
                    !this.state.editMode ?
                        <Mutation mutation={ADD_Channels} onCompleted={(data) => alert(data + " is added success fully")}>
                            {(addChannel, { loading, error, data }) => (
                                <Paper className={classes.root} elevation={2}>
                                    <div className={classes.selectionRoot}>
                                        <form className={classes.formRoot} onSubmit={e => {
                                            e.preventDefault();
                                            addChannel({
                                                variables: {
                                                    doctorId: this.state.Channel.doctorId,
                                                    timeFrom: this.state.Channel.timeFrom.toISOString(),
                                                    timeTo: this.state.Channel.timeTo.toISOString(),
                                                    chitLimit: this.state.Channel.chitLimit,
                                                    doctorFees: this.state.Channel.doctorFees,
                                                    channelFees: this.state.Channel.channelFees,
                                                    tax: this.state.Channel.tax
                                                },
                                                refetchQueries: [{ query: GET_Channels }]

                                            })
                                                .catch(error => { console.log(error) });

                                        }} autoComplete="off">
                                            <FormControl className={classes.formControl} variant="outlined" color="primary">
                                                <InputLabel
                                                    ref={ref => {
                                                        this.InputLabelRef = ref;
                                                    }}
                                                    htmlFor="outlined-age-simple"
                                                >
                                                    Doctor
                                                </InputLabel>
                                                <Query query={GET_Doctors}>
                                                    {({ loading, error, data }) => {
                                                        if (loading) return <MenuItem value=''>Loading...</MenuItem>;
                                                        if (error) return <MenuItem value=''>Error...</MenuItem>;
                                                        return (
                                                            <Select
                                                                value={this.state.Channel.doctorId}
                                                                onChange={this.handleChange}
                                                                input={
                                                                    <OutlinedInput
                                                                        labelWidth={this.state.labelWidth}
                                                                        name="FieldOfConsulting"
                                                                        id="outlined-age-simple"
                                                                    />
                                                                }
                                                            >
                                                                <MenuItem value="">
                                                                    <em>None</em>
                                                                </MenuItem>
                                                                {
                                                                    data.doctors.map(item => {
                                                                        return <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                                                                    })
                                                                }
                                                            </Select>);
                                                    }}
                                                </Query>
                                            </FormControl>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <FormControl className={classes.formControl} variant="outlined" color="primary">
                                                    <InlineDatePicker
                                                        keyboard
                                                        clearable
                                                        variant="outlined"
                                                        label="Choose a Date"
                                                        value={this.state.Channel.timeFrom}
                                                        onChange={this.handleDateChange}
                                                        format="dd/MM/yyyy"
                                                        mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}

                                                    />
                                                </FormControl>
                                                <FormControl className={classes.formControl} variant="outlined" color="primary">
                                                    <InlineTimePicker
                                                        clearable
                                                        variant="outlined"
                                                        ampm={false}
                                                        label="From"
                                                        value={this.state.Channel.timeFrom}
                                                        onChange={this.handleTimeFromChange}
                                                    />
                                                </FormControl>
                                                <FormControl className={classes.formControl} variant="outlined" color="primary">
                                                    <InlineTimePicker
                                                        clearable
                                                        variant="outlined"
                                                        ampm={false}
                                                        label="To"
                                                        value={this.state.Channel.timeTo}
                                                        onChange={this.handleTimeToChange}
                                                    />
                                                </FormControl>

                                            </MuiPickersUtilsProvider>

                                            <FormControl className={classes.formControl} variant="outlined" color="primary">
                                                <TextField
                                                    id="outlined-with-placeholder"
                                                    label="Chit Limit"
                                                    placeholder="Enter Chit Limit"
                                                    variant="outlined"
                                                    color="primary"
                                                    fullWidth={true}
                                                    value={this.state.Channel.chitLimit}
                                                    onChange={this.handleChitLimitChange}
                                                />
                                            </FormControl>
                                            <FormControl className={classes.formControl} variant="outlined" color="primary">
                                                <TextField
                                                    id="outlined-with-placeholder"
                                                    label="Doctor Fee"
                                                    placeholder="Enter Doctor Fee"
                                                    variant="outlined"
                                                    color="primary"
                                                    fullWidth={true}
                                                    value={this.state.Channel.doctorFees}
                                                    onChange={this.handleDoctorFeeChange}
                                                />
                                            </FormControl>
                                            <FormControl className={classes.formControl} variant="outlined" color="primary">
                                                <TextField
                                                    id="outlined-with-placeholder"
                                                    label="Channel Fee"
                                                    placeholder="Enter Channel Fee"
                                                    variant="outlined"
                                                    color="primary"
                                                    fullWidth={true}
                                                    value={this.state.Channel.channelFees}
                                                    onChange={this.handleChannelFeeChange}
                                                />
                                            </FormControl>
                                            <FormControl className={classes.formControl} variant="outlined" color="primary">
                                                <TextField
                                                    id="outlined-with-placeholder"
                                                    label="Tax"
                                                    placeholder="Enter Tax"
                                                    variant="outlined"
                                                    color="primary"
                                                    fullWidth={true}
                                                    value={this.state.Channel.tax}
                                                    onChange={this.handleTaxChange}
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
                        <Mutation mutation={UPDATE_Channels} onCompleted={(data) => alert(data + " is added success fully")}>
                            {(updateChannel, { loading, error, data }) => (
                                <Paper className={classes.root} elevation={2}>
                                    <div className={classes.selectionRoot}>
                                        <form className={classes.formRoot} onSubmit={e => {
                                            e.preventDefault();
                                            updateChannel({
                                                variables: {
                                                    _id:this.state.Channel._id,
                                                    doctorId: this.state.Channel.doctorId,
                                                    timeFrom: this.state.Channel.timeFrom.toISOString(),
                                                    timeTo: this.state.Channel.timeTo.toISOString(),
                                                    chitLimit: this.state.Channel.chitLimit,
                                                    doctorFees: this.state.Channel.doctorFees,
                                                    channelFees: this.state.Channel.channelFees,
                                                    tax: this.state.Channel.tax,
                                                    status:this.state.Channel.status,
                                                },
                                                refetchQueries: [{ query: GET_Channels }]

                                            })
                                                .catch(error => { console.log(error) });

                                        }} autoComplete="off">
                                            <FormControl className={classes.formControl} variant="outlined" color="primary">
                                                <InputLabel
                                                    ref={ref => {
                                                        this.InputLabelRef = ref;
                                                    }}
                                                    htmlFor="outlined-age-simple"
                                                >
                                                    Doctor
                                                </InputLabel>
                                                <Query query={GET_Doctors}>
                                                    {({ loading, error, data }) => {
                                                        if (loading) return <MenuItem value=''>Loading...</MenuItem>;
                                                        if (error) return <MenuItem value=''>Error...</MenuItem>;
                                                        return (
                                                            <Select
                                                                value={this.state.Channel.doctorId}
                                                                onChange={this.handleChange}
                                                                input={
                                                                    <OutlinedInput
                                                                        labelWidth={this.state.labelWidth}
                                                                        name="FieldOfConsulting"
                                                                        id="outlined-age-simple"
                                                                    />
                                                                }
                                                                disabled={true}
                                                            >
                                                                <MenuItem value="">
                                                                    <em>None</em>
                                                                </MenuItem>
                                                                {
                                                                    data.doctors.map(item => {
                                                                        return <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                                                                    })
                                                                }
                                                            </Select>);
                                                    }}
                                                </Query>
                                            </FormControl>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <FormControl className={classes.formControl} variant="outlined" color="primary">
                                                    <InlineDatePicker
                                                        keyboard
                                                        clearable
                                                        variant="outlined"
                                                        label="Choose a Date"
                                                        value={this.state.Channel.timeFrom}
                                                        onChange={this.handleDateChange}
                                                        format="dd/MM/yyyy"
                                                        mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}

                                                    />
                                                </FormControl>
                                                <FormControl className={classes.formControl} variant="outlined" color="primary">
                                                    <InlineTimePicker
                                                        clearable
                                                        variant="outlined"
                                                        ampm={false}
                                                        label="From"
                                                        value={this.state.Channel.timeFrom}
                                                        onChange={this.handleTimeFromChange}
                                                    />
                                                </FormControl>
                                                <FormControl className={classes.formControl} variant="outlined" color="primary">
                                                    <InlineTimePicker
                                                        clearable
                                                        variant="outlined"
                                                        ampm={false}
                                                        label="To"
                                                        value={this.state.Channel.timeTo}
                                                        onChange={this.handleTimeToChange}
                                                    />
                                                </FormControl>

                                            </MuiPickersUtilsProvider>

                                            <FormControl className={classes.formControl} variant="outlined" color="primary">
                                                <TextField
                                                    id="outlined-with-placeholder"
                                                    label="Chit Limit"
                                                    placeholder="Enter Chit Limit"
                                                    variant="outlined"
                                                    color="primary"
                                                    fullWidth={true}
                                                    value={this.state.Channel.chitLimit}
                                                    onChange={this.handleChitLimitChange}
                                                />
                                            </FormControl>
                                            <FormControl className={classes.formControl} variant="outlined" color="primary">
                                                <TextField
                                                    id="outlined-with-placeholder"
                                                    label="Doctor Fee"
                                                    placeholder="Enter Doctor Fee"
                                                    variant="outlined"
                                                    color="primary"
                                                    fullWidth={true}
                                                    value={this.state.Channel.doctorFees}
                                                    onChange={this.handleDoctorFeeChange}
                                                />
                                            </FormControl>
                                            <FormControl className={classes.formControl} variant="outlined" color="primary">
                                                <TextField
                                                    id="outlined-with-placeholder"
                                                    label="Channel Fee"
                                                    placeholder="Enter Channel Fee"
                                                    variant="outlined"
                                                    color="primary"
                                                    fullWidth={true}
                                                    value={this.state.Channel.channelFees}
                                                    onChange={this.handleChannelFeeChange}
                                                />
                                            </FormControl>
                                            <FormControl className={classes.formControl} variant="outlined" color="primary">
                                                <TextField
                                                    id="outlined-with-placeholder"
                                                    label="Tax"
                                                    placeholder="Enter Tax"
                                                    variant="outlined"
                                                    color="primary"
                                                    fullWidth={true}
                                                    value={this.state.Channel.tax}
                                                    onChange={this.handleTaxChange}
                                                />
                                            </FormControl>
                                            <FormControl className={classes.formControl} variant="outlined" color="primary">
                                                <InputLabel
                                                    ref={ref => {
                                                        this.InputLabelRef = ref;
                                                    }}
                                                    htmlFor="outlined-status"
                                                >
                                                    Status
                                                </InputLabel>
                                                <Select
                                                    value={this.state.Channel.status}
                                                    onChange={this.handleStatusChange}
                                                    input={
                                                        <OutlinedInput
                                                            labelWidth={this.state.labelWidth}
                                                            name="FieldOfConsulting"
                                                            id="outlined-status"
                                                        />
                                                    }
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>

                                                    <MenuItem key='active' value='active'>Active</MenuItem>
                                                    <MenuItem key='closed' value='closed'>Closed</MenuItem>
                                                </Select>
                                            </FormControl>

                                            <Button type='submit' variant="outlined" color="primary" className={classes.formControl}>UPDATE</Button>
                                        </form>
                                    </div>
                                    {loading && <p>Loading...</p>}
                                    {error && <p>Error :{String(error).toString()}</p>}


                                </Paper>
                            )}

                        </Mutation>


                }


                <Paper className={classes.viewroot}>
                    <Query query={GET_Channels}>

                        {({ loading, error, data }) => {
                            if (loading) return "Loading...";
                            if (error) return `Error! ${error.message}`;
                            return (

                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Doctor</TableCell>
                                            <TableCell align="right">Date</TableCell>
                                            <TableCell align="right">From</TableCell>
                                            <TableCell align="right">To</TableCell>
                                            <TableCell align="right">Chit Limit</TableCell>
                                            <TableCell align="right">Doctor Fee</TableCell>
                                            <TableCell align="right">Channel Fee</TableCell>
                                            <TableCell align="right">Tax</TableCell>
                                            <TableCell align="center">Edit/Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            data.channel.map(channel => (

                                                <TableRow key={channel._id}>
                                                    <TableCell component="th" scope="row">
                                                        {channel.doctor.name}
                                                    </TableCell>
                                                    <TableCell align="right">{new Date(parseInt(channel.timeFrom)).toLocaleDateString()}</TableCell>
                                                    <TableCell align="right">{new Date(parseInt(channel.timeFrom)).toLocaleTimeString()}</TableCell>
                                                    <TableCell align="right">{new Date(parseInt(channel.timeTo)).toLocaleTimeString()}</TableCell>
                                                    <TableCell align="right">{channel.chitLimit}</TableCell>
                                                    <TableCell align="right">{channel.doctorFees}</TableCell>
                                                    <TableCell align="right">{channel.channelFees}</TableCell>
                                                    <TableCell align="right">{channel.tax}</TableCell>
                                                    <TableCell align="right">
                                                        <Tooltip title="Edit">
                                                            <IconButton aria-label="Edit" onClick={() => {
                                                                this.setState({
                                                                    Channel: {
                                                                        _id: channel._id,
                                                                        doctorId: channel.doctor._id,
                                                                        timeFrom: new Date(parseInt(channel.timeFrom)),
                                                                        timeTo: new Date(parseInt(channel.timeTo)),
                                                                        chitLimit: channel.chitLimit,
                                                                        doctorFees: channel.doctorFees,
                                                                        channelFees: channel.channelFees,
                                                                        tax: channel.tax,
                                                                        status: channel.status
                                                                    }
                                                                })
                                                                this.setState({ editMode: true });
                                                            }
                                                            }>
                                                                <CreateIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Mutation mutation={DELETE_Channels}>
                                                            {(deleteChannel, { loading, error, data }) => (
                                                                <Tooltip title="Delete">
                                                                    <IconButton aria-label="Delete" onClick={() => {
                                                                        deleteChannel({ variables: { _id: channel._id }, refetchQueries: [{ query: GET_Channels }] })
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
            </MuiThemeProvider >
        );
    }
}

Channels.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Channels);
