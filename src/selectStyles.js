export const customSelect = {
    control: (provided, state) => ({
        ...provided,
        cursor: 'pointer',
        borderRadius: '5px',
        border: '1px solid #EDEFF3',
        boxShadow: 'none',
        backgroundColor: '#FFF',
        fontStyle: '"Lexend", sans-serif',
        fontSize: '13px',
        fontWeight: '400',
        color: state.isDisabled ? '#ccc' : '#33353E',
        width: '100%',
        maxWidth: '100%',
        paddingRight: '10px',
        paddingLeft: '5px',
        '&:hover': {
            border: '1px solid #EDEFF3',
        },
    }),
    container: (provided) => ({
        ...provided,
        width: '100%'
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: state.isDisabled ? '#888' : '#000',
        maxWidth: '90%'
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        display: 'none',
        padding: '2px',
        position: 'absolute',
        right: '5px',
        color: '#888',
        '& svg': {
            width: '15px',
            height: '15px',
            '&:hover': {
                color: '#000',
            }
        }
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        display: 'none'
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '8px',
    }),
    noOptionsMessage: (provided) => ({
        ...provided,
        fontSize: '0.8rem',
        color: '#888',
        fontFamily: '"Lexend", sans-serif',
        textAlign: 'left',
    }),
    option: (provided, state) => ({
        ...provided,
        fontSize: '0.8rem',
        fontWeight: '400',
        background: state.isSelected ? '#f0f0f0' : '#FFF',
        color: '#33353E',
        '&:hover': {backgroundColor: '#f0f0f0'}
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: state.isDisabled ? '#888' : '#33353E',
        fontSize: '13px',
        fontFamily: '"Lexend", sans-serif'
    }),
    clearIndicator: (provided) => ({
        ...provided,
        position: 'absolute',
        cursor: 'pointer',
        right: '0',
        '& svg': {
            width: '16px',
            height: '16px',
            color: '#888',
            '&:hover': {
                color: '#000',
            }
        }
    }),
    multiValue: (provided, props) => {
        const isUnavailable = props?.data?.value?.available === false;

        return {
            ...provided,
            background: isUnavailable ? '#FFE7E7' : '#F5EDFF',
            color: isUnavailable ? '#D80303' : '#8540DD',
            maxWidth: '200px'
        };
    },
    multiValueRemove: (provided, props) => {
        const isUnavailable = props?.data?.value?.available === false;

        return {
            ...provided,
            color: '#8540DD',
            '&:hover': {
                background: isUnavailable ? '#FFE7E7' : '#F5EDFF',
                color: isUnavailable ? '#D80303' : '#8540DD'
            }
        }
    },
    multiValueLabel: (provided, props) => {
        const isUnavailable = props?.data?.value?.available === false;

        return {
            ...provided,
            color: isUnavailable ? '#D80303' : '#8540DD',
            maxWidth: '200px'
        }
    }
}

export const mainSelect = {
    control: (provided, state) => ({
        ...provided,
        cursor: 'pointer',
        borderRadius: '22px',
        border: '1px solid #EDEFF3',
        boxSizing: 'border-box',
        backgroundColor: '#FFF',
        fontStyle: '"Lexend", sans-serif',
        fontSize: '1rem',
        fontWeight: '400',
        color: state.isDisabled ? '#ccc' : '#191D25',
        width: 'fit-content',
        minWidth: '130px',
        height: '32px',
        minHeight: '32px',
        textAlign: 'left',
        paddingLeft: '5px',
        paddingRight: '10px',
        borderColor: state.isFocused ? 'transparent' : provided.borderColor,
        boxShadow: state.isFocused ? 'none' : provided.boxShadow,
        '&:hover': {
            borderColor: state.isFocused ? 'transparent' : provided['&:hover'].borderColor,
            border: '1px solid #EDEFF3'
        }
    }),
    valueContainer: provided => ({
        ...provided,
        overflow: 'visible',
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: state.isDisabled ? '#888' : '#191D25',
        maxWidth: '90%'
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        display: state.isDisabled ? 'none' : provided.display,
        padding: '8px',
        position: 'absolute',
        right: '5px',
        color: '#3E424C',
        '& svg': {
            width: '15px',
            height: '15px',
            '&:hover': {
                color: '#000',
            }
        }
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        display: 'none'
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        padding: '5px'
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '5px',
        minHeight: '32px',
        width: '100%',
        zIndex: 900,
    }),
    noOptionsMessage: (provided) => ({
        ...provided,
        fontSize: '1rem',
        color: '#888',
        fontWeight: '400',
        fontFamily: '"Lexend", sans-serif',
        textAlign: 'left'
    }),
    option: (provided, state) => ({
        ...provided,
        fontSize: '1rem',
        fontWeight: '400',
        background: state.isSelected ? '#f0f0f0' : null,
        backgroundColor: state.isFocused ? '#f0f0f0' : null,
        color: '#191D25',
        '&:hover': {backgroundColor: '#f0f0f0'}
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: state.isDisabled ? '#888' : '#3E424C',
        fontSize: '1rem',
        fontFamily: '"Lexend", sans-serif',
        fontWeight: '300',
    }),
    clearIndicator: (provided) => ({
        ...provided,
        position: 'absolute',
        cursor: 'pointer',
        right: '25px',
        '& svg': {
            width: '16px',
            height: '16px',
            color: '#888',
            '&:hover': {
                color: '#000',
            }
        }
    })
}

export const mainSelectTopper = {
    ...mainSelect,
    menu: provided => ({
        ...mainSelect.menu(provided),
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px'
    }),
}

export const mainSelectTime = {
    ...mainSelect,
    control: (provided, state) => ({
        ...mainSelect.control(provided, state),
        width: '100px'
    })
}

export const mainSelectWhite = {
    ...mainSelect,
    control: (provided, state) => ({
        ...mainSelect.control(provided, state),
        backgroundColor: '#FFF'
    }),
    singleValue: provided => ({
        ...provided,
        maxWidth: '100%'
    }),
}

export const dateStyles = {
    ...mainSelect,
    control: (provided, state) => ({
        ...mainSelect.control(provided, state),
        width: '130px'
    })
}

export const chartStyles = {
    ...mainSelect,
    control: (provided, state) => ({
        ...mainSelect.control(provided, state),
        width: '175px',
        paddingRight: '10px'
    })
}