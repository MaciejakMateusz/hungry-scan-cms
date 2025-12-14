import React from "react";
import Tippy from "@tippyjs/react";

export const Tooltip = ({children, content, appendTo}) => {
    return (
        <Tippy content={content}
               placement={"auto"}
               delay={0}
               duration={0}
               className={'tooltip'}
               appendTo={appendTo}>
            {children}
        </Tippy>
    );
};