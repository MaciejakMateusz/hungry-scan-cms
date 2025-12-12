import React from "react";

export const StarIcon = ({width = '18', height = '18', stroke = 'black', wrapperStyle, removeWrapper}) => {
    return (
        <div className={removeWrapper ? '' : 'context-icon-wrapper'}
             style={{...wrapperStyle, width: `${width}px`, height: `${height}px`}}>
            <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.64355 4.12012C9.75587 3.77479 10.2441 3.77479 10.3564 4.12012L11.2021 6.7207C11.4197 7.39021 12.0431 7.84371 12.7471 7.84375H15.4814C15.8447 7.84375 15.996 8.30894 15.7021 8.52246L13.4902 10.1299C12.9207 10.5436 12.682 11.2768 12.8994 11.9463L13.7441 14.5469C13.8563 14.8922 13.4618 15.1797 13.168 14.9668L10.9551 13.3594C10.3855 12.9456 9.61446 12.9456 9.04492 13.3594L6.83203 14.9668C6.53818 15.1797 6.14366 14.8922 6.25586 14.5469L7.10059 11.9463C7.31804 11.2768 7.07926 10.5436 6.50977 10.1299L4.29785 8.52246C4.00396 8.30893 4.15529 7.84375 4.51855 7.84375H7.25293C7.95688 7.84371 8.58032 7.39021 8.79785 6.7207L9.64355 4.12012Z"
                      stroke={stroke} strokeWidth="1.25"/>
            </svg>
        </div>
    );
}