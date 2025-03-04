import React, { createContext, ReactNode, useContext } from 'react';

interface RoutesContextValue {
    baseUrl: string;
    homePath: string;
    jobSearchPath: string;
    loginAndRegistrationPath: string;
}

const RoutesContext = createContext<RoutesContextValue | undefined>(undefined);

export const RoutesProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const baseUrl = 'elee1149-coursework--accidental-experts';

    const value = {
        baseUrl,
        homePath: `${baseUrl}/`,
        jobSearchPath: `${baseUrl}/job-search`,
        loginAndRegistrationPath: `${baseUrl}/login-and-registration`,
    };

    return (
        <RoutesContext.Provider value={value}>
            {children}
        </RoutesContext.Provider>
    );
};

export const useRoutes = (): RoutesContextValue => {
    const context = useContext(RoutesContext);
    if (!context) {
        throw new Error('useRoutes must be used within a RoutesProvider');
    }
    return context;
};
