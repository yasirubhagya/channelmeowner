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
import {GET_Doctors,DELETE_Doctor,Add_Doctor,UPDATE_Doctor,GET_FieldOfConsultant} from '../../gql'
import { Query, Mutation } from "react-apollo";
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';





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


class Doctor extends Component {
    state={
        Doctor: {
            name: '',
            slmcNo: '',
            isConsultant: false,
            fieldOfConsultingId:'',
            createdById: ''
        },
        fieldOfConsulting: [],
        userId: '5ca98800c9e29b2794447d29',
        editMode:false,
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
        this.setState({ Doctor: { ...this.state.Doctor, fieldOfConsultingId: event.target.value } });

    };

    handleNameChange = (event) => {
        this.setState({ Doctor: { ...this.state.Doctor, name: event.target.value } });
    };
    handleSLMCNoChange = (event) => {
        this.setState({ Doctor: { ...this.state.Doctor, slmcNo: event.target.value } });
    };


    render() {

        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={this.theme}>
                
                {
                    !this.state.editMode ?
                        <Mutation mutation={Add_Doctor} onCompleted={(data) => alert(data.addDoctor.name + " is added success fully")}>
                            {(addDoctor, { loading, error, data }) => (
                                <Paper className={classes.root} elevation={2}>
                                    <div className={classes.selectionRoot}>
                                        <form className={classes.formRoot} onSubmit={e => {
                                            e.preventDefault();
                                            addDoctor({
                                                variables: {
                                                    name: this.state.Doctor.name,
                                                    slmcNo: this.state.Doctor.slmcNo,
                                                    isConsultant: this.state.Doctor.isConsultant,
                                                    fieldOfConsultingId: this.state.Doctor.fieldOfConsultingId,
                                                    createdById: this.state.userId,
                                                },
                                                refetchQueries: [{ query: GET_Doctors }]

                                            })
                                                .catch(error => { console.log(error) });
                                            this.setState({
                                                Doctor: {
                                                    name: '',
                                                    slmcNo: '',
                                                    isConsultant: false,
                                                    fieldOfConsultingId: '',
                                                    createdById: '',
                                                }
                                            });

                                        }} autoComplete="off">
                                            <FormControl className={classes.formControl} variant="outlined" color="primary">
                                                <TextField
                                                    id="outlined-with-placeholder"
                                                    label="Doctor's Name"
                                                    placeholder="Enter Name"
                                                    variant="outlined"
                                                    fullWidth={true}
                                                    value={this.state.Doctor.name}
                                                    onChange={this.handleNameChange}
                                                />
                                            </FormControl>
                                            <FormControl className={classes.formControl} variant="outlined" color="primary">
                                                <TextField
                                                    id="outlined-with-placeholder"
                                                    label="SLMC No"
                                                    placeholder="Enter SLMC No"
                                                    variant="outlined"
                                                    color="primary"
                                                    fullWidth={true}
                                                    value={this.state.Doctor.slmcNo}
                                                    onChange={this.handleSLMCNoChange}
                                                />
                                            </FormControl>
                                            <FormControl className={classes.formControl} variant="outlined" color="primary">
                                                <InputLabel
                                                    ref={ref => {
                                                        this.InputLabelRef = ref;
                                                    }}
                                                    htmlFor="outlined-age-simple"
                                                >
                                                    Field Of Consulting
                                                </InputLabel>
                                                <Query query={GET_FieldOfConsultant}>
                                                    {({ loading, error, data }) => {
                                                        if (loading) return <MenuItem value=''>Loading...</MenuItem>;
                                                        if (error) return <MenuItem value=''>Error...</MenuItem>;
                                                        return (
                                                            <Select
                                                                value={this.state.Doctor.fieldOfConsultingId}
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
                                                                    data.consultantType.map(item => {
                                                                        return <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                                                                    })
                                                                }
                                                            </Select>);
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
                        :
                        <Mutation mutation={UPDATE_Doctor} onCompleted={(data) => {alert(data.updateDoctor.name + " is updated success fully") }}>
                            {(updateDoctor, { loading, error, data }) => (
                                <Paper className={classes.root} elevation={2}>
                                <div className={classes.selectionRoot}>
                                    <form className={classes.formRoot} onSubmit={e => {
                                        e.preventDefault();
                                        updateDoctor({
                                            variables: {
                                                _id: this.state.Doctor._id,
                                                name: this.state.Doctor.name,
                                                slmcNo: this.state.Doctor.slmcNo,
                                                isConsultant: this.state.Doctor.isConsultant,
                                                fieldOfConsultingId: this.state.Doctor.fieldOfConsultingId,
                                            },
                                            refetchQueries: [{ query: GET_Doctors }]

                                        })
                                            .catch(error => { console.log(error) });


                                    }} autoComplete="off">
                                        <FormControl className={classes.formControl} variant="outlined" color="primary">
                                            <TextField
                                                id="outlined-with-placeholder"
                                                label="Doctor's Name"
                                                placeholder="Enter Name"
                                                variant="outlined"
                                                fullWidth={true}
                                                value={this.state.Doctor.name}
                                                onChange={this.handleNameChange}
                                            />
                                        </FormControl>
                                        <FormControl className={classes.formControl} variant="outlined" color="primary">
                                            <TextField
                                                id="outlined-with-placeholder"
                                                label="SLMC No"
                                                placeholder="Enter SLMC No"
                                                variant="outlined"
                                                color="primary"
                                                fullWidth={true}
                                                value={this.state.Doctor.slmcNo}
                                                onChange={this.handleSLMCNoChange}
                                            />
                                        </FormControl>
                                        <FormControl className={classes.formControl} variant="outlined" color="primary">
                                                <InputLabel
                                                    ref={ref => {
                                                        this.InputLabelRef = ref;
                                                    }}
                                                    htmlFor="outlined-age-simple"
                                                >
                                                    Field Of Consulting
                                    </InputLabel>
                                                <Query query={GET_FieldOfConsultant}>
                                                    {({ loading, error, data }) => {
                                                        if (loading) return <MenuItem value=''>Loading...</MenuItem>;
                                                        if (error) return <MenuItem value=''>Error...</MenuItem>;
                                                        return (
                                                            <Select
                                                                value={this.state.Doctor.fieldOfConsultingId}
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
                                                                    data.consultantType.map(item => {
                                                                        return <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                                                                    })
                                                                }
                                                            </Select>);
                                                    }}
                                                </Query>
                                            </FormControl>
                                           
                                        <Button type='submit' variant="outlined" color="primary" className={classes.formControl}>Update</Button>
                                    </form>
                                    {loading && <p>Loading...</p>}
                                    {error && <p>Error :{String(error).toString()}</p>}
                                </div>
                                </Paper>
                            )}

                        </Mutation>
                }


                <Paper className={classes.viewroot}>
                    <Query query={GET_Doctors}>

                        {({ loading, error, data }) => {
                            if (loading) return "Loading...";
                            if (error) return `Error! ${error.message}`;
                            return (
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="right">SLMC NO</TableCell>
                                            <TableCell align="right">Field of Consulting</TableCell>
                                            <TableCell align="center">Edit/Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                        data.doctors.map(doctor => (
                                        <TableRow key={doctor._id}>
                                            <TableCell component="th" scope="row">
                                                {doctor.name}
                                            </TableCell>
                                            <TableCell align="right">{doctor.slmcNo}</TableCell>
                                            <TableCell align="right">{doctor.fieldOfConsulting && doctor.fieldOfConsulting.name}</TableCell>
                                            <TableCell align="right">
                                                <Tooltip title="Edit">
                                                    <IconButton aria-label="Edit" onClick={()=>{
                                                        this.setState({Doctor:{...doctor,fieldOfConsultingId:doctor.fieldOfConsulting ? doctor.fieldOfConsulting._id : ''}});
                                                        this.setState({editMode:true});
                                                    }
                                                    }>
                                                        <CreateIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Mutation mutation={DELETE_Doctor}>
                                                    {(deleteDoctor, { loading, error, data }) => (
                                                        <Tooltip title="Delete">
                                                            <IconButton aria-label="Delete" onClick={() => {
                                                                deleteDoctor({ variables: { _id: doctor._id }, refetchQueries:[{query:GET_Doctors}]})
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

Doctor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Doctor);
