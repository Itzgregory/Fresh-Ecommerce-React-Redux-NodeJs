export const setAuthToken = (id, token, role, expiresIn = 3600000) => {
    let users = JSON.parse(localStorage.getItem('users')) || {};
    users[id] = { token, role, expiry: Date.now() + expiresIn };
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('activeUser', id);
};

export const getAuthToken = () => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const activeUser = localStorage.getItem('activeUser');
    return activeUser && users[activeUser] ? users[activeUser].token : null;
};

export const getUserRole = () => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const activeUser = localStorage.getItem('activeUser');
    return activeUser && users[activeUser] ? users[activeUser].role : null;
};

export const isTokenValid = () => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const activeUser = localStorage.getItem('activeUser');
    return activeUser && users[activeUser] ? Date.now() < users[activeUser].expiry : false;
};

export const switchUser = (id) => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[id]) {
        localStorage.setItem('activeUser', id);
        window.dispatchEvent(new Event("storage"));
        return true;
    }
    return false;
};

export const clearAuthData = (id = null) => {
    let users = JSON.parse(localStorage.getItem('users')) || {};
    
    if (id) {
        delete users[id];
        localStorage.setItem('users', JSON.stringify(users));
        
        if (localStorage.getItem('activeUser') === id) {
            const remainingUsers = Object.keys(users);
            if (remainingUsers.length > 0) {
                localStorage.setItem('activeUser', remainingUsers[0]);
            } else {
                localStorage.removeItem('activeUser');
            }
        }
    } else {
        localStorage.removeItem('users');
        localStorage.removeItem('activeUser');
    }
    window.dispatchEvent(new Event("storage"));
};
