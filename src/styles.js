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
    singleValue: (provided) => ({
        ...provided,
        color: '#000',
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
    multiValue: (provided) => ({
        ...provided,
        background: '#DCD8ED',
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        color: '#6940C6',
        ':hover': {
            backgroundColor: '#DCD8ED',
            color: '#6940C6',
        },
    })
}

export const newCustomSelect = {
    control: (provided, state) => ({
        ...provided,
        cursor: 'pointer',
        borderRadius: '22px',
        border: 'none',
        backgroundColor: '#F5F5F5',
        fontStyle: '"Lexend", sans-serif',
        fontSize: '1rem',
        fontWeight: '300',
        color: state.isDisabled ? '#ccc' : '#191D25',
        width: '315px',
        height: '32px',
        minHeight: '32px',
        textAlign: 'left',
        paddingLeft: '35px',
        borderColor: state.isFocused ? 'transparent' : provided.borderColor,
        boxShadow: state.isFocused ? 'none' : provided.boxShadow,
        '&:hover': {
            borderColor: state.isFocused ? 'transparent' : provided['&:hover'].borderColor,
        }
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#191D25',
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
    menu: (provided) => ({
        ...provided,
        borderRadius: '5px',
        minHeight: '32px',
        width: '315px'
    }),
    noOptionsMessage: (provided) => ({
        ...provided,
        fontSize: '1rem',
        color: '#888',
        fontWeight: '300',
        fontFamily: '"Lexend", sans-serif',
        textAlign: 'left'
    }),
    option: (provided, state) => ({
        ...provided,
        fontSize: '1rem',
        fontWeight: '300',
        borderRadius: '5px',
        background: state.isSelected ? '#f0f0f0' : '#FFF',
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

export const dateStyles = {
    control: (provided, state) => ({
        ...provided,
        cursor: 'pointer',
        borderRadius: '22px',
        border: 'none',
        backgroundColor: '#FFF',
        fontStyle: '"Lexend", sans-serif',
        fontSize: '1rem',
        fontWeight: '300',
        color: state.isDisabled ? '#ccc' : '#1F242D',
        width: '150px',
        height: '32px',
        minHeight: '32px',
        textAlign: 'left',
        borderColor: state.isFocused ? 'transparent' : provided.borderColor,
        boxShadow: state.isFocused ? 'none' : provided.boxShadow,
        marginLeft: '10px',
        '&:hover': {
            borderColor: state.isFocused ? 'transparent' : provided['&:hover'].borderColor,
        }
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#191D25',
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
    menu: (provided) => ({
        ...provided,
        borderRadius: '5px',
        minHeight: '32px',
        width: '150px'
    }),
    noOptionsMessage: (provided) => ({
        ...provided,
        fontSize: '1rem',
        color: '#888',
        fontWeight: '300',
        fontFamily: '"Lexend", sans-serif',
        textAlign: 'left'
    }),
    option: (provided, state) => ({
        ...provided,
        fontSize: '1rem',
        fontWeight: '300',
        borderRadius: '5px',
        background: state.isSelected ? '#f0f0f0' : '#FFF',
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