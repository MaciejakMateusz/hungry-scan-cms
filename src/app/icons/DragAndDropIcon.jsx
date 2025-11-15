export const DragAndDropIcon = ({disabled}) => {
    const fill = disabled ? '#707070' : '#8540DD';
    return (
        <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="1.5" cy="2" r="1.5" fill={fill}/>
            <circle cx="8.5" cy="2" r="1.5" fill={fill}/>
            <circle cx="1.5" cy="9" r="1.5" fill={fill}/>
            <circle cx="8.5" cy="9" r="1.5" fill={fill}/>
            <circle cx="1.5" cy="16" r="1.5" fill={fill}/>
            <circle cx="8.5" cy="16" r="1.5" fill={fill}/>
        </svg>
    );
}