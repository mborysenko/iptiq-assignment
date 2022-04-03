import {VFC} from "react";
import {Board, Lane} from "@extensions/doodle/components/Board";
import {useQuery} from "react-query";
import {DefaultService, Status} from "../../services/doodle";

export const Doodle: VFC = () => {
    const {isLoading, data: statuses} = useQuery<Status[]>('statuses', () => DefaultService.getStatuses());

    return <Board title={"ToDo Board"}>
        {isLoading ? 'Loading...' : statuses && statuses.map(({id, name}) => <Lane key={id} title={name!} statusId={id}/>)}
    </Board>
}
