'use strict';
const { sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    // POST /article-tags-mutiple

    async createMultiple(ctx) {
        //ctx.send('Hello World!');

        let articleId = ctx.request.body.article_id;
        let articleTags = ctx.request.body.article_tags;

        let articleId1 = parseInt(articleId);
        //console.log(ctx.request.body);
        //console.log(articleId);
        console.log(typeof(articleId1));

        let response = {};
        let entity;
        let n = articleTags.length;

        for (let i = 0; i < n; i++) {
            let articleTag = articleTags[i];
            let data = {title: articleTag, article_id: articleId1}
            //console.log(parseInt(articleId));
            //console.log(articleTag);

            entity = await strapi.services["article-tags"].create(data);       
        }

        console.log(entity);
        
        return sanitizeEntity(entity, { model: strapi.models["article-tags"] });
        //ctx.send('Hello World!');
    }
};
