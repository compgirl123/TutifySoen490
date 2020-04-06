import React from 'react';
import DashBoardNavBar from '../DashBoardNavBar';
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

    componentDidMount() {
        this.getAllResources();
    }

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
            .catch(err => console.error("Could not get the resources from the database: " + err));
    }

    render() {
        const { classes } = this.props;
        const { primary, secondary, postsecondary } = this.props.location.state;
        const { primaryResources, secondaryResources, postsecResources } = this.state;

        return (
            <React.Fragment>
                <DashBoardNavBar />
                <div className={classes.resources}>
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