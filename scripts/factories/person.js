export const photographerFactory = (data) => {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement('a');
        link.href = `/photographer.html?id=${id}`;
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement('h3');
        h3.textContent = `${city}, ${country}`;
        const tag = document.createElement('p');
        tag.textContent = tagline;
        const salary = document.createElement('p');
        salary.textContent = `${price}€/jour`;

        link.appendChild(img);
        link.appendChild(h2);
        link.appendChild(h3);
        link.appendChild(tag);
        link.appendChild(salary);
        
        article.appendChild(link);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}


export const displayDataOnIndexPage = async (photographers) => {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
};