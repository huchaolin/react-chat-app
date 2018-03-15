import React, {Component} from 'react';
import logoImg from './job.png';
class AppLogo extends Component {
    render() {
        return (<div style={{margin: "30px 10px 20px", textAlign: "center"
        }}>
            <img src={logoImg} alt=""></img>
        </div>)
    }
};
export default AppLogo;