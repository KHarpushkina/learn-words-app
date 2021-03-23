import React from "react";
import "./WordCard.scss";
import { Card, CardContent, CardActions, Button, Grid } from "@material-ui/core";

type WordCardProps = {
    word: any;
};

const WordCard = (props: WordCardProps): JSX.Element => (
    <Grid container item xs={2}>
        <Card classes={{ root: "word-card" }} style={{ backgroundColor: "#d9bdad" }}>
            <CardContent>{props.word.spelling}</CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    </Grid>
);

export default WordCard;
