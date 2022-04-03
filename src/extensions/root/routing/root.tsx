import {RouteWithChildren, RoutingArea} from '@dhampir/core';
import {Body, CustomLayout} from '@components/layout';

const routes: RouteWithChildren = {
    id: 'defaultRoute',
    path: '/',
    rendering: [
        {
            area: RoutingArea.BODY,
            component: Body,
        },
    ],
    component: CustomLayout,
};

export {
    routes as default,
}

