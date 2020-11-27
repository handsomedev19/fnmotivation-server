'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
const { linkPreview } = require(`link-preview-node`);

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async getLinkPreviews(ctx) {
        //ctx.send('Hello World!');

        let url = ctx.request.body.url;
        //console.log(url);
        let response = {};
        
        
        await linkPreview(url)
        .then(resp => {
            //console.log(resp);
            /* { image: 'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png',
                title: 'npm | build amazing things',
                description: '',
                link: 'http://npmjs.com' } */
            // Note that '' is used when value of any detail of the link is not available
            
            response = {data: resp} ;
            ctx.send(resp);
        }).catch(catchErr => {
            //console.log(catchErr);

            response = {error: catchErr};
            ctx.send(catchErr);
        });
        
        
    }    
};
