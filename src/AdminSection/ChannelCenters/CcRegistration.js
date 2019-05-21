import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Query, Mutation } from "react-apollo";
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import lightGreen from '@material-ui/core/colors/lightGreen';
import TextField from '@material-ui/core/TextField';
import { ADD_ChannelCenter } from '../../gql';

const Styles = theme => ({
    card: {
        maxWidth: '600px',
        margin: '0.5rem',
        padding: '2rem',
        textAlign: 'center',
    },

    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },


});


class CcRegistration extends Component {
    theme = createMuiTheme({
        palette: {
            primary: { main: lightGreen[600] }, // Purple and green play nicely together.
            secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
        },
        typography: { useNextVariants: true },
    });
    state = {
        channelCenter: {
            regNo: '',
            email: '',
            name: '',
            owner: '',
            address: '',
            phoneNo: '',
        }
    };


    handleSetChannelCenter = name => event => {
        this.setState({ channelCenter: { ...this.state.channelCenter, [name]: event.target.value } });
    };



    render() {

        const { classes } = this.props;


        return (
            <MuiThemeProvider theme={this.theme}>
                <Card className={classes.card}>
                    <CardHeader title={<Typography variant="h4" color="primary">CC Registration</Typography>} />
                    <Divider />
                    <CardContent>
                        <div>
                            <TextField
                                label="RegNo"
                                fullWidth={true}
                                value={this.state.channelCenter.regNo}
                                onChange={this.handleSetChannelCenter('regNo')}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                label="E-mail"
                                fullWidth={true}
                                value={this.state.channelCenter.email}
                                onChange={this.handleSetChannelCenter('email')}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField

                                label="Name"
                                fullWidth={true}
                                value={this.state.channelCenter.name}
                                onChange={this.handleSetChannelCenter('name')}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField

                                label="Owner"
                                fullWidth={true}
                                value={this.state.channelCenter.owner}
                                onChange={this.handleSetChannelCenter('owner')}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField

                                label="Address"
                                fullWidth={true}
                                value={this.state.channelCenter.address}
                                onChange={this.handleSetChannelCenter('address')}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                label="PhoneNo"
                                fullWidth={true}
                                value={this.state.channelCenter.phoneNo}
                                onChange={this.handleSetChannelCenter('phoneNo')}
                                margin="normal"
                                variant="outlined"
                            />
                            <Mutation mutation={ADD_ChannelCenter} onCompleted={(data) => alert(data + " is added success fully")} onError ={(error)=> alert(error)}>
                                {(addChannelCenter, { loading, error, data }) => (
                                    <Button color='primary' variant="outlined" fullWidth
                                        onClick={(e)=>
                                            addChannelCenter({
                                                variables: {
                                                    regNo: this.state.channelCenter.regNo,
                                                    email: this.state.channelCenter.email,
                                                    name: this.state.channelCenter.name,
                                                    owner: this.state.channelCenter.owner,
                                                    address: this.state.channelCenter.address,
                                                    phoneNo: this.state.channelCenter.phoneNo,
                                                }
                                            }).catch(error => {
                                                console.log(error)
                                            })
                                        }
                                    >
                                        Create Channel Center
                                </Button>
                                )}
                            </Mutation>
                        </div>
                    </CardContent>
                </Card>
            </MuiThemeProvider>


        );
    }

}

export default withStyles(Styles)(CcRegistration);