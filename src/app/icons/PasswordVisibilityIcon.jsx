import React from "react";

export const PasswordVisibilityIcon = ({toggleVisibility}) => {

    return (
        <div className={'icon-pass-visibility'} onClick={toggleVisibility}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="pass-visibility">
                    <path id="Vector"
                          d="M12.0025 15.4559C13.102 15.4559 14.0357 15.071 14.8037 14.3014C15.5719 13.5319 15.956 12.5974 15.956 11.4979C15.956 10.3984 15.5712 9.46462 14.8015 8.69662C14.032 7.92845 13.0975 7.54437 11.998 7.54437C10.8985 7.54437 9.96474 7.9292 9.19674 8.69887C8.42858 9.46837 8.04449 10.4029 8.04449 11.5024C8.04449 12.6019 8.42933 13.5356 9.19899 14.3036C9.96849 15.0718 10.903 15.4559 12.0025 15.4559ZM12.0027 14.1596C11.2646 14.1596 10.6363 13.9013 10.118 13.3846C9.59983 12.868 9.34074 12.2406 9.34074 11.5026C9.34074 10.7645 9.59908 10.1362 10.1157 9.61787C10.6324 9.0997 11.2597 8.84062 11.9977 8.84062C12.7359 8.84062 13.3642 9.09895 13.8825 9.61562C14.4007 10.1323 14.6597 10.7596 14.6597 11.4976C14.6597 12.2358 14.4014 12.864 13.8847 13.3824C13.3681 13.9005 12.7407 14.1596 12.0027 14.1596ZM12.0015 18.3386C9.75066 18.3386 7.70249 17.7165 5.85699 16.4721C4.01149 15.228 2.64608 13.5706 1.76074 11.5001C2.64608 9.42962 4.01108 7.77229 5.85574 6.52812C7.70024 5.28379 9.74799 4.66162 11.999 4.66162C14.2498 4.66162 16.298 5.28379 18.1435 6.52812C19.989 7.77229 21.3544 9.42962 22.2397 11.5001C21.3544 13.5706 19.9894 15.228 18.1447 16.4721C16.3002 17.7165 14.2525 18.3386 12.0015 18.3386ZM12.0002 16.9396C13.8554 16.9396 15.5643 16.4508 17.127 15.4731C18.6897 14.4955 19.8804 13.1711 20.6992 11.5001C19.8804 9.82912 18.6897 8.50479 17.127 7.52712C15.5643 6.54945 13.8554 6.06062 12.0002 6.06062C10.1451 6.06062 8.43616 6.54945 6.87349 7.52712C5.31083 8.50479 4.12008 9.82912 3.30124 11.5001C4.12008 13.1711 5.31083 14.4955 6.87349 15.4731C8.43616 16.4508 10.1451 16.9396 12.0002 16.9396Z"
                          fill="#5F6368"/>
                </g>
            </svg>
        </div>
    );
}