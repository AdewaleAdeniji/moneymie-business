import React from 'react';
import { countries } from 'countries-list';
import sortArray from 'sort-array';
const SelectCountry = (props) => {
    const countrylist = sortArray(Object.values(countries), {
        by: 'name',
        order: 'asc'
    });
    return (
        <select onChange={props.onChange} className="input-field">
            {countrylist.map((country,index)=>{
                return (
                    <option key={index} value={country.name}>{country.name}</option>
                )
            })}
        </select>
    )
}
export default SelectCountry;