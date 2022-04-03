/* Styles */
import './styles.less';

/* Routing */
import './extensions';

import { useRootApplication, StorageType } from '@dhampir/core';
import { FunctionComponent } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const App: FunctionComponent = () => {
    const application = useRootApplication({
        storageType: StorageType.QUERY
    });

    const client = new QueryClient();

    return <QueryClientProvider client={client}>
        {application !== undefined && <application.Component storageType={StorageType.QUERY} />}
    </QueryClientProvider>;
};
