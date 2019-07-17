import React, { Component } from 'react';


class Users extends Component {
    
    render() {
        // console.log(this.state.users);
        const modifiedUsers = this.props.users.map((singleUser, index) => {
            return (
                <div>
                    <SingleUser user={singleUser} />
                </div>
                 
                );
            } );
        return (
            <div className="container">
                {modifiedUsers}
            </div>
        );
    }
}

export default Users;