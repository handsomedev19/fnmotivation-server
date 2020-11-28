'use strict';

const codeGenerator = require("strapi-utils/lib/code-generator");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async article_publish(ctx){
        //ctx.send("Hello World!");
        //console.log(ctx.request.header);
        console.log(ctx.request.body);

        let data = ctx.request.body;
        if (data.model == "article"){

            if(data.event == "entry.publish"){

                let user_to_id = data.entry.article_author.id;
                let text = "Your article \"" + data.entry.title + "\" was approved.";

                await strapi.query('article').update({id: data.entry.id}, {published: true});

                let result = await strapi.query('notification').create({
                    user_to_id: user_to_id,
                    text: text,
                    read: false
                });
            }

            if(data.event == "entry.unpublish"){

                let user_to_id = data.entry.article_author.id;
                let text = "Your article \"" + data.entry.title + "\" was disapproved.";

                await strapi.query('article').update({id: data.entry.id}, {published: false});

                let result = await strapi.query('notification').create({
                    user_to_id: user_to_id,
                    text: text,
                    read: false
                });
            }

            if(data.event == "entry.create"){

                let user_from_id = data.entry.article_author.id;
                let text = "A new article \"" + data.entry.title + "\" was created.";

                let result = await strapi.query('notification').create({
                    user_from_id: user_from_id,
                    text: text,
                    read: false
                });
            }    
            
        }

        if (data.model == "comment"){

            if(data.event == "entry.publish"){

                let user_to_id = data.entry.users_permissions_user.id;
                let text = "Your comment \"" + data.entry.content + "\" was approved.";

                await strapi.query('comment').update({id: data.entry.id}, {published: true});

                let result = await strapi.query('notification').create({
                    user_to_id: user_to_id,
                    text: text,
                    read: false
                });
            }

            if(data.event == "entry.unpublish"){

                let user_to_id = data.entry.users_permissions_user.id;
                let text = "Your comment \"" + data.entry.content + "\" was disapproved.";

                await strapi.query('comment').update({id: data.entry.id}, {published: false});

                let result = await strapi.query('notification').create({
                    user_to_id: user_to_id,
                    text: text,
                    read: false
                });
            }

            if(data.event == "entry.create"){

                let user_from_id = data.entry.users_permissions_user.id;
                let text = "A new comment \"" + data.entry.content + "\" was created.";

                let result = await strapi.query('notification').create({
                    user_from_id: user_from_id,
                    text: text,
                    read: false
                });
            }    
            
        }
    },

    async user_create(ctx){
        let username = ctx.request.body.username;
        let user_from_id = ctx.request.body.user_from_id;
        let text = "A new user \"" + username + "\" created";

        console.log(username);
        console.log(user_from_id);

        let result = await strapi.query('notification').create({
            user_from_id: user_from_id,
            text: text,
            read: false
        });
    },

    async article_search_custom(ctx){
        //ctx.send("Hello World!");

        let query = ctx.request.body.query;
        let userId = ctx.request.body.userId;
        let articleType = ctx.request.body.articleType;

        let result = [];
        if (parseInt(userId) == 0 || userId ==  null || userId == ""){
            result = await strapi.query('article').search({_q: query});
        } else if (parseInt(userId) > 0) {
            result = await strapi.query('article').search({_q: query, article_author: userId});
        }

        //console.log(result);
        ctx.send(result);
    }
};
