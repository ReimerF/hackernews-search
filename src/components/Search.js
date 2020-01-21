import React from 'react';

const Search = ({ onSearchChange, onSearchSubmit, searchTerm, children }) =>
        <div>
            <form onSubmit={onSearchSubmit}>
                <button type="submit">{children} ></button> 
                <input type="text" onChange={onSearchChange} value={searchTerm}/>
            </form>        
        </div>

export default Search;