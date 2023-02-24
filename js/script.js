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

        const categoryList = document.createElement('button');
         categoryList.setAttribute("onclick" , `loadSingleNewsCategory('${category.category_id}')`);
        categoryList.classList.add( 'list','btn' , 'btn-light');
        categoryList.innerText = category.category_name;
        categoryContainer.appendChild(categoryList);
    });
};


 const loadSingleNewsCategory = (id) =>{
    //  console.log(id);
     const url =`https://openapi.programming-hero.com/api/news/category/${id}`;
      console.log(url);
     fetch(url)
     .then(res => res.json())
     .then(data => displayNews(data.data))
 }

 const displayNews = data =>{
    // console.log(data);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML ='';
    data.forEach(news => {
        // console.log(news);
        const newsDiv = document.createElement('div');
    newsDiv.classList.add('row', 'g-o','mt-2');
    newsDiv.innerHTML = `
    <div class="col-md-4">
    <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">${news.title}</h5>
      <p class="card-text">${news.details}</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
    `
    newsContainer.appendChild(newsDiv);
    });
 }

  loadSingleNewsCategory("01");
  loadAllNewsCategory();
