import {VFC} from "react";
import {LaneProps} from "./types";
import {Column, Spacer, Units} from "@dhampir/core";
import {useQuery} from 'react-query';
import {DefaultService, Doodle} from "../../services/doodle";
import classnames from 'classnames';
import styles from './styles.less';
import {Task} from "@extensions/doodle/components/Board/Task";

export const Lane: VFC<LaneProps> = ({title, statusId}) => {
    const qId = `tasks-${statusId}`;
    const {
        isLoading,
        data: tasks
    } = useQuery<Doodle[]>(qId, () => DefaultService.getDoodles(statusId).then(data => data));

    return <Column alignItems={'start'}>
        <Spacer size={280}>
            <div className={classnames(styles.laneTitle)}>{title}</div>
            <Column alignItems={'start'}>
                <Spacer space={0.5} units={Units.EM}>
                    {isLoading ? "Loading Tasks" : tasks && tasks.map((task) => <Task key={task.id} task={task}/>)}
                </Spacer>
            </Column>
        </Spacer>
    </Column>;
}
