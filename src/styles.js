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