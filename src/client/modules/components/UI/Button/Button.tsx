import React, { ReactElement } from 'react';

type ButtonProps = {
    styleClass?: string;
    children: string;
    removeProduct?(event: React.MouseEvent<HTMLButtonElement>): void;
    type: string;
};

export default function({
    removeProduct,
    children,
    styleClass,
}: ButtonProps): ReactElement {
    return (
        <button onClick={removeProduct} className={styleClass} type="submit">
            {children}
        </button>
    );
}
