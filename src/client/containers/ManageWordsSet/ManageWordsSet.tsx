import React, { Component } from "react";
import { Grid } from "@material-ui/core";

type ManageWordsSetProps = {
    message: string;
};

type ManageWordsSetState = {
    count: number;
};

const words = {
    book: "книга",
    pen: "ручка",
};

class ManageWordsSet extends Component<ManageWordsSetProps, ManageWordsSetState> {
    state: ManageWordsSetState = {
        count: 0,
    };
    render() {
        return (
            <div>
                <Grid container spacing={1}>
                    <Grid container item xs={12} spacing={3}></Grid>
                    <Grid container item xs={12} spacing={3}></Grid>
                    <Grid container item xs={12} spacing={3}></Grid>
                </Grid>
            </div>
        );
    }
}

export default ManageWordsSet;
