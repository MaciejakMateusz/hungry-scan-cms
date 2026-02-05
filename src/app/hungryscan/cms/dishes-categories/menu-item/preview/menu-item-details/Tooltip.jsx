import React from "react";
import Tippy from "@tippyjs/react";

export const Tooltip = ({children, content, appendTo = document.body, className = 'tooltip'}) => {
    return (
        <Tippy content={content}
               placement={"auto"}
               delay={0}
               duration={0}
               className={className}
               appendTo={appendTo}>
            {children}
        </Tippy>
    );
};