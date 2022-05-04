import React from 'react';
import { Container, Point, Line, Text } from './ProgressBar.styled';

const ProgressBar = ({ progress }) => {
    console.log(progress);

    return (
        <Container>
            <Point id="first-checkmark" progress={progress}>
                <Text>Upload document</Text>
            </Point>
            <Line id="first-line" progress={progress}></Line>
            <Point id="second-checkmark" progress={progress}>
                <Text>Fill in details</Text>
            </Point>
            <Line id="second-line" progress={progress}></Line>
            <Point id="third-checkmark" progress={progress}>
                <Text>Preview your work</Text>
            </Point>
            <Line id="third-line" progress={progress}></Line>
            <Point id="fourth-checkmark" progress={progress}>
                <Text>Publish your book</Text>
            </Point>
        </Container>
    )
};

export default ProgressBar;
