const { BlogPost } = require('../models');

const userAutorization = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.payload.data.id;        
        const autorization = await BlogPost.findByPk(id);        
        if (!autorization) return res.status(404).json({ message: 'Post does not exist' });
            
if (autorization.userId !== userId) return res.status(401).json({ message: 'Unauthorized user' });
    return next();
    } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'internal error' });
    }
};
module.exports = {
    userAutorization,
};
