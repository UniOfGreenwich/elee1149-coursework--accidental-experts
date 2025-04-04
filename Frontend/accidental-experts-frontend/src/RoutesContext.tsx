import React, { createContext, ReactNode, useContext } from 'react';

interface RoutesContextValue {
    baseUrl: string;
    homePath: string;
    jobSearchPath: string;
    jobSeekerDashboardPath: string;
    loginAndRegistrationPath: string;
    employerDashboardPath: string;

}

const RoutesContext = createContext<RoutesContextValue | undefined>(undefined);

export const RoutesProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const baseUrl = '';

    const value = {
        baseUrl,
        homePath: `${baseUrl}/`,
        jobSearchPath: `${baseUrl}/job-search`,
        jobSeekerDashboardPath: `${baseUrl}/seeker-dashboard`,
        loginAndRegistrationPath: `${baseUrl}/login-and-registration`,
        employerDashboardPath: `${baseUrl}/employer-dashboard`,
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
