import React from 'react';
import DashBoardNavBar from '../ProfilePage/DashBoardNavBar';
import Footer from '../Footer';
import * as ResourcesStyles from '../../styles/Resources-styles';
import { withStyles } from "@material-ui/core/styles";
import ResourceNavigation from './ResourceNavigation';
import axios from "axios";


class ResourcePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Toggle: false,
            primary: false,
            secondary: false,
            postsecondary: false,
            primaryResources: [],
            secondaryResources: [],
            postsecResources: [],
        };
    }

    componentWillMount() {
        this.checkSession();
    }

    checkSession = () => {
        fetch('/api/checkSession', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(res => {
                if (res.isLoggedIn) {
                    this.setState({
                        Toggle: true,
                    });
                    this.getAllResources();
                }
                else {
                    this.setState({ Toggle: false });
                }
            })
            .catch(err => console.error("Session could not be checked: " + err));
    };

    getAllResources = () => {
        axios.get('/api/getResources').then((res) => {
            // set the resources by education level
            this.setState({
              primaryResources: res.data.data.filter(res => res.educationLevel === "Primary"),
              secondaryResources: res.data.data.filter(res => res.educationLevel === "Secondary"),
              postsecResources: res.data.data.filter(res => res.educationLevel === "PostSecondary"),
            });
            console.info("Successfully fetched the resources");
          })
            .catch(err => console.error("Could not get the resources from the database: "+err));
    }

    imgForLevel = () => {
        if (this.props.location.state.postsecondary)
            return {
                justifyContent:'center', 
                alignItems:'center',
                minHeight: '450px',
                backgroundImage: 'url("https://24t9d72kcs873my15o9hr1pu-wpengine.netdna-ssl.com/wp-content/uploads/2018/08/student-productivity-toggl-460x275.jpg")'
            }
        if (this.props.location.state.secondary)
            return {
                minHeight: '450px',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundImage: 'url("https://westminsterlincoln.org/wp-content/uploads/2018/07/Cornwal-Public-Library-Book-Stack-Header.jpg")'
            }
        if (this.props.location.state.primary)
            return {
                minHeight: '450px',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundImage: 'url("https://images.squarespace-cdn.com/content/v1/57b93284e4fcb5fdb2aa62c0/1477843411111-R1TYUZHFJ00HAM46RF8Q/ke17ZwdGBToddI8pDm48kDxhhhwBddJ9fDxYAvV-2zp7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0lfYLKn_Tkl3ql2udpuE0YVV890f3o8Id5G8tJhHvhmC6z2Yvz7ttIxB3b9uYcWrOg/Education+Banner.png?format=2500w")'
            } 
    }


    render() {
        const { classes } = this.props;
        const { primary, secondary, postsecondary } = this.props.location.state;
        const { primaryResources, secondaryResources, postsecResources } = this.state;

        return (
            <React.Fragment>
                <DashBoardNavBar />
                <div className={classes.logo} style={this.imgForLevel()} >
                    <div style={{minHeight:'450px'}}>
                    </div>
                </div>
                <div>
                    {primary ? <ResourceNavigation res={primaryResources} /> : <></>}
                    {secondary ? <ResourceNavigation res={secondaryResources} /> : <></>}
                    {postsecondary ? <ResourceNavigation res={postsecResources} /> : <></>}
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default withStyles(ResourcesStyles.styles, { withTheme: true })(ResourcePage);