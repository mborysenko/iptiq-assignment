/* Order of imports does matter, will influence route resolving order */
import {extendRoute, RoutingArea} from "@dhampir/core";
import {Doodle} from "@extensions/doodle/components/Doodle";

extendRoute(['/'],
    {
        id: 'doodle',
        path: ['/doodle'],
        rendering: [

            {
                area: RoutingArea.BODY_MAIN,
                component: Doodle,
            },
        ],
    }
);



