import React from 'react';
class GoogleMaps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3569.198198587686!2d88.7015553150372!3d26.545899983286965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e47bce687f169d%3A0x4152036d0d736d37!2sJalpaiguri+Government+Engineering+College!5e0!3m2!1sen!2sin!4v1482905008918"
                aria-hidden="true"
                frameBorder="1"
                tabIndex="-1"
                style={{
                    zIndex: '2',
                    position: 'relative',
                    width: '100%',

                    height: '100%',
                    borderWidth: '0px',

                    borderColor: 'black'
                }}></iframe>
        );
    }
}

export default GoogleMaps;
