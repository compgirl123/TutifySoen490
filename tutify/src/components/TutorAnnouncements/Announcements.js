import React from 'react';
import Footer from '../Footer';
import TutorDashBoardNavBar from '../TutorProfile/TutorDashboardNavBar';
import Paper from '@material-ui/core/Paper';

// Tutor views all of the documents uploaded for each individual course
class Announcements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpened: false,

        };
    }

    toggleDrawer = booleanValue => () => {
        this.setState({
            drawerOpened: booleanValue
        });
    };


    componentDidMount() {
        this.checkSession();
    }

    checkSession = () => {
        fetch('http://localhost:3001/api/checkSession', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(res => {
                if (res.isLoggedIn) {
                    this.getDataFromDb()
                }

            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <Paper>
                <React.Fragment>
                <main>
                    <TutorDashBoardNavBar />
              {/* Footer */}
              <Footer />
            </main>
        </React.Fragment>
      </Paper>
        );
    }
}


export default Announcements;