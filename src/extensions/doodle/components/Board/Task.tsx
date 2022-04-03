import {useCallback, VFC} from "react";
import {Button, Card, CardActions, CardContent, CardHeader} from "@mui/material";
import {Statuses} from "@extensions/doodle/components/Statuses";
import {useMutation, useQueryClient} from "react-query";
import {DefaultService, Doodle} from "../../services/doodle";

export type TaskProps = {
    task: Doodle,
}

export const Task:VFC<TaskProps> = ({ task }) => {
    const queryClient = useQueryClient();
    const {
        id: doodleId,
        statusId,
        ...rest
    } = task;
    const currentQueryId = `tasks-${statusId}`;

    const remove = useMutation(DefaultService.deleteDoodle, {
        onSuccess: () => {
            return queryClient.invalidateQueries(currentQueryId, { refetchInactive: true });
        },
    });

    const update = useMutation((data: Omit<Doodle, 'id'>) => DefaultService.updateDoodle(doodleId, data), {
        onMutate: async updatedDoodle => {
            const nextQueryId = `tasks-${updatedDoodle.statusId}`;
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries(currentQueryId);
            await queryClient.cancelQueries(nextQueryId);

            // Snapshot the previous value
            const previousDoodles = queryClient.getQueryData<Doodle[]>(currentQueryId);
            const nextDoodles = queryClient.getQueryData<Doodle[]>(nextQueryId);

            // Optimistically update to the new value
            queryClient.setQueryData(currentQueryId, previousDoodles ?  previousDoodles?.filter(({ id }) => id !== doodleId) : []);
            queryClient.setQueryData(nextQueryId, [...nextDoodles!, { id: doodleId, ...updatedDoodle}]);

            // Return a context with the previous and new todo
            return { previousDoodles, updatedDoodle };
        },
        // If the mutation fails, use the context we returned above
        onError: (err, updatedDoodle, context) => {
        },
        // Always refetch after error or success:
        onSettled: async updatedDoodle => {
            await queryClient.invalidateQueries(`tasks-${updatedDoodle.statusId}`);
        },
    });

    const onStatusChange = useCallback((value: string) => {
        update.mutate({
            ...rest,
            statusId: value,
        });
    }, []);

    return <Card variant={"outlined"} sx={{ marginBottom: '0.5em'}} key={doodleId}>
        <CardHeader title={rest.title}/>
        <CardContent>
            {rest.body}
        </CardContent>
        <CardActions>
            <Button size="small" onClick={() => {
                remove.mutate(doodleId);
            }}>Remove</Button>
            <Button size="small">Edit</Button>
            <Statuses onChange={onStatusChange} statusId={statusId!} />
        </CardActions>
    </Card>
}
