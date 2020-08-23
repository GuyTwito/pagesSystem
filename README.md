# Executing<br>
From the main directory we can execute the next commands:
*  `npm install project` - install client and server packages.
*  `npm run project` - run both client and server.
*  We can install or run each of the client or the server on its own, by replacing the previous commands "project" with "client" or "server".
<br>

# Adding a new 'page'<br>
1.  Go to `client/src/app/pages`.
2.  Add a React page in the directory `react_pages` or a Vue page in `vue_pages`.
3.  In `index.ts` add your page to the object `ReactComponents`:
    - The key is the pages link.
    - The value is a `require` of the page. If it's a react page wrap the require with `ReactInVue`.
    - **OPTIONAL**: For additional attributes add your page as a key in the object `AdditionalAttributes`. The value will be an object with the relevant attributes.
    
    Current attributes:
    * **name** - The name to display in the nav bar.
    * **hidden** - whether the page should not appear in the nav bar.
    * **isHome** - assigned to one page only, determines the home page. If assigned to more then one page, the last will determine.

# API<br>
1.  `/flickr/search_images/:page` - Search for images on page 'page'.
2.  `/flickr/search_images/:page/:search_query` - Search for images with the search key 'search_query', on page 'page'.
*  API parameters:
1.  **search_query** (string) - a search query.
2.  **page** (int) - specifying the wanted page.
