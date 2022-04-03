import {CircularProgress, Icon, MenuItem, Select} from "@mui/material";
import {useQuery} from "react-query";
import {DefaultService, Status} from "../../service";
import {useState, VFC} from "react";

export type StatusesProps<T extends string = string> = {
    statusId: T,
    onChange?: (value: T) => void,
}

export const Statuses: VFC<StatusesProps> = ({ statusId, onChange }) => {
    const [selectedStatusId, setSelectedStatusId] = useState<string>(statusId);
    const { data:statuses = [], isLoading } = useQuery<Status[]>('statuses', DefaultService.getStatuses);

    const onSelectHandler = ({ target }) => {
        setSelectedStatusId(target.value);
        onChange?.(target.value)
    }

    return <Select onChange={onSelectHandler} value={selectedStatusId} size={'small'}>
        {isLoading ? <CircularProgress /> : statuses.map(({ id, name }) => <MenuItem key={id} value={id}>{name}</MenuItem>)}
    </Select>;
}
