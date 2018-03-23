export function getRedirectPath(data) {
        let path = '';
        if(!data.avatar) {
                path = data.type == 'boss' ? '/bossinfo' : '/geniusinfo';
        } else {
                path =  data.type == 'boss' ? '/desk/geniuslist' : '/desk/bosslist';
        }
        return path;
}

 //用户字典
 export function getUsersBook(list) {
        let usersBook = {};
        if(list.length > 0) {
            list.forEach(v => {
                usersBook[v._id] = v;
            }) 
            return usersBook;
        }
    }