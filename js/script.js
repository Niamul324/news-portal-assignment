/* load all news category */
const loadAllNewsCategory = () =>{
    const url = ` https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data =>displayAllNewsCategory(data.data.news_category))
}

/* display all news category */

const displayAllNewsCategory = categories =>{
    //  console.log(categories);
    const categoryContainer = document.getElementById('heading');
     categories.forEach(category => {

        const categoryList = document.createElement('button');
         categoryList.setAttribute("onclick" , `loadSingleNewsCategory('${category.category_id}')`);
        categoryList.classList.add( 'list','btn' , 'btn-light');
        categoryList.innerText = category.category_name;
        categoryContainer.appendChild(categoryList);
    });
};

/* load all news in a category */

 const loadSingleNewsCategory = (id) =>{
    //  console.log(id);
     const url =`https://openapi.programming-hero.com/api/news/category/${id}`;
      // console.log(url);
     fetch(url)
     .then(res => res.json())
     .then(data => displayNews(data.data))
 }

/* display all news in a category */

 const displayNews = data =>{
    // console.log(data);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML ='';
    data.forEach(news => {
          console.log(news);
        const newsDiv = document.createElement('div');
    newsDiv.classList.add('row', 'g-o','mt-2','border');
    newsDiv.innerHTML = `
    <div class="col-md-4">
    <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
  </div>
  <div class="col-md-8">
    <div class="card-body mb-5">
      <h5 class="card-title">${news.title}</h5>
      <p class="card-text ellipsis">${news.details.slice(0,460)}</p>
      <div>
      <div class="d-flex justify-content-start"><img class="image img-fluid rounded-circle" src="${news.author.img}">
        <div class="ms-2">
        <P class="mb-0">${news.author.name}</p>
        <p>${news.author.published_date}</p>
        </div>
        <P class="p-2">view: ${news.total_view}</P>
      </div>
      </div>
    </div>
  </div>
    `
    newsContainer.appendChild(newsDiv);
    });
 }

  loadSingleNewsCategory("01");
  loadAllNewsCategory();
