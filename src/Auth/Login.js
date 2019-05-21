import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import { ApolloConsumer } from "react-apollo";
import { LOGIN } from '../gql'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import { Button } from '@material-ui/core';


const Styles = theme => ({
    card: {
        maxWidth: '450px',
        margin: 'auto',
        marginTop:'10rem'
    },
    root: {
        width: '100%',
        textAlign: 'center',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    
});

class Login extends Component {

    state = { isLogedinWithgoogle: false }

    theme = createMuiTheme({
        palette: {
            primary: { main: lightGreen[600] }, // Purple and green play nicely together.
            secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
        },
        typography: { useNextVariants: true },
    });
    LoginSuccess = (response) => {
        localStorage.setItem('authToken', response.tokenId);
        console.log( response.tokenId);
        this.setState({ isLogedinWithgoogle: true });
    }
    LoginFailure = (response) => {
        console.log('error', response.error);
    }


    render() {
        const { classes } = this.props;
        return (

            <MuiThemeProvider theme={this.theme}>
                <Card className={classes.card}>
                    <CardHeader title={<Typography variant="h4" color="primary" align='center'>ChannelMe DashBoard</Typography>} />
                    <Divider />
                    <CardContent className={classes.root}>
                        {!this.state.isLogedinWithgoogle ?
                            <GoogleLogin
                                clientId="247899695031-i2lrgqjm8hoo9e0l650d68e2187fjt7v.apps.googleusercontent.com"
                                fullWidth
                                buttonText="Login"
                                onSuccess={this.LoginSuccess}
                                onFailure={this.LoginFailure}
                                cookiePolicy={'single_host_origin'}
                            />
                            :
                            <ApolloConsumer>
                                {client => (
                                    <div>

                                        <Button variant="outlined" color="primary" className={classes.button}
                                            onClick={

                                                async () => {
                                                    await client.query(
                                                        { query: LOGIN,
                                                          context:{ headers: { authorization: localStorage.getItem('authToken') ? `Bearer ${localStorage.getItem('authToken')}` : null } }
                                                         }
                                                        ).then(({ data }) => {
                                                        if (data.logInOwnerUser) {
                                                            localStorage.setItem('user',JSON.stringify(data.logInOwnerUser));
                                                            this.props.setUserHandle(data.logInOwnerUser);
                                                            this.props.history.push('/')
                                                        }
                                                    }).catch(errors => {
                                                        localStorage.removeItem('authToken'); alert("Failed To LogIn" + errors);
                                                    });

                                                }
                                            }
                                        >
                                            Complete Sign In
                                         </Button>
                                    </div>
                                )}
                            </ApolloConsumer>
                        }
                    </CardContent>
                </Card>
            </MuiThemeProvider>
        );
    }

}

Login.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }),
    setUserHandle: PropTypes.func.isRequired,
};

export default withRouter(withStyles(Styles)(Login));