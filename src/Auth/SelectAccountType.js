import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const SelectAccountTypeStyles = theme => ({
    root:{
        margin:'1rem',
        display:'flex'
    },
    radioGroup:{
        display: 'inline'
    }
})

const SelectAccountType = (props) => {
const {classes} = props
    return (
        <div className={classes.root}>
        <RadioGroup
            className={classes.radioGroup}
            aria-label="AccountType"
            name="accountType"

            value={props.user.userType}
            onChange={event=>props.handleSetUser({...props.user,userType:event.target.value})}
        >
            <FormControlLabel value="NU" control={<Radio />} label="I'm a Normal user" />
            <FormControlLabel value="CCU" control={<Radio />} label="I'm a channeling center" />
        </RadioGroup>
        </div>
    );
}

export default withStyles(SelectAccountTypeStyles)(SelectAccountType);