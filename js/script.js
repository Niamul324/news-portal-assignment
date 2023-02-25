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
    /* spinning start */
    toggleSpinner(true);
     const url =`https://openapi.programming-hero.com/api/news/category/${id}`;
      // console.log(url);
     fetch(url)
     .then(res => res.json())
     .then(data => displayNews(data.data))
 }

/* display all news in a category */

 const displayNews = data =>{
    //  console.log(data.length);
     const toalNews = document.getElementById('total-news');
     toalNews.innerText = `total news found : ${data.length}`
    const newsContainer = document.getElementById('news-container');
    /* no news found and clean other category news */
    if (data.length === 0) {
      newsContainer.innerHTML = `<P class="h3 text-danger text-center">No news found</p>`;
    } else {

      newsContainer.innerHTML ='';
    }
    data.forEach(news => {
            // console.log(news);
          // console.log(news._id);
        
        const newsDiv = document.createElement('div');
        newsDiv.setAttribute("onclick", `loadModaldata('${news._id}')`);
        newsDiv.setAttribute("data-bs-toggle", "modal");
        newsDiv.setAttribute("data-bs-target", "#exampleModal")
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
    /* spining end */
    toggleSpinner(false);
 }
  /* spinner function */
 const toggleSpinner = isLoading =>{
  const loaderSection = document.getElementById('loader');
  if (isLoading) {
    loaderSection.classList.remove('d-none');
  } else{
    loaderSection.classList.add('d-none');

  }
}

/* display blog */
const displayBlog = () =>{
  toggleSpinner(true);
  const toalNews = document.getElementById('total-news');
     toalNews.innerText = '';
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML ='';
  newsContainer.innerHTML =`
  <div>
  <p class="h5 ms-3">01) Difference between var and let :</p>
  <p>In the early days of JavaScript, there was only one way of declaring variables and that was using the var keyword. A variable declared with var is defined throughout the program. One of the issues with using the var keyword was redeclaring a variable inside a block will also redeclare the variable outside the block. 

  With the introduction of ES6 in 2015 two more keywords, let and const came into the picture. var and let are both used for variable declaration in javascript but the difference between them is that var is function scoped and let is block scoped. Variable declared by let cannot be redeclared and must be declared before use whereas variables declared with var keyword are hoisted. </p>
  </div>

  <div>
  <p class="h5 ms-3">02) difference between normal function and arrow function :</p>
  <p>Using new keyword: Regular functions created using function declarations or expressions are 'constructible' and 'callable'. Since regular functions are constructible, they can be called using the 'new' keyword. However, the arrow functions are only 'callable' and not constructible.</p>
  </div
<div>
  <p class="h5 ms-3">03) what is map() ?</p>
  <p>map() creates a new array from calling a function for every array element.

  map() calls a function once for each element in an array.
  
  map() does not execute the function for empty elements.
  
  map() does not change the original array.</p>

</div>
<div>
<p class="h5 ms-3">04) what is filter() ?</p>
<p>The filter() method creates a new array filled with elements that pass a test provided by a function.

The filter() method does not execute the function for empty elements.

The filter() method does not change the original array.</p>
</div>

<div>
<p class="h5 ms-3">05) what is find() ?</p>
<p>The find() method returns the value of the first element that passes a test.

The find() method executes a function for each array element.

The find() method returns undefined if no elements are found.

The find() method does not execute the function for empty elements.

The find() method does not change the original array.

</p>
</div> 
<div>
<p class="h5 ms-3">05) what is template literals ?</p>
<p>Template literals are sometimes informally called template strings, because they are used most commonly for string interpolation (to create strings by doing substitution of placeholders). However, a tagged template literal may not result in a string; it can be used with a custom tag function to perform whatever operations you want on the different parts of the template literal.</P>
</div> 
  `
  toggleSpinner(false);
}

/* display modal */

const loadModaldata = id =>{
  const url =`https://openapi.programming-hero.com/api/news/${id}`
  console.log(url);
  fetch(url)
  .then(res=> res.json())
  .then(data =>displayModal(data.data[0]))
}

const displayModal = data =>{
  // console.log(data);
  const modalDetails = document.getElementById('modal-details');
  modalDetails.innerHTML =`
    <p>author name :${data.author.name}</p>
    <p> published date :${data.author.published_date}</p>
    <p> view : ${data.total_view}
  `

}

  loadSingleNewsCategory("01");
  loadAllNewsCategory();
