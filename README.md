# Getting Started

Web application is using React as main UI library and react-query for managing async calls and global state.
I'm also using my own package(Dhampir Core) to enable extensibility and routing.

## Prerequisites

1. NodeJS of 16.13.0+
2. Yarn 1.22+
3. Connection to MongoDB Database
   1. Set `DB_URL` env variable to MongoDB database connection url

## Limitations
1. Not possible to add new or update current tasks
2. Not possible to drag and drop tasks

## Prepare
Set environment variable `DB_URL`:
```console
% export DB_URL="Put mongodb db connection link here"
```
Install dependencies:
```console
% yarn install
```

Generate client base on [Prisma](https://www.prisma.io/docs/concepts/components/prisma-client) scheme that retrieves data from the database:
```console
% yarn generate:dbclient
```

Upload example data to the database:
```console
% yarn generate:data
```

Start rest api and web application:
```console
% yarn api start
```

# Rest API
Rest api is generated based on OpenAPI specification. When you run `% yarn api` Swagger API Documentation is available on
http://localhost:3434/api-documentation. And Swagger OpenAPI specification is available on http://localhost:3444/api-docs.
To update Rest API Client you need to:
1. Stop Rest API;
2. Save specification to `% ./api/specs/doodle.json`;
3. Run `% yarn generate:service`. This command will generate typescript data models and code of the client in `./src/extensions/doodle/service` folder
4. Restart Rest API by running `% yarn api`

# Dhampir Core

Javascript library that includes features needed for building Web applications. Such as:

* Enhanced Routing
* Extensibility
* Appearance
* Components Library
* Storage
* Feature Toggling

## Enhanced Routing Feature

Introduces several new concepts such as *Root Route*, *Descendant Route*, *Routing Area*, *Area Rendering*.

**Root Route** is a *Routing Rule* that describes the top level route, literally route that is a first part of the path.

**Descendant Route** is a Routing Rule that is a child of the *Root Route* or another *Descendant Route*. Path of the child route
will be included in resulting route url. For example if *Root Route* path is `/store`, and it has Descendant Route
path `/checkout` then resulting path is `/store/checkout`.

**Routing Area** is a container in the layout of the page where *Area Renderings* are rendered. What does this mean? Routing Areas
are defined within certain Route. When path of the url matches the Route then all Area Renderings associated with this route will
be rendered in Rendering Area with id that the rule contain.

For example:

1. When registering Root Route.

```typescript jsx
import { registerRootRouting, RoutingArea } from '@dhampir/core';
import { Header, Body, Layout, MainMenu } from '@components/layout';

registerRootRouting({
    id: 'manage',
    path: "/manage",
    component: Layout,
    renderings: [
        {
            area: RoutingArea.TOP,
            component: Header,
        },
        {
            area: RoutingArea.TOP_LEFT,
            component: Logo
        },
        {
            area: RoutingArea.TOP_CENTER,
            // We are using `exact={true}` to render it only when route matches exactly
            exact: true,
            component: MainMenu
        },
    ]
});

```
>In example above if route matches `/manage`, then `Layout` component will render `Header` in Rendering Area with
name `Routing.TOP`, `Logo` component in Rendering Area with name `Routing.TOP_LEFT`, `MainMenu` component in Rendering Area with
name `Routing.TOP_CENTER`.

2. When registering Root Route, within Descendant Route.

```typescript jsx
import { registerRootRouting, RoutingArea } from '@dhampir/core';
import { LeftBar, Nav, Page } from '@components/widgets';

registerRootRouting({
    id: 'manage',
    path: "/manage",
    component: Layout,
    routes: [
        {
            path: '/products',
            rendering: [
                {
                    exact: true,
                    area: RoutingArea.BODY_LEFT,
                    component: LeftBar,
                },
                {
                    area: RoutingArea.MENU_LEFT,
                    component: Nav,
                },
                {
                    area: RoutingArea.BODY_MAIN,
                    component: Page,
                },
            ],
            navigation: {
                label: 'Manage Products',
            },
        },
    ]
});
```
>In example above if route matches `/manage/products`, then `LeftBar` component will be rendered in Rendering Area with name `Routing.BODY_LEFT`, `Nav` component - in Rendering Area with name `Routing.MENU_LEFT`, `Page` component - in Rendering Area with
name `Routing.BODY_MAIN`.
3. When extending Descendant Route.

```typescript jsx
import { extendRoute, RoutingArea } from '@dhampir/core';
extendRoute(['/manage', '/products'], {
    path: '/list',
    rendering: [
        {
            area: RoutingArea.BODY_LEFT,
            render: () => <div>Product List</div>
        },
        {
            area: RoutingArea.BODY_MAIN,
            render: () => <div>Product Details</div>
        },
    ],
    navigation: {
        label: 'Product List'
    }
});
```
>In example above if route matches `/manage/products/list`, then `render` function will be executed in order to render content in Rendering Area with name `Routing.BODY_LEFT`, the same will happen in Rendering Area with name `RoutingArea.BODY_MAIN`.

`Layout` component contains Rendering Areas represented with `Area` component. Implementation may be different.

```typescript jsx
import { FunctionComponent } from 'react';
import { useLocation } from 'react-router';

import { AppLayoutProps, Column, Screen, Row } from '../../../components';
import { Area, isAreaVisible, RoutingArea } from '../../../routing';
import { Direction } from '../../API';

const Layout: FunctionComponent<AppLayoutProps> = () => {
    const location = useLocation();
    return (
        <Screen fullScreen={true} direction={Direction.VERTICAL}>
            {isAreaVisible(RoutingArea.TOP, location.pathname) && <Row>
                <Area area={RoutingArea.TOP} />
            </Row>}
            {isAreaVisible(RoutingArea.MENU, location.pathname) && <Row>
                <Area area={RoutingArea.MENU} />
            </Row>}
            <Row greedy={true} asGrid={true}>
                {isAreaVisible(RoutingArea.BODY_LEFT, location.pathname) &&
                <Column>
                    <Area area={RoutingArea.BODY_LEFT} />
                </Column>}
                <Column greedy={true}>
                    <Area area={RoutingArea.BODY_MAIN}/>
                </Column>
                {isAreaVisible(RoutingArea.BODY_RIGHT, location.pathname) && <Column>
                    <Area area={RoutingArea.BODY_RIGHT} />
                </Column>}
            </Row>
            {isAreaVisible(RoutingArea.BOTTOM, location.pathname) && <Row>
                <Area area={RoutingArea.BOTTOM} />
            </Row>}
        </Screen>
    );
};

export { Layout };
```

> Note: Rendering Area name just a string, string enum `RoutingArea` is used for convenience.

**Area Rendering** is a part of the *Routing Rule* that contains identifier or name of the *Area* and function or component that *
Routing Feature* will render to that Area.

## Extensibility

At this moment extensibility is achieved by extending routes.

## Appearance

This feature allows user to do the following:

* register custom *Color Themes*;
* inject theme colors to individual component;
* develop custom components that use *Color Theme*;
* use additional API to work with *Themes*, use them, edit them, switch between them;

## Components Library

Contains components that are a generic layout building blocks. They may be used for building more complex components. Support
using *Color Themes*.

## Storage

Allows user to configure which data storage to use. *Dhampir Core* supports Redux and React Query OOTB.

## Feature Toggling

In progress.
