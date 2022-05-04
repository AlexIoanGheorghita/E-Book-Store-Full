import React from 'react';
import { useParams } from 'react-router-dom';
import { Wrapper, Results, FilterContainer, Sort, Option, SortDropdown, Filter, FilterDropdown } from './Filters.styled';

const sortOptions = [
    '--Choose an option--',
    'Price (Asc)',
    'Price (Desc)',
    'Title (A-Z)',
    'Title (Z-A)'
];

const filterOptions = [
    '--Choose an option--',
    'Price (Free)',
    'New Releases'
];

const Filters = ({ handleSort, handleFilter, results }) => {
    const category = useParams().category;
    console.log(category);

    return (
        <Wrapper>
            <Results>Results: {results}</Results>
            <FilterContainer>
                <Sort>Sort by: 
                    <SortDropdown onChange={handleSort} name="sort-options">
                        {sortOptions.map(elem => {
                            return (sortOptions.indexOf(elem) !== 0 ? 
                                <Option value={elem} key={sortOptions.indexOf(elem)}>{elem}</Option> : 
                                <Option value="" key={sortOptions.indexOf(elem)}>{elem}</Option>)
                        })}
                    </SortDropdown>
                </Sort>
                <Filter>Filter by: 
                    <FilterDropdown onChange={handleFilter}>
                        {filterOptions.map(elem => {
                            return (filterOptions.indexOf(elem) !== 0 ? 
                                <Option value={elem} key={filterOptions.indexOf(elem)}>{elem}</Option> : 
                                <Option value="" key={filterOptions.indexOf(elem)}>{elem}</Option>)
                        })}
                    </FilterDropdown>
                </Filter>
            </FilterContainer>
        </Wrapper>
    )
}

export default Filters
