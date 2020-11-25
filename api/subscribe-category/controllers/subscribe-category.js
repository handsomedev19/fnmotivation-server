'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    // POST /subscriber-categories-mutiple

    async createMultiple(ctx) {
        //ctx.send('Hello World!');

        let userId = ctx.request.body.user_id;
        let categoryIds = ctx.request.body.category_ids;
        //console.log(ctx.request.body);
        //console.log(categoryIds);
        //console.log(typeof(categoryIds));

        let responsive = [];
        let entity;
        let n = categoryIds.length;

        const result = await strapi.query('subscribe-category').delete({user_id: parseInt(userId)});

        for (let i = 0; i < n; i++) {
            let categoryId = categoryIds[i];
            let data = {user_id: parseInt(userId), category_id: parseInt(categoryId)}
            //console.log(parseInt(userId));
            //console.log(parseInt(categoryId));

            entity = await strapi.services["subscribe-category"].create(data);
            responsive.push(sanitizeEntity(entity, { model: strapi.models["subscribe-category"] }));       
        }
        return responsive;
        
        //ctx.send('Hello World!');
    }
};
