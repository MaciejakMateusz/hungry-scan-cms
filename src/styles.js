export const customSelect = {
    control: (provided, state) => ({
        ...provided,
        cursor: 'pointer',
        borderRadius: '10px',
        border: 'none',
        boxShadow: '0 2px 15px 0 #0000001A',
        backgroundColor: '#FFF',
        fontStyle: '"Lexend", sans-serif',
        fontSize: '0.8rem',
        color: state.isDisabled ? '#ccc' : '#000',
        width: '270px',
        '&:hover': {
            borderColor: '#CCC',
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#000',
        maxWidth: '90%'
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        display: state.isDisabled ? 'none' : provided.display,
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
    indicatorSeparator: (provided, state) => ({
        ...provided,
        display: state.isDisabled ? 'none' : provided.display,
        width: '2px',
        borderRadius: '2px',
        height: '20px',
        backgroundColor: '#888',
        position: 'absolute',
        right: '27px',
        top: '1px',
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
        color: '#000',
        '&:hover': {backgroundColor: '#f0f0f0'}
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: state.isDisabled ? '#888' : '#000',
        fontSize: '0.8rem',
        fontFamily: '"Lexend", sans-serif'
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

export const newCustomSelect = {
    control: (provided, state) => ({
        ...provided,
        cursor: 'pointer',
        borderRadius: '22px',
        border: 'none',
        backgroundColor: '#FAFAFA',
        fontStyle: '"Lexend", sans-serif',
        fontSize: '0.8rem',
        color: state.isDisabled ? '#ccc' : '#3E424C',
        width: '171px',
        height: '32px',
        minHeight: '32px',
        textAlign: 'center',
        borderColor: state.isFocused ? 'transparent' : provided.borderColor,
        boxShadow: state.isFocused ? 'none' : provided.boxShadow,
        '&:hover': {
            borderColor: state.isFocused ? 'transparent' : provided['&:hover'].borderColor,
        }
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#3E424C',
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
        width: '171px'
    }),
    noOptionsMessage: (provided) => ({
        ...provided,
        fontSize: '0.8rem',
        color: '#888',
        fontFamily: '"Lexend", sans-serif',
        textAlign: 'center'
    }),
    option: (provided, state) => ({
        ...provided,
        fontSize: '0.8rem',
        fontWeight: '400',
        borderRadius: '5px',
        background: state.isSelected ? '#f0f0f0' : '#FFF',
        color: '#3E424C',
        '&:hover': {backgroundColor: '#f0f0f0'}
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: state.isDisabled ? '#888' : '#3E424C',
        fontSize: '0.8rem',
        fontFamily: '"Lexend", sans-serif'
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