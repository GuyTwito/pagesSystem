import React from 'react';

function Search(props : any){

    console.log(props.comp)
    return React.createElement('div', null, `Hello ${props.text}`);
}

export default Search;