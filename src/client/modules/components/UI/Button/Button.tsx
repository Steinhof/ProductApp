import React, { FunctionComponentElement } from 'react';

type ButtonProps = {
    class?: string;
    children: string;
    onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
    type: string;
};

export default (props: ButtonProps): FunctionComponentElement<ButtonProps> => {
    return (
        <button onClick={props.onClick} className={props.class} type="submit">
            {props.children}
        </button>
    );
};
