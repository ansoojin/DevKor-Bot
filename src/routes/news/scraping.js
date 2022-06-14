import axios from 'axios';
import * as cheerio from 'cheerio';

const baseUrl = 'https://www.bbc.com/news/technology';

const getHtml = async () => {
    try {
        return await axios.get(baseUrl);
    } catch (err) {
        console.log(err);
    }
};

export const getNews = async () => {
    const html = await getHtml();
    const $ = cheerio.load(html.data);
    const $article = $('.gs-c-promo-heading.gs-o-faux-block-link__overlay-link');
    const newsId = $article[0]['attribs']['href'].split('-')[1];
    const newsTitle = $($article[0]).children('h3').text();
    const newsUrl = `${baseUrl}-${newsId}`;
    return [newsUrl, newsTitle];
}
