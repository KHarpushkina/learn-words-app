import React, { Component } from "react";
import { Grid } from "@material-ui/core";

import WordCard from "../../components/WordCard/WordCard";

type ManageWordsSetProps = {
    message: string;
};

type ManageWordsSetState = {
    words: Array<any>;
};

class ManageWordsSet extends Component<ManageWordsSetProps, ManageWordsSetState> {
    state: ManageWordsSetState = {
        words: [
            {
                spelling: "book",
                translation: "книга",
            },
            {
                spelling: "pen",
                translation: "ручка",
            },
        ],
    };

    render() {
        return (
            <div>
                <Grid container>
                    {this.state.words.map((word: any, index: number) => {
                        return <WordCard word={word} key={index}></WordCard>;
                    })}
                </Grid>
            </div>
        );
    }
}

export default ManageWordsSet;
