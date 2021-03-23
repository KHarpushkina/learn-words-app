import React from "react";
import { Container } from "@material-ui/core";
import "./MainPage.scss";

import NavigationBar from "../../components/layout/NavigationBar/NavigationBar";
import ManageWordsSet from "../../containers/ManageWordsSet/ManageWordsSet";

const MainPage = (): JSX.Element => (
    <div>
        <NavigationBar></NavigationBar>
        <Container className="main-content-container">
            <ManageWordsSet message="ddd"></ManageWordsSet>
        </Container>
    </div>
);

export default MainPage;
