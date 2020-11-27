'use strict';

const { default: createStrapi } = require("strapi");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async findfollowers(ctx){
        const userId = ctx.params.id;
        //console.log(userId);

        const result = await strapi.query('user-follow').find({to_customer_id: userId});
        //console.log(result);
        let customerIds = [];
        for (let i in result){
            let followInfo = result[i];
            customerIds.push(parseInt(followInfo.from_customer_id));
        }
        //console.log(customerIds);

        const result1 = await strapi.query('user', 'users-permissions').find({id_in: customerIds});
        
        ctx.send(result1);
    },

    async findfollowings(ctx){
        const userId = ctx.params.id;
        //console.log(userId);

        const result = await strapi.query('user-follow').find({from_customer_id: userId});
        //console.log(result);
        let customerIds = [];
        for (let i in result){
            let followInfo = result[i];
            customerIds.push(parseInt(followInfo.to_customer_id));
        }
        //console.log(customerIds);

        const result1 = await strapi.query('user', 'users-permissions').find({id_in: customerIds});
        
        ctx.send(result1);
    },

    async deletefollowing(ctx){
        const fromCustomerId = ctx.request.body.from_customer_id;
        const toCustomerId = ctx.request.body.to_customer_id;
        console.log(fromCustomerId);
        console.log(toCustomerId);

        const result = await strapi.query('user-follow').delete({from_customer_id: fromCustomerId, to_customer_id: toCustomerId});

        ctx.send(result);
    }
};
