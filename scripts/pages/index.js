import { displayDataOnIndexPage} from '../factories/person.js';
import {getData} from '../utils/data.js'

const init = async () => {
    const data = await getData()
    const photographers = data.photographers
    displayDataOnIndexPage(photographers);
};

init();