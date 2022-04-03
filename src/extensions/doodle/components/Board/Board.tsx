import {FC} from "react";
import {BoardProps} from "./types";
import {Direction, Row, Screen, Scroller} from "@dhampir/core";
import {Box, Typography} from "@mui/material";
import classnames from "classnames";

import styles from './styles.less';

export const Board: FC<BoardProps> = ({children, title}) => {
    return <Screen fullScreen={true} direction={Direction.VERTICAL}>
        <Row>
            <Box sx={{
                borderBottom: '1px solid #ddd',
                width: '100%',
            }}>
            <Typography sx={{
            padding: '0.1em 0.5em'
        }} variant={'h2'}>{title}</Typography>
            </Box>
        </Row>
        <Row greedy={true} holdsAbsolute={true} className={classnames(styles)}><Scroller>
            <Row greedy={true}>{children}</Row>
        </Scroller></Row>
    </Screen>
}
