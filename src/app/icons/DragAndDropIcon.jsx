export const DragAndDropIcon = ({disabled}) => {
    const fill = disabled ? '#707070' : '#8540DD';
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="7" cy="3.25" r="1.5" fill={fill}/>
            <circle cx="7" cy="10" r="1.5" fill={fill}/>
            <circle cx="7" cy="16.75" r="1.5" fill={fill}/>
            <circle cx="13" cy="3.25" r="1.5" fill={fill}/>
            <circle cx="13" cy="10" r="1.5" fill={fill}/>
            <circle cx="13" cy="16.75" r="1.5" fill={fill}/>
        </svg>
    );
}