/* eslint-disable no-undef */
import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import useSessionStorage from '../utils/useSessionStorage';

export const PatientContext = createContext();

export const PatientContextProvider = ({ children }) => {
    const [patient, setPatient] = useSessionStorage('patient', {});
    const [patients, setPatients] = useSessionStorage('patients', []);

    return (
        <PatientContext.Provider
            value={ {
                patient,
                patients,
                setPatient,
                setPatients
            } }
        >
            {children}
        </PatientContext.Provider>
    );
};

PatientContextProvider.propTypes = {
    children: PropTypes.element
};

export default PatientContextProvider;
