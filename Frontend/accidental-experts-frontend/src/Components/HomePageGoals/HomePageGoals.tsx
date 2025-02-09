import React, { Component } from 'react';
import './HomePageGoals.scss';

interface HomePageGoalsProps {
    heading: string;
    text: string;
    imageUrl: string;
    backGroundColor?: string;
}

class HomePageGoals extends Component<HomePageGoalsProps> {
    render() {
        const { heading, text, imageUrl, backGroundColor } = this.props;
        return (
            <div className={`homePageGoalsContainer ${backGroundColor}`}>
                <div className={'homePageGoalsHeadingWrapper'}>
                    <h2 className="homePageGoalsHeading">{heading}</h2>
                    <p className="homePageGoalsDescription">{text}</p>
                </div>
                <div>
                    <img
                        className="homePageGoalsImage"
                        src={imageUrl}
                        alt="Home Page Goal"
                    />
                </div>
            </div>
        );
    }
}

export default HomePageGoals;
