const Object = require('../../models/Object');

module.exports = {
    Query:{
        async getObjects() {
            try {
                const objects = await Object.find(
                    {installedOn: {$ne: null}}, //somewhat of a filter to return only the nulls
                ); 
                return objects;
            } catch(err) {
                throw new Error(err);
            }
        }
    
    }
}
