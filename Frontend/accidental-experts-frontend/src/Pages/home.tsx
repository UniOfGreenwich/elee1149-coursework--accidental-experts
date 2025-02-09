import React from 'react';
import HomePageGoals from "../Components/HomePageGoals/HomePageGoals.tsx";

export default function HomePage() {
    return (
        <div>
            <HomePageGoals heading="Hello World" text="Hello World" imageUrl="https://via.placeholder.com/150" />
            <HomePageGoals heading="Hello World" text="Hello World" imageUrl="https://via.placeholder.com/150" backGroundColor={"jaguarGreen"} />
            <HomePageGoals heading="Hello World" text="Hello World" imageUrl="https://via.placeholder.com/150" />
        </div>
    );
}