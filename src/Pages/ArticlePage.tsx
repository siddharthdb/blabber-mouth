import React from 'react';

export const ArticlePage = (props: any) => {
    const name = props.match.params.name;

    return (
        <div> 
            Article - {name}
        </div>
    )
}

