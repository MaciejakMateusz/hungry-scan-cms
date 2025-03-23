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

export const mainSelect = {
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
        width: '240px',
        height: '32px',
        minHeight: '32px',
        textAlign: 'left',
        paddingLeft: '5px',
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
        width: '100%'
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
        background: state.isSelected ? '#b6b6b6' : null,
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

export const mainSelectIcon = {
    ...mainSelect,
    control: (provided, state) => ({
        ...mainSelect.control(provided, state),
        width: '315px',
        paddingLeft: '35px'
    })
}

export const mainSelectChipless = {
    ...mainSelect,
    multiValue: () => ({
        display: 'none'
    }),
    multiValueLabel: () => ({
        display: 'none'
    }),
    multiValueRemove: () => ({
        display: 'none'
    }),
}
export const mainSelectTime = {
    ...mainSelect,
    control: (provided, state) => ({
        ...mainSelect.control(provided, state),
        width: '100px'
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
        marginLeft: '10px',
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
        borderRadius: '20px',
        padding: '12px 2px',
        minHeight: '32px',
        width: '150px',
        marginLeft: '10px',
    }),
    menuList: (provided) => ({
        ...provided,
        '&::-webkit-scrollbar': {
            display: 'none'
        },
        'msOverflowStyle': 'none',
        'scrollbarWidth': 'none'
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

export const chartStyles = {
    control: (provided, state) => ({
        ...provided,
        cursor: 'pointer',
        borderRadius: '22px',
        border: 'none',
        backgroundColor: '#E0F3FF',
        fontStyle: '"Lexend", sans-serif',
        fontSize: '1rem',
        fontWeight: '300',
        color: state.isDisabled ? '#ccc' : '#016DFF',
        width: '150px',
        height: '32px',
        minHeight: '32px',
        textAlign: 'left',
        borderColor: state.isFocused ? 'transparent' : provided.borderColor,
        boxShadow: state.isFocused ? 'none' : provided.boxShadow,
        '&:hover': {
            borderColor: state.isFocused ? 'transparent' : provided['&:hover'].borderColor,
        }
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#016DFF',
        maxWidth: '90%'
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        display: state.isDisabled ? 'none' : provided.display,
        padding: '8px',
        position: 'absolute',
        right: '5px',
        color: '#016DFF',
        '& svg': {
            width: '15px',
            height: '15px',
            '&:hover': {
                color: '#016DFF',
            }
        }
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        display: 'none'
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '20px',
        minHeight: '32px',
        width: '150px',
        padding: '12px 2px',
    }),
    menuList: (provided) => ({
        ...provided,
        '&::-webkit-scrollbar': {
            display: 'none'
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none'
    }),
    noOptionsMessage: (provided) => ({
        ...provided,
        fontSize: '1rem',
        color: '#016DFF',
        fontWeight: '300',
        fontFamily: '"Lexend", sans-serif',
        textAlign: 'left'
    }),
    option: (provided, state) => ({
        ...provided,
        fontSize: '1rem',
        fontWeight: '300',
        background: state.isSelected ? '#E0F3FF' : '#FFF',
        color: '#016DFF',
        '&:hover': {backgroundColor: '#E0F3FF'}
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: state.isDisabled ? '#888' : '#016DFF',
        fontSize: '1rem',
        fontFamily: '"Lexend", sans-serif',
        fontWeight: '300',
    })
}