import React from 'react';

export default class Home extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                Homie this is main page. API - { process.env.API_URL }
            </div>
        )
    }
}