import React, {useState} from "react";



const CategoryFilter = ({categories, selectedCategory, setSelectedCategory}) => {
    return(
        <div className="category-button">
            
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value={"All"}>All</option>
                  <option value={"dry"}>Dry</option>
                  <option value={"frozen"}>Frozen</option>
                  <option value={"refrigerated"}>Refrigerated</option>
                  <option value={"paper goods"}>Paper Goods</option>
                  <option value={"janitorial"}>Janitorial</option>
                  <option value={"beverage"}>Beverage</option>
                  <option value={"alcohol"}>Alcohol</option>
                </select>
            

        </div>
    )
}
export default CategoryFilter;