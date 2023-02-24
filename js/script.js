const loadAllNewsCategory = () =>{
    const url = ` https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data =>displayAllNewsCategory(data.data.news_category))
}
const displayAllNewsCategory = categories =>{
    // console.log(categories);
    const categoryContainer = document.getElementById('heading');
     categories.forEach(category => {
        //   console.log(category);
        const categoryList = document.createElement('button');
        categoryList.addEventListener("click", function(){
            console.log(category.category_id);
        })
        categoryList.classList.add( 'list','btn' , 'btn-light');
        categoryList.innerText = category.category_name;
        categoryContainer.appendChild(categoryList);
     });
};


loadAllNewsCategory();