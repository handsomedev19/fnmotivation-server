'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async findBookmarkDetails(ctx){
        //ctx.send('Hello Wrold!');

        const userId = ctx.params.id;
        //console.log(userId);
        //console.log(typeof(userId));
        
        const result = await strapi.query('article-bookmark').find({ user_id: userId });
        //console.log(result);

        let articleIds = [];
        for(let i in result){
            let articleBookmark = result[i];
            articleIds.push(parseInt(articleBookmark.article_id));
        }

        const result1 = await strapi.query('article').find({id_in: articleIds});

        ctx.send(result1);
    },
    async customDelete(ctx){
        const userId = ctx.request.body.user_id;
        const articleId = ctx.request.body.article_id;

        const result = await strapi.query('article-bookmark').delete({user_id: userId, article_id: articleId});

        ctx.send(result);
    }
};
