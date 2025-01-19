export const renderOtherErrors = errorData => {
    return errorData?.error ?
        (<div className={'login-validation-msg'}>
            <span>{errorData?.error}</span>
        </div>) : (<></>);
}