import React, {Component} from 'react';
class AppLogo extends Component {
    render() {
        return (<div style={{textAlign: "center"
        }}>
            <img src={require('./job.png')} style={{width:'100%', borderRadius:'5%'}} alt=""></img>
        </div>)
    }
};
export default AppLogo;