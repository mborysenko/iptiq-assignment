import { PageOptions } from './API';
import { Column, Decorator, Spacer, Scroller, Units } from '@dhampir/core';
import {FunctionComponent} from "react";

export const Page: FunctionComponent<PageOptions> = () => {
    return <Column greedy={true}>
        <Decorator holdsAbsolute={true}>
            <Scroller>
                <Spacer space={1} units={Units.EM}>

                </Spacer>
            </Scroller>
        </Decorator>
    </Column>;
};


