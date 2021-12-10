import React from 'react';
import { countries } from 'countries-list';
const SelectCountry = (props) => {
    const countrylist = Object.values(countries);
    return (
        <select onChange={props.onChange} className="input-field">
            {countrylist.map((country,index)=>{
                return (
                    <option key={index} value={country}>{country.name}</option>
                )
            })}
        </select>
    )
}
export default SelectCountry;