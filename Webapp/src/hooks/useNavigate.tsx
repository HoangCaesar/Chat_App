import { createBrowserHistory } from 'history';
import { FC, PropsWithChildren } from 'react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

const history = createBrowserHistory({ window });

const CustomRouter: FC<PropsWithChildren> = ({ children, ...props }) => {
    return (
        <HistoryRouter history={history as any} {...props}>
            {children}
        </HistoryRouter>
    );
};

export const rootNavigate = (to: string) => {
    history.push(to);
};

export { CustomRouter };

